# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# Parks.destroy_all


Park.create!(description: "This place has warm computers to sleep on
", lat: 40.725142, lng: -73.995611)
Park.create!(description: "Lots of fun music", lat: 40.731191, lng: -73.998228)

pos = [40.742084, -73.988186]
Park.create!(description: "Lots of food tents", lat: pos[0], lng: pos[1])

pos = [40.781578, -73.986384]
Park.create!(description: "Best place to watch fireworks", lat: pos[0], lng: pos[1])
pos = [40.777679, -73.969690]
Park.create!(description: "Too many tourists. Don't go here", lat: pos[0], lng: pos[1])
