import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle,
    DialogContent,DialogContentText,DialogActions } from 'material-ui/Dialog';
import {success,danger} from "../../constants/color";

const styles = {
    title:{
        textAlign:"center"
    }

};

class Logout extends React.Component{

    render() {
        const { classes,open,onClose,onConfirm} = this.props;

        return (
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle className={classes.title} id="simple-dialog-title" color="primary">Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure to Logout from App?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} onClick={onClose} style={{color:success}}>
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} onClick={()=>{onConfirm();onClose()}} style={{color:danger}}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

Logout.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.object.isRequired,

};

export default withStyles(styles)(Logout);