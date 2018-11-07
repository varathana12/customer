import {isMobile} from 'react-device-detect'
export const PREFIX = sessionStorage.getItem("path")


export const WIDTH = isMobile ? "100%" : 500
export const PASSENGERS = "Passengers"
export const DEPARTURE_TIME = "Departure Time"
export const DEPARTURE_DATE = "Departure Date"
export const DROP_OFF_AT = "Drop Off At"
export const PICK_UP_AT = "Pick Up At"
export const REQUEST_TIME = "Request Time"
export const REQUEST_DATE = "Request Date"
export const FROM = "From"
export const TO = "To"
export const ADULTS = "Adults"
export const ADULT = "Adult"
export const CHILDREN = "Children"
export const CHILD = "Child"
export const AMOUNT = "Amount"

