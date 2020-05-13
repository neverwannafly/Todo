class Post < ApplicationRecord
  validates :image, :presence => true
  has_one_attached :image, :styles => { :medium => "640px" }
  validates_attachement_content_type :image, :content_type => /\Aimage\/.*\Z/
end
