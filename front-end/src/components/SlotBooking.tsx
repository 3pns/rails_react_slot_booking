import { useQuery } from "@tanstack/react-query";
import { DateTime, Duration } from "luxon";
import { useEffect, useMemo, useRef, useState } from "react";
import Calendar from "react-calendar";
import apiClient from "../services/api/client";
import DurationPicker from "./DurationPicker";
import SlotBox from "./SlotBox";
import { ApiService } from '../services/api'

const SlotBooking = ({sendWsMessage, lastWsMessage}) => {
  const [duration, setDuration] = useState(Duration.fromISO("PT0H15M0S"))
  const [date, setDate] = useState(new Date());
  const chan = useRef(null as string)
  const [slotBoxIndex, setSlotBoxIndex] = useState(null as string)
  const setSelectedBox = (index) => {
    if(slotBoxIndex === index){
      setSlotBoxIndex(null)
    } else {
      setSlotBoxIndex(index)
    }
  }
  const [ slots, setSlots ] = useState([])
  const [ availableSlots, setAvailableSlots ] = useState([])
  const [ sortedSlots, setSortedSlots ] = useState([])
  const sortSlots = () => {
    setSortedSlots(
      slots.concat(availableSlots).sort((a, b) => (a.start_at < b.start_at) ? -1 : ((a.start_at > b.start_at) ? 1 : 0))
    ) 
  }

  useEffect(() => {
    sortSlots()
  }, [slots, availableSlots])

  useEffect(() => {
    if(chan.current != null){
      const msg = JSON.stringify({command: "unsubscribe", identifier: JSON.stringify({"channel": "SlotBookingChannel", day: chan.current})})
      sendWsMessage(msg)
    }
    chan.current = DateTime.fromJSDate(date).toISODate()
    const msg = JSON.stringify({command: "subscribe", identifier: JSON.stringify({"channel": "SlotBookingChannel", day: chan.current})})
    sendWsMessage(msg)
  }, [date])

  useEffect(() => {
    const msg = lastWsMessage?.data ? JSON.parse(lastWsMessage?.data) : {}
    if(msg?.message?.body == "refetch-slots"){
      refetch()
    }
  }, [lastWsMessage])

  const startOfDayISO =  DateTime.fromJSDate(date).startOf('day').toUTC().toISO()
  const endOfDayISO =  DateTime.fromJSDate(date ).plus({days: 1}).startOf('day').toUTC().toISO()
  const { 
    refetch: refetchSlots
  } = useQuery(["slots", startOfDayISO, endOfDayISO, duration], () =>
      ApiService.Slots.getAll({startOfDayISO, endOfDayISO})
      .then((res) => {
        setSlots(res.data)
        // sortSlots()
        return res
      })
  );

  const { 
    refetch: refetchavailableSlots
  } = useQuery(["availableSlots", startOfDayISO, endOfDayISO, duration], () =>
      ApiService.Slots.getAllAvailable({startOfDayISO, endOfDayISO, duration: duration.toISO()})
      .then((res) => {
        setAvailableSlots(res.data)
        // sortSlots()
        return res
      })
  );

  const refetch = () => {
    refetchSlots()
    refetchavailableSlots()
  }
  
  return (
    <div className="row">
    <div className="col-lg-4">
      <div className="container m-2">
        <h2>Universal Warehouse</h2>
        <p>A warehouse shared by all anonymous users located in Antarctica. It is not possible to book a slot that overlaps any previously-booked slot.</p>
        <h5>Select duration</h5>
        <DurationPicker duration={duration} setDuration={setDuration}/>
      </div>
    </div>
    <div className="col-lg-4">
      <div className="container m-2">
      <h5>Select Day</h5>
        <Calendar onChange={setDate} value={date} />
      </div>
    </div>
    <div className="col-lg-4">
      <div className="container m-2">
        <h5>Select Slot</h5>
        <p>{date.toDateString()}</p>
        <div className='container' style={{overflowY: "scroll", maxHeight: "80vh"}}>
          {
            sortedSlots.map((slot, index) => {
              return (
                <SlotBox key={index} index={`${index}`} slot={slot} selected={slotBoxIndex} setSelected={setSelectedBox} refetch={refetch}/>
              )
            })
          }
        </div>
      </div>
    </div>
  </div>
  )
}

export default SlotBooking
export { SlotBooking }