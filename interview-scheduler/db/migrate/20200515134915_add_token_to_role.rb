class AddTokenToRole < ActiveRecord::Migration[6.0]
  def change
    add_column :roles, :token, :string
  end
end
