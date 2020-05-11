class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.string :labels
      t.string :body
      t.datetime :start_date
      t.datetime :end_date

      t.timestamps
    end
  end
end
