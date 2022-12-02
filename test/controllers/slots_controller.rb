class SlotsController < ApplicationController
  before_action :find_slot, only: [:show, :update, :destroy]
  def index
    @slots = Slot.all
    render json: @slots
  end

  def create
    # data = ActiveModelSerializers::Deserialization.jsonapi_parse(params, only: [:start_at, :end_at])

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

  def update
    p "TESTEST update"
    p data
  end

  def destroy
  end

  private

  def find_slot
    @slot = Slot.find(params[:id])
  end

  def slot_params
    params.require(:slot).permit(:start_at, :end_at)
  end

end
