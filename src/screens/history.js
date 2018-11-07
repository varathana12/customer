import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Layout from './layout'
import ExpansionPanel, {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import {connect} from 'react-redux'
import Qr_code from '../component/qr_code'
import CancelDialog from '../component/dialog/cancel_dialog'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SimpleTable from '../component/table'
import RequestDetail from '../component/request_detail'
import ConfirmRequest from '../component/dialog/request_confirm_booking'
import StatusUpdate from '../component/dialog/status_update'
import {get_hash, history, profile} from "../api";
import {standard_date,string_to_date,time_12_format,dateToString} from "../init/init_function";
import {cancel_booking,
    booking_request,cancel_request,get_today,get_cost,source_api,departure_times,update_booking} from "../api";
import {historyData} from "../actions";
import {danger, success} from "../constants/color";
import BusDetail from '../component/dialog/bus_detail'
import StatusCancel from '../component/dialog/status_cancel'
import DriverDetail from '../component/dialog/driver_dialog'
import PaymentMethod from '../component/dialog/payment_method'
import {same_parent,remove_element} from '../init/data_fuctions'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocationCity from '@material-ui/icons/LocationCity';
import DateRange from '@material-ui/icons/DateRange'
import EditSchedule from '../component/dialog/edit_schedule'
import {selectDestination,selectSource,sourceData,destinationData,
    departureDate,departureTime,selectDepartureDate,listDepartureTimes,toDay,submitBooking} from '../actions'
import $ from "jquery";
const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop:10,
        paddingBottom:10,
        marginTop:10,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        color:success
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: success
    },
    Typography_expand:{
        width:"100%"
    },
    cancel_style:{
        //border:"1px solid "+danger
    },
    book_style:{
        //border:"1px solid "+success
    },
    cancel_text:{
        color:danger
    }
});

class History extends React.Component {

