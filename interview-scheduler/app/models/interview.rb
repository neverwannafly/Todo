class Interview < ApplicationRecord
  belongs_to :user
  validates :start, presence: true
  validates :end, presence: true
  validates :name, presence: true
  validates :members, presence: true
end
