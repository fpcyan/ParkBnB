class CreateParks < ActiveRecord::Migration
  def change
    create_table :parks do |t|
      t.string :description, null: false
      t.float :lat, null: false
      t.float :lng, null: false

      t.timestamps null: false
    end
  end
end