    state = {
        expanded: '',
        history_data:{current:[],request:[],history:[]},
        open_qr:false,
        open_cancel:false,
        cancel_id:0,
        qr_data:"",
        open_status:false,
        status:false,
        open_request_confirm:false,
        confirm_data:{},
        open_cancel_request:false,
        bus_data:{},
        driver_detail:{},
        open_bus:false,
        open_driver:false,
        data_history:{},
        today:"",
        cost:{},
        payment_method:false,
        edit_data:{},
        open_edit_schedule:false,
        open_status_update:false,
        status_update:false

    };
    componentWillMount(){
        const {history_data, HistoryData} =this.props

        if(history_data.length === 0){
            history().then(res=>{
                HistoryData(res)
            })
        }
    }
    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };
    handleCancel(percentage){
        const {cancel_id} = this.state
        cancel_booking(cancel_id,percentage).then(res=>{
            this.setState({open_status:true,status:res ==='success'})
        })
    }
    handleCancelRequest(){
        const {cancel_id} = this.state
        const {HistoryData} =this.props
        cancel_request(cancel_id).then(res=>{
            history().then(res=>{
                HistoryData(res)
            })
            this.setState({open_status:true,status:res ==='success'})
        })
    }
    handleRequestBooking(status){
        const {HistoryData} =this.props
        const {confirm_data} = this.state
        const {adult,child} = confirm_data
        booking_request(confirm_data.id,status).then(res=>{
            history().then(res=>{
                HistoryData(res)
            })
            //this.setState({open_status:true,status:res ==='success'})
            if(status === "credit"){
                get_cost().then(cost=> {
                    var total = ((adult*parseFloat(cost.adult)) + (child * parseFloat(cost.child)))
                    get_hash({transaction_id: res.transaction_id, amount: total.toString()}).then(data => {
                        $('#hash').val(data.hash)
                        $('#amount').val(total.toString())
                        $('#tran_id').val(res.transaction_id)
                        profile().then(pro=>{
                            $('#email').val(pro.email)
                            if(pro.phone_number){
                                $('#phone').val(pro.phone_number)
                            }
                            AbaPayway.checkout();
                        })

                    })
                })
        }else{
            this.setState({open_status: true, status:res.transaction_id})
        }
        })
    


    }
    initEditData(data){
        const {selectDestination,selectSource,source_data,
            destinationData,departureDate,departureTime} = this.props
        
        

        selectSource(data.source_id)

        if(same_parent(source_data,data.source_id,data.destination_id)){
            selectDestination(0)
        }
        destinationData(remove_element(source_data,data.source_id))
        selectDestination(data.destination_id);
        departureDate(string_to_date(data.departure_date))
        departureTime(time_12_format(data.departure_time))
        
        
    }
    onEditSchedule(){
        const {booking_edit_data,submitBooking,HistoryData} = this.props
        const {source,destination} = booking_edit_data
        const {edit_data} = this.state;
        let booking_master_id = edit_data.id
        let booking_update_data = {}
        booking_update_data["source"] = booking_edit_data.source
        booking_update_data["destination"]= booking_edit_data.destination
        booking_update_data["date"] = booking_edit_data.departure_date
        booking_update_data["time"] = booking_edit_data.departure_time
        booking_update_data["booking_master_id"] = booking_master_id;
        submitBooking(true)
        if(source&&destination){
            console.log(booking_update_data)
            update_booking(booking_update_data).then(update_status=>{
                
                this.setState({status_update:update_status.status === "success",open_status_update:true})
                
               
            })
            this.setState({open_edit_schedule:false})
        }
        

    }

    renderHistory(){
        const { classes,history_data} = this.props;
        const {expanded,today} = this.state
        let items = {current:[],request:[],history:[]}
        for (var name in history_data){
               items[name]=
                   history_data[name].map(item=> {
                           return (
                               <ExpansionPanel className={item.status === "Cancelled" ? [classes.root, classes.cancel_style]
                                   : [classes.root, classes.book_style]} key={item.id} expanded={expanded === item.id.toString()}
                                               onChange={this.handleChange(item.id.toString())}>
                                   <ExpansionPanelSummary expandIcon={<ExpandMoreIcon
                                       style={{color: item.status === "Cancelled" ? danger : success}}/>}>
                                       <table className="table_expand">
                                           <tbody>
                                           <tr>
                                               <td>
                                                   {/*<Typography style={{whiteSpace:"nowrap"}} className={[classes.heading,
                                                       item.status === "Cancelled" ? classes.cancel_text : ""]}>
                                                       <span style={{fontWeight:"bold"}}></span>
                                                       {item.source_name+" --> "+item.destination_name}</Typography>*/}

                                                   <ListItem>
                                                       <ListItemIcon style={{color:danger}}>
                                                           <DateRange/>
                                                       </ListItemIcon>
                                                       <ListItemText primary={"Departure Date"} style={{whiteSpace:"nowrap"}} secondary={standard_date(item.departure_date)} />
                                                   </ListItem>
                                                       <ListItem>
                                                           <ListItemIcon  style={{color:success}}>
                                                               <LocationCity />
                                                           </ListItemIcon>
                                                           <ListItemText primary={"From"} secondary={item.source_name} />
                                                       </ListItem>
                                                       <ListItem>
                                                           <ListItemIcon  style={{color:success}}>
                                                               <LocationCity />
                                                           </ListItemIcon>
                                                           <ListItemText primary={"To"} secondary={item.destination_name} />
                                                       </ListItem>
                                               </td>
                                               {/* <td>
                                                   <Typography style={{whiteSpace:"nowrap"}} className={[classes.secondaryHeading,
                                                       item.status === "Cancelled" ? classes.cancel_text : ""]}>
                                                       {" : "+standard_date(item.departure_date)}
                                                   </Typography>
                                               </td>*/}
                                           </tr>
                                           </tbody>
                                       </table>
                                   </ExpansionPanelSummary>
                                   <ExpansionPanelDetails>
                                       {
                                           name === "request"?
                                               <RequestDetail
                                                   ViewCancelRequest={(cancel_id) => this.setState({
                                                       cancel_id,
                                                       open_cancel_request: true
                                                   })}
                                                            ViewConfirm={(confirm_data)=>
                                                                this.setState({confirm_data,open_request_confirm:true})}
                                                            status_schedule={name} data={item}/>
                                               :
                                               <SimpleTable today={today} status_schedule={name} data={item}
                                                            ViewCancel={(cancel_id) => this.setState({
                                                                cancel_id:cancel_id.id,
                                                                data_history:cancel_id,
                                                                open_cancel: true
                                                            })}
                                                            editSchedule={(booking_data)=>{
                                                                this.setState({edit_data:booking_data,open_edit_schedule:true})
                                                                this.initEditData(booking_data);
                                                            }}
                                                            
                                                            ViewQR={(qr_data) => this.setState({qr_data, open_qr: true})}
                                                            ViewBus={(bus_data)=>this.setState({bus_data,open_bus:true})}
                                                            ViewDriver={(driver_detail)=>this.setState({driver_detail,
                                                                open_driver:true})}
                                                />
                                       }
                                   </ExpansionPanelDetails>
                               </ExpansionPanel>
                           )
                       }
                   )
        }
        return items
    }

    componentDidMount(){
        const {sourceData,listDepartureTimes,toDay} =this.props
        get_today().then(res=>{
            this.setState({today:res})
        })
        get_cost().then(res=>{
            this.setState({cost:res})
        })
        source_api().then(res=>{
            sourceData(res.location)
        })
        departure_times().then(res=>{
            listDepartureTimes(res)
        })
        get_today().then(res=>{
            toDay(res)
        })
    }

    render() {
        const { classes} = this.props;

        const {open_qr,open_cancel,qr_data,open_status,
            status,open_request_confirm,confirm_data,
            open_cancel_request,bus_data,open_bus,driver_detail,
            open_driver,data_history,today,cost,payment_method,
            open_edit_schedule,edit_data,open_status_update,status_update} = this.state;

        const items = this.renderHistory()

        return (
            <Layout>
                <div className={classes.root}>
                    {items["request"].length>0?
                        <h2 style={{color:"gray",textAlign:"center",fontWeight:"500"}}>Request Schedule</h2>:null}
                    {items["request"]}

                    {items["current"].length>0?<h2 style={{color:"gray",textAlign:"center",fontWeight:"500"
                        ,marginTop:20}}>Current Schedule</h2>:null}
                    {items["current"]}


                    {items["history"].length > 0 ? <h2 style={{color: "gray", textAlign: "center",
                        fontWeight: "500",marginTop:20}}>History
                            Schedule</h2> : null}
                    {items["history"]}

                    <Qr_code open={open_qr} id={qr_data} onClose={()=>this.setState({open_qr:false})}/>
                    <CancelDialog open={open_cancel} status={"current"}
                                  cost={cost}
                                  today={today} data={data_history}
                                  onConfirm={(percentage)=>this.handleCancel(percentage)}
                                  onClose={()=>this.setState({open_cancel:false})}/>
                    <CancelDialog open={open_cancel_request} onConfirm={this.handleCancelRequest.bind(this)}
                                  onClose={()=>this.setState({open_cancel_request:false})}/>
                    <StatusCancel open={open_status} status={status} onClose={()=>this.setState({open_status:false})}/>
                    <ConfirmRequest open={open_request_confirm}
                                    data={confirm_data}
                                    onClose={()=>this.setState({open_request_confirm:false})}
                                    confirm={()=>this.setState({payment_method:true})}
                    />
                    <PaymentMethod open={payment_method} onClose={()=>this.setState({payment_method:false})}
                        submitData={(status)=>{this.handleRequestBooking(status)}}
                    />
                    <EditSchedule edit_data={edit_data} 
                    onEditSchedule={()=>this.onEditSchedule()}
                    open={open_edit_schedule} onClose={()=>this.setState({open_edit_schedule:false})}/>
                    <BusDetail data={bus_data} open={open_bus} onClose={()=>this.setState({open_bus:false})}/>
                    <DriverDetail data={driver_detail} open={open_driver} onClose={()=>this.setState({open_driver:false})}/>
                    <StatusUpdate status={status_update} open={open_status_update} onClose={()=>this.setState({open_status_update:false})}/>
                </div>
            </Layout>
        );
    }
}

History.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => {
    return {
        HistoryData: data =>dispatch(historyData(data)),
        sourceData:data=>(dispatch(sourceData(data))),
        selectSource: source =>(dispatch(selectSource(source))),
        selectDestination: destination =>(dispatch(selectDestination(destination))),
        destinationData: destination =>(dispatch(destinationData(destination))),
        departureDate:date=>dispatch(selectDepartureDate(date)),
        departureTime: data =>(dispatch(departureTime(data))),
        listDepartureTimes :times =>(dispatch(listDepartureTimes(times))),
        toDay:today=>(dispatch(toDay(today))),
        submitBooking: status => (dispatch(submitBooking(status)))
    }
}
const mapStateToProps =state =>{
    return {
        history_data:state.history_data,
        source: state.source,
        destination:state.destination,
        isSubmit:state.isSubmit,
        source_data:state.source_data,
        booking_edit_data:{
            source:state.source,
            destination:state.destination,
            departure_date:dateToString(state.date)+" "+state.departure_time,
            departure_time:state.departure_time,
        }

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(History));
