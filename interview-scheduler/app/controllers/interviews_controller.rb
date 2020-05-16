class InterviewsController < ApplicationController
  def index
    @interview = Interview.new
  end

  def fetch
    if can_view
      start_time = params[:start].to_datetime.beginning_of_day
      end_time = params[:end].to_datetime.end_of_day
      @interviews = Interview.where(:start => start_time..end_time)
      render json: @interviews
    else
      render json: {}
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
            user_interview.save
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
      redirect_to interviews_url
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
