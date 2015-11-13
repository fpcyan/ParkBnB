class Api::ParksController < ApplicationController

  def index
    @parks = Park.in_bounds(params[:bounds])
  end

  def show
    @park = Park.find(params[:id])
  end

  def create
    @park = Park.create!(park_params)
    render :show
  end


  def destroy

  end

  private

    def park_params
      params.require(:park).permit(:description, :lat, :lng)
    end

end
