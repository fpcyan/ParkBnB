json.array! @parks do |park|

  json.partial!( park: park,  partial: 'park', as: :park )

end


end
