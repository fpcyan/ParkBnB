class Park < ActiveRecord::Base
  validates :description, :lat, :lng, presence: true

end
