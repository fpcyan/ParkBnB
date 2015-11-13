require 'byebug'

class Park < ActiveRecord::Base
  validates :description, :lat, :lng, presence: true


  def self.in_bounds(bounds)
    lat_max = bounds["northEast"]["lat"]
    lat_min = bounds["southWest"]["lat"]
    lng_max = bounds["northEast"]["lng"]
    lng_min = bounds["southWest"]["lng"]
    Park.where(lat: lat_min..lat_max, lng: lng_min..lng_max)
  end
end
