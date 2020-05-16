class InterviewsController < ApplicationController
  def index
  end

  def fetch
    if can_view
      start_time = params[:start].to_datetime.beginning_of_day
      end_time = params[:end].to_datetime.end_of_day
      @interviews = Interview.where(:start => start_time..end_time)
      # render json: interviews
      render json: [
        {
          title: 'event3',
          start: '2020-05-16T12:30:00',
          end:   '2020-05-16T14:30:00',
          color: 'red'
        },
        {
          title: 'event2',
          start: '2020-05-16T09:30:00',
          end:   '2020-05-16T11:30:00',
          color: 'green'
        }
      ]
    else
      render json: {}
    end
  end

  def new
    @interview = Interview.new
  end

  def create
    if can_create
      @interview = Interview.new interview_params
      if @interview.save
        respond_to do |format|
          format.html { redirect_to interviews_url, notice: "Interview successfully scheduled!" }
        end
      else
        respond_to do |format|
          format.html { redirect_to interviews_url, notice: "Interview creation failed!" }
        end
      end
    else
      redirect_to interviews_url
    end
  end

private

  def check_conflicts

  end

  def interview_params
    params.require(:interview).permit(:end_date, :start_date, :title, :comments, :agenda, :users)
  end

end
