import moment from 'moment'
import mm from 'moment-timezone'






export const get_hours=(today,date)=>{
    var get_today = moment(today);
    var get_date = moment(date);
    return (get_date - get_today)/(1000*60*60)
}
export const string_to_date = (datestr)=>{
    let date = moment(datestr).toDate()
    return date
}
export const time_12_format = (time)=>{
    let time12 = moment(time, "h:mm:ss A").format("HH:mm:ss")
    return time12
}

export const refund_policy =(today,date_booking,time)=>{
    console.log(date_booking)
    var date_today = moment(today);
    var booking = moment(date_booking).format("YYYY/MM/DD");
    booking = booking + " " +time
    booking = moment(booking)
    var hours = Math.floor(booking - date_today)/3600000
    if(hours >= 24){
        return [100,"Before 24 hours"]
    }else if(hours >= 12){
        return [50,"Before 12 hours"]
    }else{
        return [0,"After 12 hours"]
    }
}


export const standard_date =(datetime)=>{

    var date = moment(datetime).format('MMM DD, YYYY');
    return date;
}
export const standard =(datetime)=>{

    var date = moment(datetime).format('MMM DD, YYYY h:mm a');
    return date;
}

export const todayString = ()=>{
    let date = moment(new Date()).toDate()
    return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()
    //return "2018-05-30"
}
export const dateToString = (date)=>{
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    //return "2018-05-30"
}
export const makeError = ()=>{
    let date = new Date()
    date.setFullYear(2220)
    return date
}
export const fomartUniversal=date=>{
    let mo = mm.tz(date,"Asia/Phnom_Penh");
    return mo.format("yyyy/MM/dd HH:mm:ss")
}
export const timeFormat = time=>{
    let arrayTime = time.split(":")
    let format ="AM"
    let hour = 0;
    if(parseInt(arrayTime[0]) === 0){
        hour = 12
    }
    else if(parseInt(arrayTime[0]) === 12){
        format = "PM"
        hour = 12
    }else if(parseInt(arrayTime[0]) > 12){
        hour = parseInt(arrayTime[0]) - 12
        format = "PM"
    }else {
        hour = parseInt(arrayTime[0])
    }
    return hour + ":"+ arrayTime[1] +" "+format
}
export const biggest = (list_time)=>{
    let list = []
    for(let i in list_time){
        list.push(parseInt(list_time[i].dept_time.split(':')[0]))
    }
    list.sort((a,b)=>a-b)

    return list[list.length-1]

}
export const sortTime = list_time=>{
    let list = []
    for(let i in list_time){
        list.push(list_time[i].dept_time)
    }
    list.sort((a,b)=>parseInt(a)-parseInt(b))
    return list
}
export const isAfterTmr= deptDate=>{
    let dept_date=moment(deptDate,"YYYY-MM-DD HH:mm:ss").toDate()
    let current=new Date();
    if(current >= dept_date){
        return false
    }
    else{
       return Math.abs(dept_date - current)/(3600000) > 24
    }

}

export const convert_date_fomart = (date)=>{
    let format = moment(date,"MMMM DD YYYY, h:mm:ss a")

    return format.format("MM/ DD/ YYYY").toString()
}
export const init_date =(date,list_time)=>{
    let current = moment(date).toDate()
    let today = moment(date.split(' ')[0]).toDate()
    today.setDate(today.getDate()+1)
    if(current.getHours()>=biggest(list_time))
        today.setDate(today.getDate()+1)
   return today
}
export const min_date_booking = (cal,date,list_time) =>{
        let current = moment(date).toDate()
        let system = cal.toDate()
        let today = moment(date.split(' ')[0]).toDate()
        today.setDate(today.getDate()+1)
        if(current.getHours()>=biggest(list_time))
            today.setDate(today.getDate()+1)
        return !(system >= today)
}
export const max_date_booking = (today,add_days)=>{
    let current_date = moment(today).toDate()
    current_date.setDate(current_date.getDate()+add_days)
    return current_date.getFullYear()+"/"+(current_date.getMonth()+1)+"/"+current_date.getDate()
}

export const disable_select_time =(date_selected,today,value)=>{
    let time_today = today.split(' ')[1]
    let current_day = moment(today).toDate()

    current_day.setDate(current_day.getDate()+1)
    let date_time_today = moment(current_day.toLocaleString().split(', ')[0]+" "+time_today).toDate()
    let date_time_selected = moment(date_selected.toLocaleString().split(', ')[0] +" "+ value).toDate()
    return (date_time_selected < date_time_today)


}
export const min_date_return = (today)=>{
    let tmr = moment(today).toDate()
    tmr.setDate(tmr.getDate()+1)
    return tmr.getFullYear()+"/"+(tmr.getMonth()+1)+"/"+tmr.getDate()
}
export const min_time_request = (today,time,request_date)=>{
    let current = moment(today).toDate()
    let request_time = time.toDate()
    if(request_time.getHours()===12){
        request_time.setHours(24)
    }
    if(request_time.getDate() === request_date.getDate()){
        if(request_time > current){
            let remaining = request_time - current
            return ((remaining/1000)/60) >= 60
        }else{
            return false
        }
    }

    return true
}

export const init_time_request=()=>{
    let time = new Date()
    time.setHours(time.getHours()+2)
    time.setMinutes(0)
    return time
}

