import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

// import logo from './logo.svg';
// theme
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


import 'html-duration-picker/dist/html-duration-picker.min'
import Calendar from 'react-calendar';
import DurationPicker from './components/DurationPicker';
import SlotBox from './components/SlotBox';
import { DateTime, Duration } from "luxon"

const startAt = "2022-02-01T14:45:00.000Z"
const endAt = "2022-02-01T15:15:00.000Z"
const defaultSlot = {
  id: null,
  startAt: startAt,
  endAt: endAt
}

const App = () => {
  const [duration, setDuration] = useState(Duration.fromISO("PT0H15M0S"))
  const [date, setDate] = useState(new Date());
  const [slotBoxIndex, setSlotBoxIndex] = useState(null as string)

  const setSelectedBox = (index) => {
    if(slotBoxIndex === index){
      setSlotBoxIndex(null)
    } else {
      setSlotBoxIndex(index)
    }
  }

  useEffect(() => {
    console.log("TODO: sync data")
  }, [duration, date]);

  console.log("==== App Values =====")
  console.log(duration)
  console.log(date)
  console.log(DateTime.now().startOf('day').toISO())
  console.log(DateTime.now().endOf('day').toISO())
  console.log(slotBoxIndex)

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-5">
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
        <div className="col-lg-3">
          <div className="container m-2">
            <h5>Select Slot</h5>
            <p>{date.toDateString()}</p>
            <div className='container'>
              <SlotBox index={"1"} slot={defaultSlot} selected={slotBoxIndex} setSelected={setSelectedBox} />
              <SlotBox index={"2"} slot={defaultSlot} selected={slotBoxIndex} setSelected={setSelectedBox}/>
              <SlotBox index={"3"} slot={defaultSlot} selected={slotBoxIndex} setSelected={setSelectedBox}/>
              <SlotBox index={"4"} slot={defaultSlot} selected={slotBoxIndex} setSelected={setSelectedBox}/>
              <SlotBox index={"5"} slot={defaultSlot} selected={slotBoxIndex} setSelected={setSelectedBox}/>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={50000}
      />

    </div>
  )
}

export default App;
