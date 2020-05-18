class InterviewMailer < ApplicationMailer
  def reminder_mails
    @interview = params[:interview]
    @user = User.find(params[:user_id])
    mail(to: @user.email, subject: "REMINDER: Upcoming Interview")
  end

  def updation_mails
    @interview = params[:interview]
    @user = User.find(params[:user_id])
    mail(to: @user.email, subbect: "UPDATE: Interview Changed")
  end
end
