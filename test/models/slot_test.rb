require "test_helper"

class SlotTest < ActiveSupport::TestCase

  test "can book slot with no overlapping" do
    slot = Slot.create!(start_at: "2022-03-01T13:00:00.000Z", end_at: "2022-03-01T13:10:00.000Z")
    assert slot.persisted?
  end

  # slot one 2022-02-01T20:00:00.000Z - 2022-02-01T22:30:00.000Z
  test "cannot book overlapping slot with with same start_and and end_at" do
    assert_raises { Slot.create!(start_at: "2022-02-01T20:00:00.000Z", end_at: "2022-02-01T22:30:00.000Z") }
  end
  
  test "cannot book overlapping slot inside existing slot range" do
    assert_raises { Slot.create!(start_at: "2022-02-01T20:15:00.000Z", end_at: "2022-02-01T22:15:00.000Z") }
  end

  test "cannot book slot overlapping with existing slot start" do
    assert_raises { Slot.create!(start_at: "2022-02-01T19:00:00.000Z", end_at: "2022-02-01T20:30:00.000Z") }
  end

  test "cannot book slot overlapping with existing slot end" do
    assert_raises { Slot.create!(start_at: "2022-02-01T22:00:00.000Z", end_at: "2022-02-01T22:45:00.000Z") }
  end

  test "can book slot before existing slot start" do
    slot = Slot.create!(start_at: "2022-02-01T19:00:00.000Z", end_at: "2022-02-01T20:00:00.000Z")
    assert slot.persisted?
  end

  test "can book slot after existing slot end" do
    slot = Slot.create!(start_at: "2022-02-01T22:30:00.000Z", end_at: "2022-02-01T23:00:00.000Z")
    assert slot.persisted?
  end
end
