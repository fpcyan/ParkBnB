json.array! @parks do |park|

  json.partial!( 'park', park: park )

end
