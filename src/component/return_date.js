import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import { DatePicker } from 'material-ui-pickers';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import {returnDateStatus, selectReturnDate} from "../actions";
import {min_date_return,max_date_booking} from "../init/init_function";

class ReturnDate extends PureComponent {
    handleChangeDate(date){
        const {returnDate,departure_date,returnDateStatus} = this.props
        returnDate(date.toDate())
        console.log(date)
        returnDateStatus(date.toDate()>departure_date)

    }
    render() {
        const {return_date,departure_date,to_day} = this.props
        console.log(return_date)
        return (
            <div style={{marginBottom:10}}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <div className="picker">
                        <DatePicker
                            label="Return Date"
                            value={return_date}
                            onChange={(date)=>this.handleChangeDate(date)}
                            animateYearScrolling={false}
                            className={"date-picker"}
                            autoOk
                            maxDate={max_date_booking(to_day,30)}
                            minDate={min_date_return(departure_date)}
                            minDateMessage={"should after departure"}
                            format={"DD/ MM/ YYYY"}
                            fadeTimeout={50}
                        />
                    </div>
                </MuiPickersUtilsProvider>
            </div>


        );
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        returnDate: date =>(dispatch(selectReturnDate(date))),
        returnDateStatus: status =>(dispatch(returnDateStatus(status))),
    }
}
const mapStateToProps = state =>{
    return {
        return_date:state.return_date,
        departure_date:state.date,
        isSubmit:state.isSubmit,
        to_day:state.today
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReturnDate)
