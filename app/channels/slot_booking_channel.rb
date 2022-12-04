class SlotBookingChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "slot_booking_channel_#{params[:day]}"
  end

  def unsubscribed
  end
end