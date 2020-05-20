# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Role.create([
  {_edit: false, _delete: false, _create: false, _view: true, password: '0xffffffffff', password_confirmation: '0xffffffffff'},
  {_edit: true, _delete: true, _create: true, _view: true, password: '0xe3014affc9', password_confirmation: '0xe3014affc9' },
])

User.create({
  name: "Shubham Anand",
  username: "neverwannafly",
  email: "shubham_chess@live.com",
  role_id: "2",
  password: "10p17fs0008",
  password_confirmation: "10p17fs0008",
})