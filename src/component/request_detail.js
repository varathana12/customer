import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import ButtonNormal from '../component/button'
import {danger, view} from "../constants/color";
import {connect} from 'react-redux'


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
    },
});

class RequestDetail extends React.Component{

    state={
        open_qr:false,
        cancel_id:0,
        open_cancel:false
    }
    provideSchedule(status,time){
        if(status === "Pending") return "To Be Decided"

        else if(status === "Confirmed") return time

        else return "Rejected"

    }
    convert(data) {
        const item = [

            {name:'From', data:data.source_name},
            {name:'Pick Up At', data:data.pickup_location},
            {name:'To', data:data.destination_name},
            {name:'Drop Off At', data:data.drop_off_location},
            {name:'Status', data:data.status},
            {name:'Request Time', data:data.departure_time},
            {name:'Provide Time',  data:this.provideSchedule(data.status,data.provided_time)},
            {name:data.adult>1?'Adults':"Adult", data:data.adult},
            {name:data.child>1?'Children':'Child', data:data.child},
        ];
        return item
    }
    handleButton(data){
        const {ViewCancelRequest,ViewConfirm,status_schedule} = this.props

            if(data.status === "Confirmed") {
                return (
                    <TableRow>
                        <TableCell>
                            <ButtonNormal name={'Cancel'}
                                          onClick={() => ViewCancelRequest(data.id)}
                                          buttonStyle={{float: "left", color: danger}}/>
                        </TableCell>
                        <TableCell style={{paddingRight: 0}}>
                            <ButtonNormal name={'Confirm'}
                                          onClick={() => ViewConfirm(data)}
                                          buttonStyle={{float: "right", color: view}}/>
                        </TableCell>
                    </TableRow>
                )
            }else if(data.status === "Pending") {
                return (
                    <TableRow>
                        <TableCell colSpan={2} style={{paddingRight: 0}}>
                            <ButtonNormal name={'Cancel'}
                                          onClick={() => ViewCancelRequest(data.id)}
                                          buttonStyle={{width: "100%",color:danger}}/>
                        </TableCell>
                    </TableRow>
                )
            } else{
                    return(
                    <TableRow>
                        <TableCell colSpan={2} style={{paddingRight:0}}>
                            <ButtonNormal name={'Rejected'} status={true} buttonStyle={{width:"100%"}} />
                        </TableCell>
                    </TableRow>
                    )
                }
            }

    render() {
        const {classes, data} = this.props;
        return (

            <Table className="table_cl">
                <TableBody>
                    {
                        this.convert(data).map((n,index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell><span style={{fontWeight: "bold"}}>{n.name}</span></TableCell>
                                    <TableCell numeric><span
                                        style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>{n.data}
                                    </TableCell>

                                </TableRow>
                            );
                        })
                    }
                    {this.handleButton(data)}
                </TableBody>
            </Table>
        );
    }
}

RequestDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => {
    return {

    }
}
const mapStateToProps =state =>{
    return {
        source_data:state.source_data
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(RequestDetail));
