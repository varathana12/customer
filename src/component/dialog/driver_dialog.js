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

class DriverDetail extends React.Component {


    render() {
        const { open,onClose,data,classes} = this.props;

        return (
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title"  className={classes.title}>Driver Information</DialogTitle>
                <DialogContent>
                    <Table className="table_cl table_dl" style={{width:window.outerWidth -110,maxWidth:490}}>
                        <TableBody>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>Name</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 16}}>:</span>
                                    {data.driver_name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>Email</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 16}}>:</span>
                                    {data.driver_email}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><span style={{fontWeight: "bold"}}>Phone</span></TableCell>
                                <TableCell className={classes.last_cell}>
                                    <span style={{fontWeight: "bold", fontSize: 20, paddingRight: 0}}>:</span>
                                    <Button onClick={()=>{window.location.href="tel:"+data.driver_phone}} color="primary">
                                    {data.driver_phone}
                                    </Button>
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
DriverDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.object.isRequired,

};
const mapStateToProps = state =>{
    return {
        source_data:state.source_data,

    }
}


export default connect(mapStateToProps)(withStyles(styles)(DriverDetail));
