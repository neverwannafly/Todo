# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_16_184847) do

  create_table "interviews", force: :cascade do |t|
    t.datetime "start"
    t.datetime "end"
    t.string "comments"
    t.string "title"
    t.string "agenda"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.index ["user_id"], name: "index_interviews_on_user_id"
  end

  create_table "roles", force: :cascade do |t|
    t.boolean "_edit"
    t.boolean "_delete"
    t.boolean "_create"
    t.boolean "_view"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "password_digest"
  end

  create_table "user_interviews", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "interview_id"
    t.integer "user_id"
    t.index ["interview_id"], name: "index_user_interviews_on_interview_id"
    t.index ["user_id"], name: "index_user_interviews_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.string "username"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "role_id"
    t.index ["role_id"], name: "index_users_on_role_id"
  end

  add_foreign_key "interviews", "users"
  add_foreign_key "user_interviews", "interviews"
  add_foreign_key "user_interviews", "users"
  add_foreign_key "users", "roles"
end
