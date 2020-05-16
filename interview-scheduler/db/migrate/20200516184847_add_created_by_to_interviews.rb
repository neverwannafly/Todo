class AddCreatedByToInterviews < ActiveRecord::Migration[6.0]
  def change
    add_reference :interviews, :user, foreign_key: true
  end
end
