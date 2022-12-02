class CreateSlots < ActiveRecord::Migration[7.0]
  def change
    create_table :slots, id: :uuid do |t|
      t.datetime :start_at, default: nil, null: false
      t.datetime :end_at, default: nil, null: false

      t.timestamps
    end
  end
end
