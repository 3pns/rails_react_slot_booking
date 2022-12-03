import apiClient from "./client";

const get = ({id}) => {
  return apiClient.get(`slots/${id}'`)
}

const getAll = ({startOfDayISO, endOfDayISO}) => {
  return apiClient.get(encodeURI(`slots?start_at=${startOfDayISO}&end_at=${endOfDayISO}`))
}

const getAllAvailable = ({startOfDayISO, endOfDayISO, duration}) => {
  return apiClient.get(encodeURI(`slots/bookable_slots?start_at=${startOfDayISO}&end_at=${endOfDayISO}&slot_duration=${duration}`))
}

const book = ({startAtISO, endAtISO}) => {
  return apiClient.post(`slots`, {
    start_at: startAtISO,
    end_at: endAtISO
  })
}

const ApiSlotService = { get, getAll, getAllAvailable, book}
export default ApiSlotService