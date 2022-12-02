class AddSlotBookingConstraint < ActiveRecord::Migration[7.0]
  # add_exclusion_constraint :slots, [[], ['tsrange(start_at, end_at)', '&&']], using: :gist # rein tsrange not supported
  # add_exclusion_constraint # rails core version not yet released in 7.0.4

  # warehouse_id with =, # add before tsrange to prevent overlap by warehouse_id
  def up
    execute <<-SQL
      ALTER TABLE slots
        ADD CONSTRAINT prevent_slot_booking_overlap
        exclude using gist (
          tsrange(start_at, end_at) with &&
        );
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE slots
        DROP CONSTRAINT IF EXISTS prevent_slot_booking_overlap;
    SQL
  end
end
