class CreateInterviews < ActiveRecord::Migration[6.0]
  def change
    create_table :interviews do |t|
      t.datetime :start
      t.datetime :end
      t.string :comments
      t.string :title
      t.string :agenda

      t.timestamps
    end
  end
end
