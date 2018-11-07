import {
    CHANGE_TITLE_HEADER,
    HIDE_APP_BAR, SELECT_SOURCE,
    SELECT_DESTINATION,
    SELECT_DEPARTURE_DATE,
    SUBMIT_BOOKING,
    SOURCE_DATA,
    DESTINATION_DATA,
    RESET_STATE,
    TRIP_CHOICE,
    SELECT_RETURN_DATE,
    RETURN_DATE_STATUS,
    LIST_DATE_DISABLE,
    HISTORY_DATA,
    STUDENT_INFO,
    AMOUNT_ADULT,
    AMOUNT_CHILD,
    DEPARTURE_TIME,
    RETURN_TIME,
    REQUEST_TIME,
    QR_DATA,
    CANCEL_ID,
    TODAY,
    REQUEST_DATE,
    TIME_STATUS,
    LIST_DEPARTURE_TIME,
    LOCATION_ALL,
    TOTAL_COST,
    NOTIFICATION
} from "../constants/action-types";
import {init_status_app_bar,init_route_name} from "../init";
import {todayString} from "../init/init_function";

const initialState = {
    nameRoute : init_route_name,
    app_bar_status:init_status_app_bar,
    destination:'',
    source:'',
    date:(new Date()),
    isSubmit:false,
    source_data:[],
    destination_data:[],
    choice:"1",
    return_date:(new Date()),
    list_date_disable:[],
    return_date_status:true,
    history_data:[],
    student_info:{},
    amount_adult:1,
    amount_child:0,
    departure_time:"08:00:00",
    return_time:"15:00:00",
    request_time:(new Date()),
    qr_data:"",
    cancel_id:0,
    today:todayString,
    request_date:(new Date()),
    time_status:true,
    list_departure_times:[],
    location_all:[],
    total_cost:"0",
    notification:0
}

const rootReducer = (state = initialState, action)=>{
    switch (action.type){
        case CHANGE_TITLE_HEADER:
            return {...state, nameRoute:action.payload}
        case HIDE_APP_BAR:
            return {...state, app_bar_status:action.payload}
        case SELECT_SOURCE:
            return {...state,source:action.payload}
        case SELECT_DESTINATION:
            return {...state,destination:action.payload}
        case SELECT_DEPARTURE_DATE:
            return {...state,date:action.payload}
        case SELECT_RETURN_DATE:
            return {...state,return_date:action.payload}
        case SUBMIT_BOOKING:
            return {...state,isSubmit:action.payload}
        case SOURCE_DATA:
            return {...state,source_data:action.payload}
        case DESTINATION_DATA:
            return {...state,destination_data:action.payload}
        case RESET_STATE:
            return {...state,isSubmit:false}
        case TRIP_CHOICE:
            return {...state,choice:action.payload}
        case RETURN_DATE_STATUS:
            return {...state,return_date_status:action.payload}
        case LIST_DATE_DISABLE:
            return {...state,list_date_disable:action.payload}
        case HISTORY_DATA:
            return {...state,history_data:action.payload}
        case STUDENT_INFO:
            return {...state,student_info:action.payload}
        case AMOUNT_CHILD:
            return {...state,amount_child:action.payload}
        case AMOUNT_ADULT:
            return {...state,amount_adult:action.payload}
        case DEPARTURE_TIME:
            return {...state,departure_time:action.payload}
        case RETURN_TIME:
            return {...state,return_time:action.payload}
        case REQUEST_TIME:
            return {...state,request_time:action.payload}
        case QR_DATA:
            return {...state,qr_data:action.payload}
        case CANCEL_ID:
            return {...state,cancel_id:action.payload}
        case TODAY:
            return {...state,today:action.payload}
        case REQUEST_DATE:
            return {...state,request_date:action.payload}
        case TIME_STATUS:
            return {...state,time_status:action.payload}
        case LIST_DEPARTURE_TIME:
            return {...state,list_departure_times:action.payload}
        case LOCATION_ALL:
            return {...state,location_all:action.payload}
        case TOTAL_COST:
            return {...state,total_cost:action.payload}
        case NOTIFICATION:
            return {...state,notification:action.payload}
        default:
            return state
    }
}

export default rootReducer
