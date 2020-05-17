class InterviewMailer < ApplicationMailer
  def reminder_mails
    @interview = params[:interview]
    @user = User.find(params[:user_id])
    mail(to: @user.email, subject: "Reminder for upcoming Interview")
  end
end
