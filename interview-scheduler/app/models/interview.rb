class Interview < ApplicationRecord
  belongs_to :user
  validates :start, presence: true
  validates :end, presence: true
  validates :title, presence: true
  validates :agenda, presence: true
  has_many :user_interviews, dependent: :delete_all
end
