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
import {convert_date_fomart} from "../../init/init_function";
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
class RequestConfirm extends React.Component {
    state = {
        cost:{}
    }
    componentDidMount(){
        get_cost().then(res=>{


            this.setState({cost:res})
        })
    }

    render() {
        const { open,onClose,confirm,data,classes,source_data} = this.props;
        const {destination_id,source_id,dept_date,
            source_name,destination_name,
            pickup_location,
            drop_off_location,
            child,adult,provided_time,departure_date} = data
        const {cost} = this.state
        var total = ((adult*parseFloat(cost.adult)) + (child * parseFloat(cost.child)))

        return (
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title"  className={classes.title}>Booking Confirmation</DialogTitle>
                <DialogContent>
                    <Table className="table_cl table_dl" style={{width:window.outerWidth -110,maxWidth:490}}>
                        <TableBody>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"From"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {source_name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"To"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {destination_name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Pick Up At"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {pickup_location}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Drop Off At"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {drop_off_location}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Departure On"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {convert_date_fomart(departure_date)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Provided Time"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {provided_time}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>{"Passengers"}</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 5}}>:</span>
                                    {adult>1?"Adults":"Adult"} {adult}<span style={{paddingRight:10}}></span>
                                    {child>1?"Children":"Child"} {child}
                                </TableCell>
                            </TableRow>

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

RequestConfirm.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.object.isRequired,

};
const mapStateToProps = state =>{
    return {
        source_data:state.source_data,
        request_data: {source:state.source,
            destination:state.destination,
            departure_date:state.date,
            request_time:state.request_time,
            return_time:state.return_time,
            amount_child:state.amount_child,
            amount_adult:state.amount_adult
        },
    }
}


export default connect(mapStateToProps)(withStyles(styles)(RequestConfirm));
