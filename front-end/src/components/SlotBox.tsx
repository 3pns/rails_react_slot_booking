import { DateTime } from "luxon"
import { useState } from "react"
import { toast } from 'react-toastify';

interface Slot {
  id?: string
  startAt?: any
  endAt?: any
}

const SlotBox = ({index, slot, selected, setSelected}:{index: string, slot: Slot, selected: string, setSelected: React.Dispatch<React.SetStateAction<string>>}) => {
  const startAt = DateTime.fromISO(slot.startAt)
  const endAt = DateTime.fromISO(slot.endAt)
  const available = [null, ""].includes(slot.id)
  const open = ( selected === index)

  const confirmSlot = () => {
    console.log("confirmingSlot")
    console.log(slot)
    toast.success("Slot booking confirmed, see you in Antarctica !", {
    })
  }

  return (
    <div className="col-lg-12" >
      <div className="col-lg-12" >
        <button 
          type="button" 
          className={`btn ${open ? 'btn-dark ': 'btn-outline-dark' } btn-block btn-lg mb-2`}
          disabled={!available}
          style={{width: "100%"}}
          onClick={() => setSelected(index)}
        >
          {startAt.toLocaleString(DateTime.TIME_SIMPLE) + " - " + endAt.toLocaleString(DateTime.TIME_SIMPLE)}
        </button>
        { open && <button 
          type="button" 
          className="btn btn-success btn-block btn-lg mb-2"
          disabled={!available}
          style={{width: "100%"}}
          onClick={confirmSlot}
        >
            {"Confirm"}
        </button> }
      </div>

    </div>

  )
}

export default SlotBox
export { SlotBox }