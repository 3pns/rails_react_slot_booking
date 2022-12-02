class Slot < ApplicationRecord
  validate :slot_available

  def slot_available
    overlaps =  Slot.where("end_at > ?", self.start_at).where("start_at < ?", self.end_at)
    errors.add(:start_at, "overlapping with existing slots") if overlaps.length > 0
  end

end
