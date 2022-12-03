import { useEffect, useState, useRef } from "react"
import { Duration } from "luxon"

interface DurationPickerProps {
  duration: Duration
  setDuration: React.Dispatch<React.SetStateAction<Duration>>
}


const DurationPicker = ({duration = Duration.fromISO("PT0H15M0S"), setDuration = null}: DurationPickerProps) => {
  const updateDuration = ({hours = duration.hours, minutes = duration.minutes, seconds = duration.seconds}) => {
    setDuration(Duration.fromObject({hours, minutes, seconds}))

  }

  return (
    <form className="d-flex flex-row">
      <div className="input-group m-1" style={{width: "100px"}}>
        <span className="input-group-text">H</span>
        <input className="form-control" type="number" id="duration_picker_hours" name="duration"min="0" max="23" pattern="[0-9]+" value={duration.hours} onChange={e => updateDuration({hours: parseInt(e.target.value)})}/>
      </div>
      <div className="input-group m-1" style={{width: "100px"}}>
        <span className="input-group-text">M</span>
        <input className="form-control" type="number" id="duration_picker_minutes" name="duration"min="0" max="59" pattern="[0-9]+" value={duration.minutes} onChange={e => updateDuration({minutes: parseInt(e.target.value)})}/>
      </div>
      <div className="input-group m-1" style={{width: "100px"}}>
        <span className="input-group-text">S</span>
        <input className="form-control" type="number" id="duration_picker_seconds" name="duration"min="0" max="59" pattern="[0-9]+" value={duration.seconds} onChange={e => updateDuration({seconds: parseInt(e.target.value)})}/>
      </div>
    </form>
  )
}

export default DurationPicker
export { DurationPicker }