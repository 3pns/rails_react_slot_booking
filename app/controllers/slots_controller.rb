class SlotsController < ApplicationController
  before_action :find_slot, only: [:show ]#:update, :destroy]
  def index
    params.require(:start_at)
    params.require(:end_at)
    params.permit(:start_at, :end_at)
    start_at = Time.parse(params[:start_at])
    end_at = Time.parse(params[:end_at])
    @slots = Slot.where("end_at > ?", start_at).where("start_at <= ?", end_at).order(start_at: :asc)
    render json: @slots
  end

  def bookable_slots
    params.require(:start_at)
    params.require(:end_at)
    params.require(:slot_duration)
    params.permit(:start_at, :end_at, :slot_duration)
    start_at = Time.parse(params[:start_at])
    end_at = Time.parse(params[:end_at])
    slot_duration = ActiveSupport::Duration.parse(params[:slot_duration]) # "P1Y2M10DT2H30M"
    slot_increment = ActiveSupport::Duration.parse("PT15M")

    # Generate all possible slots of a day
    possible_slots = []
    slot_cursor = start_at
    while slot_cursor + slot_duration <= end_at
      possible_slots.push(Slot.new(start_at: slot_cursor, end_at: slot_cursor + slot_duration))
      slot_cursor += slot_increment
    end

    # get existings slot of the day
    slots = Slot.where("end_at > ?", start_at).where("start_at <= ?", end_at).order(start_at: :asc).to_a

    #  remove unbookable slots
    i = possible_slots.length - 1
    while i >= 0
      overlapping_slots = slots.select{|s| s.end_at > possible_slots[i].start_at && s.start_at < possible_slots[i].end_at}
      bookable = overlapping_slots.count == 0
      possible_slots.delete_at(i) unless bookable
      i -= 1
    end
    render json: possible_slots

  end

  def create
    slot = Slot.new(slot_params)
    if slot.save
      ActionCable.server.broadcast("slot_booking_channel_#{(slot.start_at - 1.days ).strftime("%Y-%m-%d")}", { body: "refetch-slots" })
      ActionCable.server.broadcast("slot_booking_channel_#{slot.start_at.strftime("%Y-%m-%d")}", { body: "refetch-slots" })
      ActionCable.server.broadcast("slot_booking_channel_#{(slot.start_at + 1.days ).strftime("%Y-%m-%d")}", { body: "refetch-slots" })
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
