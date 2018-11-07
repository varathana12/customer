import React, {PureComponent } from 'react';
import {connect} from 'react-redux'

import { DatePicker } from 'material-ui-pickers';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import {selectDepartureDate, returnDateStatus, departureTime} from "../actions";
import {min_date_booking, max_date_booking, disable_select_time,sortTime} from "../init/init_function";



class Departure extends PureComponent {
    handleDateChange = (date) => {
        const {departureDate,returnDateStatus,
            return_date,list_departure_times,
            departureTime,departure_time,to_day} = this.props
        departureDate(date.toDate())
        returnDateStatus(return_date >date.toDate())
        if(disable_select_time(date.toDate(),to_day,departure_time)) {
            for (let i in sortTime(list_departure_times)) {
                if (!disable_select_time(date.toDate(), to_day, sortTime(list_departure_times)[i])) {
                    departureTime(sortTime(list_departure_times)[i])
                    break;
                }
            }
        }
    }

    render() {
        const {departure_date,to_day,list_departure_times} = this.props

        return (

            <div style={{marginBottom:20}}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <div className="picker">
                        <DatePicker
                            label="Departure Date"
                            value={departure_date}
                            onChange={this.handleDateChange}
                            animateYearScrolling={false}
                            className={"date-picker"}
                            autoOk
                            maxDate={max_date_booking(to_day,29)}
                            format={"DD/ MM/ YYYY"}
                            fadeTimeout={50}
                            shouldDisableDate={function (date) {
                                return min_date_booking(date,to_day,list_departure_times)
                            }}
                        />
                    </div>
                </MuiPickersUtilsProvider>
            </div>

        );
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        departureDate: date =>(dispatch(selectDepartureDate(date))),
        returnDateStatus: status =>(dispatch(returnDateStatus(status))),
        departureTime: data =>(dispatch(departureTime(data))),

    }
}
const mapStateToProps = state =>{
    return {
        departure_date:state.date,
        return_date: state.return_date,
        isSubmit:state.isSubmit,
        to_day:state.today,
        departure_time:state.departure_time,
        list_departure_times:state.list_departure_times
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Departure)
