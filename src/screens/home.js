import React from "react"
import {connect} from 'react-redux'
import Layout from './layout'
import SelectSource from '../component/select_source'
import SelectDestination from '../component/select_destination'
import Departure from '../component/departure_date'
import SelectTime from '../component/select_time'
import BookNowButton from '../component/book_now_button'
import SelectNumberTicket from '../component/select_number_ticket'
import RadioButtonsGroup from '../component/radio'
import ReturnDate from '../component/return_date'
import ReturnTime from '../component/return_time'
import ConfirmDialog from '../component/dialog/confirm_dialog'
import StatusDialog from '../component/dialog/status_dialog'
import PaymentMethod from '../component/dialog/payment_method'
import moment from 'moment'
import $ from 'jquery'
import {departure_times, submit_booking,history,get_today,get_hash,get_cost,profile} from "../api";
import {
    submitBooking, resetState,
    chageTitleHeader,
    toDay,
    selectDepartureDate,
    selectReturnDate,
    listDepartureTimes,
    departureTime,
    historyData, studentInfo,
} from "../actions";
import CircularIndeterminate from '../component/circle_progress'
import {init_date, min_date_return,sortTime} from "../init/init_function";

class Home extends React.Component{
    state={
        confirm_dialog:false,
        status_dialog:false,
        loading_submit:false,
        style:{},
        status_booking:false,
        payment_method:false
    }
    onSubmit(){
        const {booking_data,submitBooking,return_date_status} = this.props;
        const {source, destination,date,choice,adult,child } = booking_data;
        if(source && destination && date && (child+adult)>0){
            if(choice === 2){
                if(return_date_status){

                    this.setState({confirm_dialog:true})
                }
            }else{
                this.setState({confirm_dialog:true})
            }
        }
        else{
        }
        submitBooking(true)
    }
    submitData(status){
        const {HistoryData,studentInfo,booking_data} = this.props
        var {

           child, adult
        } = booking_data

        const {payment_method} = this.state;

        get_cost().then(cost=>{
            var total = ((adult*parseFloat(cost.adult)) + (child * parseFloat(cost.child)))
        if(!this.state.loading_submit) {
            this.setState({loading_submit: true, style: {opacity: 0.4, pointerEvents: "none"}},()=>{

                const {reset} = this.props
                var {
                    date, return_date, source, destination,
                    time, return_time, child, adult, number_of_seat, choice
                } = booking_data
                var dep = date
                var re = return_date
                date = dep.getFullYear() + "-" + (dep.getMonth() + 1) + "-" + dep.getDate() + " "+time
                return_date = re.getFullYear() + "-" + (re.getMonth() + 1) + "-" + re.getDate() + " "+return_time

                var final_data = [{date, source, destination, time, number_of_seat, adult, child,total_cost:total,pay:status}];
                if (choice === 2) {
                    final_data.push({
                        date: return_date, destination: source,
                        source: destination, child, adult, number_of_seat, time: return_time,total_cost:total,pay:status
                    })
                }
                console.log(final_data)
                this.setState({payment_method:false})
                submit_booking(final_data).then(res => {
                    if (res.transaction_id) {
                        history().then(res=>{
                            HistoryData(res)
                            reset()
                        })
                    }


                    if(status === "credit"){
                        total = total * choice
                        get_hash({transaction_id:res.transaction_id,amount:total.toString()}).then(data=>{
                            $('#hash').val(data.hash)
                            $('#amount').val(total.toString())
                            $('#tran_id').val(res.transaction_id)
                            profile().then(pro=>{
                                $('#email').val(pro.email)
                                if(pro.phone_number){
                                    $('#phone').val(pro.phone_number)
                                }

                                AbaPayway.checkout();
                                studentInfo(pro)
                            })


                        })

                    }else{
                        this.setState({loading_submit: false, style: {}})
                        this.setState({status_dialog: true, status_booking:res.transaction_id})
                    }



                    //this.setState({loading_submit: false, style: {}})
                    //this.setState({status_dialog: true, status_booking: res === "success"})

                }).catch(() => {
                    this.setState({loading_submit: false, style: {}})
                    this.setState({status_dialog: true, status_booking: false})
                })

            })
        }
});

    }
    MethodPayment(){
        this.setState({payment_method:true})
    }
    componentDidMount(){

        const {toDay,departureDate,returnDate, listDepartureTimes,departureTime} = this.props
        get_today().then(res=>{
            toDay(res)
                departure_times().then(times=>{
                    listDepartureTimes(times)
                    departureDate(init_date(res,times))
                    //console.log(moment(min_date_return(init_date(res,times))))
                    returnDate(moment(min_date_return(init_date(res,times))).toDate())
                    departureTime(sortTime(times)[times.length-1])
                })

        })

    }
    render(){
        const {booking_data} = this.props
        const {confirm_dialog,status_dialog,loading_submit,status_booking,payment_method} = this.state
        return(
            <Layout>
                <CircularIndeterminate hidden={loading_submit}/>
                <div style={this.state.style}>
                    <SelectSource/>
                    <SelectDestination/>
                    <RadioButtonsGroup/>
                    {booking_data.choice === 2?
                    <div>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <span style={{flex:1,paddingRight:10,width:0}}><Departure/></span>
                            <span style={{flex:1,marginTop:-10}}><SelectTime/></span>
                        </div>

                        <div style={{display:"flex",flexDirection:"row"}}>
                            <span style={{flex:1,paddingRight:10,width:0}}><ReturnDate/></span>
                            <span style={{flex:1,marginTop:-10}}><ReturnTime/></span>
                        </div>
                    </div>
                        :
                        <div>
                            <Departure/>
                            <SelectTime marginTop={10}/>
                        </div>

                        }
                    <SelectNumberTicket/>
                    <BookNowButton name={'Book Now'} onSubmit={()=>this.onSubmit()}/>
                    <ConfirmDialog open={confirm_dialog} onClose={()=>this.setState({confirm_dialog:false})}
                                   confirm={()=>this.MethodPayment()}
                    />
                    <StatusDialog open={status_dialog}
                                  status={status_booking}
                                  onClose={()=>this.setState({status_dialog:false})}/>
                    <PaymentMethod open={payment_method} onClose={()=>this.setState({payment_method:false})}
                        submitData={(status)=>this.submitData(status)}
                    />
                </div>
            </Layout>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitBooking: status => (dispatch(submitBooking(status))),
        reset:()=>(dispatch(resetState())),
        title:title=>(dispatch(chageTitleHeader(title))),
        toDay:date=>dispatch(toDay(date)),
        departureDate:date=>dispatch(selectDepartureDate(date)),
        returnDate: date =>(dispatch(selectReturnDate(date))),
        listDepartureTimes :times =>(dispatch(listDepartureTimes(times))),
        departureTime:time=>(dispatch(departureTime(time))),
        HistoryData: data =>dispatch(historyData(data)),
        studentInfo:data=>(dispatch(studentInfo(data)))
    }
}
const mapStateToProps =state =>{
    return {
        booking_data: {source:state.source,
            destination:state.destination,
            date:state.date,
            return_date:state.return_date,
            choice: Number(state.choice),
            time:state.departure_time,
            return_time:state.return_time,
            child:state.amount_child,
            adult:state.amount_adult,
            number_of_seat:state.amount_adult+state.amount_child
        },
        return_date_status:state.return_date_status,
        source_data:state.source_data,
        list_departure_times:state.list_departure_times
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
