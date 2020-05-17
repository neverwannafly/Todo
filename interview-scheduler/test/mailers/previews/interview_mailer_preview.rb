# Preview all emails at http://localhost:3000/rails/mailers/interview_mailer
class InterviewMailerPreview < ActionMailer::Preview
  def reminder_mails
    interview = Interview.new(title: "Hello", agenda: "Test Email", start: Time.now, end: Time.now + 2.hours)
    user_id = 1
    InterviewMailer.with({interview: interview, user_id: user_id}).reminder_mails
  end
end
