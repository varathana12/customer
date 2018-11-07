import axios from "axios/index";
import {PREFIX} from "../constants/variable";

export const profile=()=>axios.get(PREFIX+'user_info').then(res=>res.data)
    .catch(e=>{
        if(e.response.status===403){
            window.location.href = "/login"
        }
    })
export const update_phone=(phone_number)=>axios.post(PREFIX+'update_phone',phone_number).then(res=>res.data)
    .catch(e=>{
        if(e.response.status===403){
            window.location.href = "/login"
        }
    })

export const update_booking = (booking_data)=>axios.post(PREFIX+'edit_booking_info',booking_data).then(res=>res.data)
    .catch(e=>{
        if(e.response.status===403){
            window.location.href = "/login"
        }
    })
export const history=()=>axios.get(PREFIX+'customer_history_all').then(res=>res.data)
    .catch(e=>{
        if(e.response.status===403){
            window.location.href = "/login"
        }
    })
export const source_api=()=>axios.get(PREFIX+'location_data').then(res=>res.data)
    .catch(e=>{
        if(e.response.status===403){
            window.location.href = "/login"
        }
    })
export const submit_booking= booking_data =>axios.post(PREFIX+'customer_booking',booking_data).then(res=>res.data)
    .catch(e=>{
        if(e.response.status===403){
            window.location.href = "/login"
        }
    })

export const submit_request= request_data =>axios.post(PREFIX+'customer_request_booking',request_data).then(res=>res.data)
    .catch(e=>{
        console.log(e.response)
        if(e.response.status===403){
            window.location.href = "/login"
            return "403"
        }

    })

export const cancel_booking = (id,percentage) =>axios.post(PREFIX+'cancel_booking_ticket',{id,percentage}).then(res=>res.data)
    .catch(e=>{
        if(e.response.status===403){
            window.location.href = "/login"
        }
    })

export const booking_request = (id,status) =>axios.post(PREFIX+'request_book_now',{id,payment:status}).then(res=>res.data)
    .catch(e=>{
        if(e.response.status===403){
            window.location.href = "/login"
        }
    })
export const cancel_request = (id,percentage) =>axios.post(PREFIX+'cancel_request_booking',{id}).then(res=>res.data)
    .catch(e=>{
        if(e.response.status===403){
            window.location.href = "/login"
        }
    })
export const get_today =()=>axios.get(PREFIX+'today').then(res=>res.data).catch(e=>{
    if(e.response.status===403){
        window.location.href = "/login"
    }
})
export const departure_times =()=>axios.get(PREFIX+'departure_time_info').then(res=>res.data)
    .catch(e=>{
        if(e.response.status===403){
            window.location.href = "/login"
        }
    })
export const get_hash =data=>axios.post(PREFIX+"get_hash",data).then(res=>res.data)
    .catch(e=>{
        if(e.response.status===403){
            window.location.href = "/login"
        }
    })
export const get_cost =()=>axios.get(PREFIX+"cost_master").then(res=>res.data)
    .catch(e=>{
        if(e.response.status===403){
            window.location.href = "/login"
        }
    })
export const get_notification =()=>axios.get(PREFIX+"notification").then(res=>res.data)
    .catch(e=>{
        if(e.response.status===403){
            window.location.href = "/login"
        }
    })
