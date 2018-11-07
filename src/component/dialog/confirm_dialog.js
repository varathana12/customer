import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle,
    DialogContent,DialogActions } from 'material-ui/Dialog';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import {connect} from 'react-redux'
import {success,danger} from "../../constants/color";
import {id_to_location,id_to_pickup} from "../../init/data_fuctions";
import {DROP_OFF_AT,PICK_UP_AT,TO,FROM,ADULT,ADULTS,AMOUNT,CHILD,CHILDREN} from "../../constants/variable";
import {standard} from "../../init/init_function";
import {get_cost} from "../../api";

const styles = theme => ({
    last_cell:{
        paddingRight:"unset !important"
    },
    title:{
      textAlign:"center"
    },
    okButton:{
        border:"1px solid",
        width:"40%",
        color:success
    },
    cancelButton:{
        border:"1px solid",
        width:"40%",
        float:"left",
        color:danger
    },
    dialogAction:{
        justifyContent:"space-between",
        margin:"0 18px",
        marginBottom:18
    },

});

class ConfirmDialog extends React.Component {
    state={
        cost:{}
    }
    componentDidMount(){
        const {booking_data} = this.props
        get_cost().then(res=>{
            this.setState({cost:res})
        })
    }

    render() {
        const { open,onClose,confirm,source_data,booking_data,classes} = this.props;
        const {destination,source,departure_date,return_date,choice,
            amount_child,amount_adult,departure_time,return_time} = booking_data
        const {adult,child} = this.state.cost
            var total = ((amount_adult*parseFloat(adult)) + (amount_child * parseFloat(child)))
            total = total * choice

            let dtime = ""
            let rtime =""
            if(departure_time){
                dtime = departure_time.split(":")[0]+":"+departure_time.split(":")[1]
            }
            if(return_time){
                rtime =return_time.split(":")[0] + ":"+return_time.split(":")[1]
            }
        return (
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title"  className={classes.title}>Booking Confirm</DialogTitle>
                <DialogContent>
                    <Table className="table_cl table_dl" style={{width:window.outerWidth -110,maxWidth:490}}>
                        <TableBody>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{FROM}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {source?id_to_location(source_data,source).substr(1):""}
                                    </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{TO}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {destination?id_to_location(source_data,destination).substr(1):""}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{PICK_UP_AT}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {id_to_pickup(source_data,source)}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{DROP_OFF_AT}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {id_to_pickup(source_data,destination)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Passengers"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {amount_adult>1?ADULTS:ADULT} {amount_adult}<span style={{paddingRight:10}}></span>
                                    {amount_child>1?CHILDREN:CHILD} {amount_child}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Trip"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {choice === 1 ? "One Way":"Round Way"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Departure On"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {standard(departure_date.toLocaleString().split(", ")[0]+" "+dtime)}
                                    </TableCell>
                            </TableRow>
                            {
                                choice === 2?
                                    <TableRow>
                                        <TableCell><span style={{fontWeight: "bold"}}>{"Return On"}</span></TableCell>
                                        <TableCell className={classes.last_cell}>
                                            <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                            {standard(return_date.toLocaleString().split(", ")[0]+" "+rtime)}
                                            </TableCell>
                                    </TableRow>
                                    :<dive></dive>
                            }

                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Total Cost"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    <span style={{fontSize:14,fontWeight:"bold",fontStyle:"italic"}}>
                                        {"$ "+total+".00"}</span></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions className={classes.dialogAction}>
                    <Button onClick={onClose} className={classes.cancelButton}>
                        Cancel
                    </Button>
                    <Button onClick={()=>{onClose();confirm()}} className={classes.okButton}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ConfirmDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.object.isRequired,

};
const mapStateToProps = state =>{
    return {
        source_data:state.source_data,
        booking_data: {source:state.source,
            destination:state.destination,
            departure_date:state.date,
            return_date:state.return_date,
            choice: Number(state.choice),
            departure_time:state.departure_time,
            return_time:state.return_time,
            amount_child:state.amount_child,
            amount_adult:state.amount_adult,
            total_cost:state.total_cost
        },
    }
}


export default connect(mapStateToProps)(withStyles(styles)(ConfirmDialog));
