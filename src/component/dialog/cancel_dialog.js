import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle,
    DialogContent,DialogContentText,DialogActions } from 'material-ui/Dialog';
import {success,danger} from "../../constants/color";
import {connect} from 'react-redux'
import {historyData} from "../../actions";
import {get_today,get_cost} from "../../api";
import {refund_policy} from "../../init/init_function";

const styles = {
    title:{
        textAlign:"center"
    }

};

class CancelDialog extends React.Component{
    state={
        cost:{}
    }
    componentDidMount(){
        const {data} = this.props
        if(data){
            get_cost().then(res=>{
                this.setState({cost:res})
                console.log(res)
            })
        }



    }

    render() {
        const { classes,open,onClose,onConfirm,data,today,status} = this.props;
        //console.log(data)
        var refund= ""
        if(status&&data.id){
            refund = refund_policy(today,data.departure_date ,data.departure_time)
           // console.log(refund)
        }

        return (
            <Dialog style={{minWidth:300}} onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle className={classes.title} id="simple-dialog-title" color="primary">Cancel Booking</DialogTitle>
                <DialogContent >
                    <DialogContentText id="alert-dialog-slide-description">
                        {status&&data.pay === "Succeed"?
                            <div>
                                <p style={{textAlign:"center"}}>{"You Will Get Refund"}</p>
                                <h2 style={{textAlign:"center"}}>{refund[0] + "%"}</h2>
                                <p style={{textAlign:"center"}}>{"Cancel "+refund[1]}</p>
                            </div>
                            :
                            <p>Are You Sure to Cancel?</p>
                        }

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} onClick={onClose} style={{color:success}}>
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} onClick={()=>{onConfirm(refund[0]);onClose()}} style={{color:danger}}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}



CancelDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.object.isRequired,

};

export default withStyles(styles)(CancelDialog);
