import { DateTime } from "luxon"
import { useState } from "react"
import { toast } from 'react-toastify';
import { ApiService } from '../services/api'
import { useQueryClient } from '@tanstack/react-query'

interface Slot {
  id?: string
  start_at?: any
  end_at?: any
}

const SlotBox = ({index, slot, selected, setSelected, refetch}:{index: string, slot: Slot, selected: string, setSelected: React.Dispatch<React.SetStateAction<string>>, refetch: any}) => {
  const queryClient = useQueryClient()
  const startAt = DateTime.fromISO(slot.start_at)
  const endAt = DateTime.fromISO(slot.end_at)
  const available = [null, ""].includes(slot.id)
  const open = ( selected === index)

  const confirmSlot = () => {
      ApiService.Slots.book({startAtISO: slot.start_at, endAtISO: slot.end_at}).then(() => {
        refetch()
        setSelected(null)
        toast.success("Slot booking confirmed, see you in Antarctica !", {
      })
    })
  }
  return (
    <div className="col-lg-12" >
      <div className="col-lg-12" >
        <button 
          type="button" 
          className={`btn ${open ? `btn-${available ? "dark" : "danger"} `: `btn-outline-${available ? "dark" : "danger"}` } btn-block btn-lg mb-2`}
          disabled={!available}
          style={{width: "100%"}}
          onClick={() => setSelected(index)}
        >
          {startAt.toLocaleString(DateTime.TIME_SIMPLE) + " - " + endAt.toLocaleString(DateTime.TIME_SIMPLE)}
        </button>
        { open && <button 
          type="button" 
          className={`btn btn-${available ? "success" : "danger"} btn-block btn-lg mb-2`}
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