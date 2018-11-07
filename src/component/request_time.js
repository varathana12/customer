import React, {PureComponent } from 'react';
import { TimePicker } from 'material-ui-pickers';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import {connect} from 'react-redux'
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import {requestTime,timeStatus} from "../actions";
import {min_time_request,makeError,init_time_request} from "../init/init_function";
import {get_today} from "../api";

class RequestTime extends PureComponent {

    handleTimeChange = (time) => {
        const {requestTime,timeStatus,request_date} = this.props
        var minutes= time.toDate().getMinutes()

        var remaining = minutes % 5
        minutes = minutes - remaining
        remaining = remaining - 2 > 0  ? 5 : 0
        minutes = minutes + remaining

        time.toDate().setMinutes(minutes)
        var date = time.toDate();
        date.setMinutes(minutes)
        requestTime(date)
        get_today.then(res=>{
            timeStatus(min_time_request(res,time,request_date))
        })
    }
    componentWillMount(){
        const {requestTime} = this.props
        requestTime(init_time_request())
    }
    render() {
        const {request_time,time_status} = this.props
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <div className="time_picker">
                    <TimePicker
                        label="Request Time"
                        className={"date-picker"}
                        value={request_time}
                        onChange={this.handleTimeChange}
                        minDate={time_status?null:makeError()}
                        minDateMessage={"should after 1 hour"}
                    />
                </div>
            </MuiPickersUtilsProvider>
        );
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        requestTime: date =>(dispatch(requestTime(date))),
        timeStatus:status=>(dispatch(timeStatus(status)))
    }
}
const mapStateToProps = state =>{
    return {
        request_time:state.request_time,
        today:state.today,
        time_status:state.time_status,
        request_date:state.request_date

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RequestTime)
