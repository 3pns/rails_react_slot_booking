class SlotsController < ApplicationController
  before_action :find_slot, only: [:show ]#:update, :destroy]
  def index
    params.permit(:start_at, :end_at)
    @slots = Slot.all
    render json: @slots
  end

  def create
    slot = Slot.new(slot_params)
    if slot.save
      render json: slot, adapter: :json, status: 201
    else
      render json: { error: slot.errors }, status: 422
    end
  end

  def show
    render json: @slot
  end

  # def update
  # end

  # def destroy
  # end

  private

  def find_slot
    @slot = Slot.find(params[:id])
  end

  def slot_params
    params.require(:slot).permit(:start_at, :end_at)
  end

end
