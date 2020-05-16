class UpdateConstraints < ActiveRecord::Migration[6.0]
  def change
    remove_foreign_key :user_interviews, :interviews
    add_foreign_key :user_interviews, :interviews, on_delete: :cascade
    remove_foreign_key :user_interviews, :users
    add_foreign_key :user_interviews, :users, on_delete: :cascade
  end
end
