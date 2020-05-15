class FixColumnNames < ActiveRecord::Migration[6.0]
  def change
    rename_column :roles, :edit, :_edit
    rename_column :roles, :delete, :_delete
    rename_column :roles, :create, :_create
    rename_column :roles, :view, :_view
  end
end
