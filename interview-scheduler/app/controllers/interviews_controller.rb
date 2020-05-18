class InterviewsController < ApplicationController
  def index
    if can_view
      @interview = Interview.new
    else
      redirect_to login_path
    end
  end

  # Fetch interviews by date
  def fetch
    if can_view
      start_time = params[:start].to_datetime.beginning_of_day
      end_time = params[:end].to_datetime.end_of_day
      interviews = Interview.where(:start => start_time..end_time)
      render json: interviews
    else
      render json: {}
    end
  end

  # Get a single interview
  def get
    if can_view
      interview = Interview.find(params[:id])
      members = User.where(:id => UserInterview.where(:interview_id => interview.id).pluck(:user_id)).pluck(:username ).join ","
      render json: {
        :id => interview.id,
        :agenda => interview.agenda,
        :members => members,
        :start => interview.start.to_formatted_s(:short),
        :end => interview.end.to_formatted_s(:short),
        :comments => interview.comments,
        :created_by => interview.user.username,
      }
    else
      render json: {}
    end
  end

  # get interviews of a particular user
  def user_interviews
    if can_view
      @interviews = Interview.where(:id => UserInterview.where(:user_id => current_user).pluck(:interview_id))
    else
      redirect_to signup_url
    end
  end

  def update
    @interview = Interview.find(params[:id])
  end

  def delete
    if can_delete
      Interview.delete(params[:id])
      redirect_to interviews_url, notice: "Successfully deleted!"
    else
      redirect_to interviews_url, notice: "Not sufficient permission to delete!"
    end
  end

  def create
    if can_create
      @interview = Interview.new interview_params
      members = params[:interview][:members].split(',')
      if !check_conflicts(members)
        @interview.user = current_user
        if @interview.save
          members.each do |member|
            user_interview = UserInterview.new
            user_interview.interview_id = @interview.id
            user_interview.user_id = member
            if user_interview.save
              send_time = @interview.start - 30.minutes
              InterviewMailer.with(:interview=>@interview, :user_id=>member).reminder_mails.deliver_later(wait_until: send_time)
            end
          end
          respond_to do |format|
            format.html { redirect_to interviews_url, notice: "Interview successfully scheduled!"}
          end
        else
          respond_to do |format|
            format.html { redirect_to interviews_url, notice: "Interview creation failed!" }
          end
        end
      else
        respond_to do |format|
          format.html { redirect_to interviews_url, notice: "Some users have conflicting schedules!" }
        end
      end
    else
      redirect_to signup_url
    end
  end

private

  def check_conflicts(members)
    conflicts = false
    start_time = @interview.start + 1.second
    end_time = @interview.end - 1.second
    interviews = UserInterview.where(user_id: members)
    interviews.each do |interview|
      query = Interview.where(:id => interview.interview_id, :start => start_time..end_time).or(Interview.where(:id => interview.interview_id, :end => start_time..end_time-1.minutes))
      if query.count != 0
        conflicts = true
        break
      end
    end
    return conflicts
  end

  def interview_params
    params.require(:interview).permit(:end, :start, :title, :comments, :agenda, :created_by)
  end

end
