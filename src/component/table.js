import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button'
import ButtonNormal from '../component/button'
import {danger, view, success} from "../constants/color";
import {standard,convert_date_fomart,get_hours} from "../init/init_function";
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

class SimpleTable extends React.Component{

    state={
        open_qr:false,
        cancel_id:0,
        open_cancel:false,
    }
    convert(data) {
        const {ViewBus,ViewDriver} = this.props
        const item = [
            {name:'Booking Code', data:data.code},
            {name:'From', data:data.source_name},
            {name:'To', data:data.destination_name},
            {name:'Pick Up At', data:data.pickup_location},
            {name:'Drop Off At', data:data.drop_off_location},
            {name:'Departure On', data:data.departure_time},
            {name:'Amount', data:data.adult + data.child},
            {name:'Bus Model', data:data.bus_model?<Button
                    onClick={()=>ViewBus(data)}
                    style={{minHeight:0,color:view}}>
                    {data.bus_model}
                </Button>: 'To Be Decided'},
            {name:'Driver', data:data.driver_name?
                    <Button onClick={()=>ViewDriver(data)}
                            style={{minHeight:0}} color="primary">
                        {data.driver_name}
                    </Button>: 'To Be Decided'},
        ];
        return item
    }
    handleButton(data){

        const {ViewCancel,ViewQR,status_schedule,today} = this.props
        if(data.status === 'Cancelled') {
            return(
            <TableRow>
                <TableCell colSpan={2} style={{paddingRight:0}}>
                    <ButtonNormal name={'Cancelled'} status={true} buttonStyle={{width:"100%"}} />
                </TableCell>
            </TableRow>
            )
        }
        else{

            if(status_schedule === "current"){

                return (

                    <TableRow>
                        <TableCell>
                            <ButtonNormal name={'Cancel'}
                                          onClick={()=>ViewCancel(data)}
                                          buttonStyle={{float:"left",color:danger, width:"calc(100% - 10px)"}}/>
                        </TableCell>
                        <TableCell style={{paddingRight:0}}>
                            <ButtonNormal name={'QR-Code'}
                                          onClick={()=>ViewQR(data.qr_code)}
                                          buttonStyle={{float:"right",color:view,width:"calc(100% - 34px)"}}/>
                        </TableCell>

                    </TableRow>





                )

            }else{
                return (
                    <TableRow>
                        <TableCell colSpan={2} style={{paddingRight:0}}>
                            <ButtonNormal name={'QR-Code'} onClick={()=>ViewQR(data.qr_code)} buttonStyle={{width:"100%"}} />
                        </TableCell>
                    </TableRow>
                )
            }
        }

    }

    render() {
        const {data,today,editSchedule} = this.props;

        return (

            <Table className="table_cl">
                <TableBody>
                    {
                        this.convert(data).map((n,index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell><span style={{fontWeight: "bold"}}>{n.name}</span></TableCell>
                                    <TableCell numeric>
                                        {(n.name === "Driver"|| n.name === "Bus Model")&&n.data !== "To Be Decided"?
                                            <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 0}}>{":"}</span>
                                            :
                                            <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 16}}>{":"}</span>
                                        }

                                        {n.data}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                    {this.handleButton(data)}
                    {get_hours(today,data.departure_date)>=24?
                        <TableRow>
                            <TableCell colSpan={2} style={{paddingRight:0}}>
                            <ButtonNormal name={'Edit'}
                                          onClick={()=>editSchedule(data)}
                                          buttonStyle={{color:success, width:"100%"}}/>
                                          </TableCell>
                        </TableRow>
                        :
                        <div></div>
                    }
                </TableBody>
            </Table>
        );
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => {
    return {

    }
}
const mapStateToProps =state =>{
    return {
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SimpleTable));
