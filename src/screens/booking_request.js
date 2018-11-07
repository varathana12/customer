import React from "react"
import Layout from './layout'
import {connect} from 'react-redux'
import SelectSource from '../component/select_source'
import SelectDestination from '../component/select_destination'
import RequestTime from '../component/request_time'
import BookNowButton from '../component/book_now_button'
import  SelectNumberTicket from '../component/select_number_ticket'
import CircularIndeterminate from '../component/circle_progress'
import ConfirmRequest from '../component/dialog/confirm_request'
import StatusDialog from '../component/dialog/status_dialog'
import RequestDate from '../component/request_date'
import {chageTitleHeader,resetState, submitBooking,toDay} from "../actions";
import { submit_request,get_today} from "../api";
import FullIntroduction from '../component/dialog/full_indtroduction'
class BookingRequest extends React.Component{

    state = {
        loading_submit:false,
        open_request_confirm:false,
        status_dialog:false,
        status_request:false,
        style:{},
        open:sessionStorage.getItem("intro") === 'true'
    }

    onSubmit(){
        const {request_data,submitBooking,time_status} = this.props
        const {source,destination,adult,child} = request_data
        submitBooking(true)
        if(source && destination && (child+adult)>0&&time_status){
            this.setState({open_request_confirm:true})

        }
    }
    submitRequest(){
        const {request_data} = this.props
        var dep = request_data.date
        var re = request_data.time
        request_data.date = dep.getFullYear()+"-"+(dep.getMonth()+1)+"-"+dep.getDate()
        request_data.time = re.getHours()+":"+re.getMinutes()+":00"
        this.setState({loading_submit:true, style:{opacity:0.4, pointerEvents:"none"}})
        submit_request(request_data).then(res=>{
            this.setState({loading_submit:false,style:{}})
            this.setState({status_request:res==="success", status_dialog:true})
        })
            .catch((e)=>{
                this.setState({loading_submit:false,style:{}})
                if(e !== "403"){
                    this.setState({status_request:false, status_dialog:true})
                }

            })

    }
    componentWillMount(){
        const {submitBooking,toDay} = this.props
        submitBooking(false)
        get_today().then(res=> {
            toDay(res)
        })
    }
    render(){
        const {loading_submit,open_request_confirm,
            status_dialog,status_request,open} = this.state;
        return(
            <Layout>
                <CircularIndeterminate hidden={loading_submit}/>
                <div style={this.state.style}>
                    <SelectSource/>
                    <SelectDestination/>
                    <RequestDate/>
                    <RequestTime/>
                    <SelectNumberTicket/>
                    <BookNowButton name={'Request Now'} onSubmit={()=>this.onSubmit()}/>
                    <ConfirmRequest open={open_request_confirm}
                                    onClose={()=>{this.setState({open_request_confirm:false})}}
                                    confirm={()=>this.submitRequest()}
                    />
                    <StatusDialog open={status_dialog}
                                  status={status_request}
                                  onClose={()=>this.setState({status_dialog:false})}/>
                </div>
                <FullIntroduction open={open} onClose={()=>this.setState({open:false})}/>
            </Layout>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitBooking: status => (dispatch(submitBooking(status))),
        reset:()=>(dispatch(resetState())),
        title:title=>(dispatch(chageTitleHeader(title))),
        toDay:date=>(dispatch(toDay(date)))

    }
}
const mapStateToProps =state =>{
    return {
        request_data: {source:state.source,
            destination:state.destination,
            source:state.source,
            date:state.request_date,
            child:state.amount_child,
            adult:state.amount_adult,
            time:state.request_time,
            number_of_seat:state.amount_adult+state.amount_child
        },
        source_data:state.source_data,
        time_status:state.time_status
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BookingRequest);
