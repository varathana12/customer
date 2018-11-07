import React from 'react';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle,
    DialogContent,DialogContentText,DialogActions } from 'material-ui/Dialog';
import ErrorIcon from 'material-ui-icons/Error'
import SuccessIcon from 'material-ui-icons/CheckCircle'
import {success,danger} from "../../constants/color";
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {historyData} from "../../actions";
import {history} from "../../api";
import SelectSource from '../select_source'
import SelectDestination from '../select_destination'
import SelectTime from '../select_time'
import Departure from '../departure_date'
import SelectNumberTicket from '../select_number_ticket'
const styles = {
    root:{
      overflowX:'hidden',
      
    },
    content:{
        minWidth:250
    },
    title:{
        textAlign:"center",
        color:"gray"
    },
    dialogAction:{
        display:"block",
    },
    onLyOkButton:{
        border:"1px solid",
        marginLeft:20,
        marginRight:20,
        marginBottom:20
    },
    cancelButton:{
        float:"left",
        border:"1px solid",
        width:"40%"

    },
    editButton:{
        float:"right",
        border:"1px solid",
        width:"40%"
    }
};
class EditSchedule extends React.Component {
    handleUpdateHistory(){
        const {historyData} = this.props
        history().then(res=>{
            historyData(res)
        })
    }
    render() {
        const { classes,open,onClose,status,edit_data,onEditSchedule} = this.props;
        return (
            <Dialog onClose={onClose}
                    className={classes.root}
                    aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title" color={status?success:danger}  className={classes.title}>
                    {"Edit Schedule"}</DialogTitle>
                <DialogContent className={classes.content}>
                    <SelectSource></SelectSource>
                    <SelectDestination></SelectDestination>
                    <Departure></Departure>
                    <SelectTime hidden_request={true} marginTop={10}></SelectTime>
                </DialogContent>
                <DialogActions className={classes.dialogAction}>
                   
                            <Button className={classes.cancelButton} onClick={()=>{onClose();}} style={{color:success}}>
                                Cancel
                            </Button>
                       
                        <Button className={classes.editButton} onClick={()=>{onEditSchedule();}} style={{color:danger}}>
                            Edit
                        </Button>
                    
                </DialogActions>
            </Dialog>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        historyData:(data)=>(dispatch(historyData(data)))

    }
}

export default connect(null,mapDispatchToProps)(withStyles(styles)(withRouter(EditSchedule)));
