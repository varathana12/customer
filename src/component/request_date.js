import React, {PureComponent } from 'react';
import {connect} from 'react-redux'
import { DatePicker } from 'material-ui-pickers';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import {returnDateStatus,requestDate,timeStatus} from "../actions";
import {max_date_booking, min_time_request} from "../init/init_function";

import moment from 'moment'

class RequestDate extends PureComponent {
    handleDateChange = (date) => {
        const {requestDate,returnDateStatus,return_date,
            request_time,to_day,timeStatus} = this.props
        requestDate(date.toDate())
        returnDateStatus(return_date >date.toDate())
        timeStatus(min_time_request(to_day,moment(request_time),date.toDate()))

    }

    render() {
        const {to_day,request_date} = this.props

        return (
            <div style={{marginBottom:20}}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <div className="picker">
                        <DatePicker
                            label="Request Date"
                            value={request_date}
                            onChange={this.handleDateChange}
                            animateYearScrolling={false}
                            className={"date-picker"}
                            autoOk
                            format={"DD/ MM/ YYYY"}
                            maxDate={max_date_booking(to_day,7)}
                            fadeTimeout={50}
                            disablePast
                        />
                    </div>
                </MuiPickersUtilsProvider>
            </div>

        );
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        requestDate: date =>(dispatch(requestDate(date))),
        returnDateStatus: status =>(dispatch(returnDateStatus(status))),
        timeStatus:status=>(dispatch(timeStatus(status)))

    }
}
const mapStateToProps = state =>{
    return {
        request_date:state.request_date,
        return_date: state.return_date,
        isSubmit:state.isSubmit,
        to_day:state.today,
        request_time:state.request_time
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(RequestDate)
