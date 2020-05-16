class CreateUserInterviews < ActiveRecord::Migration[6.0]
  def change
    create_table :user_interviews do |t|

      t.timestamps
    end
  end
end
