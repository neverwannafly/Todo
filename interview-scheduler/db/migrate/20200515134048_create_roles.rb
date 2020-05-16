class CreateRoles < ActiveRecord::Migration[6.0]
  def change
    create_table :roles do |t|
      t.boolean :edit
      t.boolean :delete
      t.boolean :create
      t.boolean :view

      t.timestamps
    end
  end
end
