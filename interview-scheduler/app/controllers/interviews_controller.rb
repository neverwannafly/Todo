class InterviewsController < ApplicationController

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
        :title => interview.title,
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
      interviews = []
      @interviews.each do |interview|
        interviews.append({
          :id => interview.id,
          :title => interview.title,
          :agenda => interview.agenda,
          :start => interview.start.to_formatted_s(:short),
          :end => interview.end.to_formatted_s(:short),
          :comments => interview.comments,
          :created_by => interview.user.username,
        })
      end
      render json: {
        :success => true,
        :interviews => interviews,
      }
    else
      render json: {
        :success => false
      }
    end
  end

  def update
    if can_edit
      @interview = Interview.find(params[:id])
      @members = UserInterview.where(:interview_id => @interview.id).pluck(:user_id)
      if !check_conflicts(@members)
        if @interview.update interview_params
          @members.each do |member|
            now = Time.now + 5.seconds
            send_time = @interview.start - 30.minutes
            InterviewMailer.with(:interview=>@interview, :user_id=>member).updation_mails.deliver_later(wait_until: now)
            InterviewMailer.with(:interview=>@interview, :user_id=>member).reminder_mails.deliver_later(wait_until: send_time)
          end
          render json: {
            :success => true,
          }
        end
      else
        render json: {
          :success => false,
          :error => "Some users have conflicting schedules",
        }
      end
    else
      render json: {
        :success => false,
        :error => "Not sufficient permission to update!",
      }
    end
  end

  def edit
    if can_edit
      @interview = Interview.find(params[:id])
      @members = User.where(:id => UserInterview.where(:interview_id => @interview.id).pluck(:user_id)).pluck(:username ).join ","
      render json: {
        :success => true,
        :interview => @interview,
        :members => @members,
      }
    else
      render json: {
        :success => false,
        :error => "Not sufficient permission to update!",
      }
    end
  end

  def delete
    if can_delete
      Interview.delete(params[:id])
      render json: {
        :success => true,
      }
    else
      render json: {
        :success => false,
        :error => "Not sufficient permission to delete!",
      }
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
          render json: {
            :success => true,
          }
        else
          render json: {
            :success => false,
            :error => "Cannot create interview.",
          }
        end
      else
        render json: {
          :success => false,
          :error => "Some members have conflicting schedules.",
        }
      end
    else
      render json: {
        :success => false,
        :error => "Not sufficient permission to create!",
      }
    end
  end

private

  def check_conflicts(members)
    conflicts = false
    start_time = @interview.start + 1.second
    end_time = @interview.end - 1.second
    interviews = UserInterview.where(user_id: members)
    interviews.each do |interview|
      upper_threshold = Time.now + 1000.years
      lower_threshold = Time.now - 1000.years
      query = Interview.where(:id => interview.interview_id, :start => end_time..upper_threshold).or(Interview.where(:id => interview.interview_id, :end => lower_threshold..start_time))
      if query.count != Interview.where(:id=>interview.interview_id).count
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
