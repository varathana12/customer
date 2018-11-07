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

const styles = {
    root:{
      overflowX:'hidden'
    },
    content:{
        textAlign:"center"
    },
    title:{
        textAlign:"center",
        color:"gray"
    },
    dialogAction:{
        width:"100%",
        display:"block",
    },
    onLyOkButton:{
        border:"1px solid",
        marginLeft:20,
        marginRight:20,
        marginBottom:20
    },
    okButton:{
        float:"left",
        border:"1px solid",
    },
    viewButton:{
        float:"right",
        width:"40%",
        border:"1px solid"
    }
};
class StatusCancel extends React.Component {
    handleUpdateHistory(){
        const {historyData} = this.props
        history().then(res=>{
            historyData(res)
        })
    }
    render() {
        const { classes,open,onClose,status} = this.props;
        return (
            <Dialog onClose={onClose}
                    className={classes.root}
                    aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title" color={status?success:danger}  className={classes.title}>
                    {status?"Successful Cancelling ":"Failed Cancelling"}</DialogTitle>
                <DialogContent className={classes.content}>
                    <DialogContentText>
                        {status?<SuccessIcon style={{ fontSize: 150,color:success }}/>:<ErrorIcon style={{ fontSize: 150,color:danger }}/>}
                    </DialogContentText>
                </DialogContent>
                <DialogContent className={classes.content}>
                    <DialogContentText>
                        {status?"Successfully Cancelling! Thank You!."
                            :"Sorry! Networking problem!"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={status?classes.dialogAction:""}>
                    {status?
                        <span style={{justifyContent:"space-between",display:"flex",margin:"15px 20px",marginTop:0}}>
                            <Button className={classes.onLyOkButton} fullWidth={true} onClick={()=>{
                                onClose();this.handleUpdateHistory()
                            }}
                                    style={{color:success}}>
                                OK
                            </Button>
                        </span>
                        :<Button className={classes.onLyOkButton} fullWidth={true} onClick={onClose} style={{color:success}}>
                            OK
                        </Button>
                    }
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

export default connect(null,mapDispatchToProps)(withStyles(styles)(withRouter(StatusCancel)));
