class ChangeDataTypeForFieldname < ActiveRecord::Migration[6.0]
  def change
    change_column :tasks, :body, :text
  end
end
