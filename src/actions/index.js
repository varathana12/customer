import {
    CHANGE_TITLE_HEADER,
    HIDE_APP_BAR,
    SELECT_SOURCE,
    SELECT_DESTINATION,
    SELECT_DEPARTURE_DATE,
    SUBMIT_BOOKING,
    SOURCE_DATA,
    DESTINATION_DATA,
    STUDENT_INFO,
    RESET_STATE,
    TRIP_CHOICE,
    SELECT_RETURN_DATE,
    RETURN_DATE_STATUS,
    LIST_DATE_DISABLE,
    HISTORY_DATA,
    AMOUNT_ADULT,
    AMOUNT_CHILD,
    DEPARTURE_TIME,
    RETURN_TIME,
    REQUEST_TIME,
    QR_DATA,
    CANCEL_ID,
    TODAY,
    REQUEST_DATE, TIME_STATUS,
    LIST_DEPARTURE_TIME,
    LOCATION_ALL,
    TOTAL_COST,
    NOTIFICATION
} from "../constants/action-types";

export const chageTitleHeader = nameRoute =>({type:CHANGE_TITLE_HEADER,payload:nameRoute})
export const hideAppBar = status =>({type:HIDE_APP_BAR,payload:status})
export const selectSource = source => ({type:SELECT_SOURCE,payload:source})
export const selectDestination = destination => ({type:SELECT_DESTINATION,payload:destination})
export const selectDepartureDate = date =>({type:SELECT_DEPARTURE_DATE,payload:date})
export const submitBooking = status =>({type:SUBMIT_BOOKING,payload:status})
export const sourceData = data =>({type:SOURCE_DATA,payload:data})
export const destinationData = data =>({type:DESTINATION_DATA,payload:data})
export const studentInfo = data =>({type:STUDENT_INFO,payload:data})
export const resetState = () => ({type:RESET_STATE})
export const tripChoice = choice => ({type:TRIP_CHOICE,payload:choice})
export const selectReturnDate = date => ({type:SELECT_RETURN_DATE, payload:date})
export const returnDateStatus = status => ({type:RETURN_DATE_STATUS, payload:status})
export const listDateDisable = data => ({type:LIST_DATE_DISABLE, payload:data})
export const historyData= data => ({type:HISTORY_DATA, payload:data})

export const amountChild= data => ({type:AMOUNT_CHILD, payload:data})
export const amountAdult= data => ({type:AMOUNT_ADULT, payload:data})

export const departureTime= data => ({type:DEPARTURE_TIME, payload:data})
export const returnTime= data => ({type:RETURN_TIME, payload:data})
export const requestTime= data => ({type:REQUEST_TIME, payload:data})
export const QR_Data = data =>({type:QR_DATA, payload:data})
export const cancelID = data =>({type:CANCEL_ID, payload:data})
export const toDay = date =>({type:TODAY, payload:date})
export const requestDate = date =>({type:REQUEST_DATE, payload:date})
export const timeStatus = status =>({type:TIME_STATUS, payload:status})
export const listDepartureTimes = times =>({type:LIST_DEPARTURE_TIME, payload:times})
export const locationAll = data =>({type:LIST_DEPARTURE_TIME, payload:data})
export const totalCost = cost =>({type:TOTAL_COST,payload:cost})
export const Notification = (notication) =>({type:NOTIFICATION,payload:notication})
