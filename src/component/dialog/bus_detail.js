import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle,
    DialogContent,DialogActions } from 'material-ui/Dialog';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import {connect} from 'react-redux'
import {success,danger} from "../../constants/color";

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
    closeButton:{
        border:"1px solid",
        float:"left",
        color:success
    },
    dialogAction:{
        justifyContent:"space-between",
        margin:"0 18px",
        marginBottom:18
    },

});

class BusDetail extends React.Component {


    render() {
        const { open,onClose,data,classes} = this.props;

        return (
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title"  className={classes.title}>Bus Information</DialogTitle>
                <DialogContent>
                    <Table className="table_cl table_dl" style={{width:window.outerWidth -110,maxWidth:490}}>
                        <TableBody>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>Bus Model</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 16}}>:</span>
                                    {data.bus_model}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>Plate Number</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 16}}>:</span>
                                    {data.plate_number}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>Total Seats</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 16}}>:</span>
                                    {data.total_seats}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions className={classes.dialogAction}>
                    <Button onClick={onClose} fullWidth color="primary" className={classes.closeButton}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
BusDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.object.isRequired,

};
const mapStateToProps = state =>{
    return {
        source_data:state.source_data,

    }
}


export default connect(mapStateToProps)(withStyles(styles)(BusDetail));
