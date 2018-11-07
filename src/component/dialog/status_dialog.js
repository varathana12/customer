import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle,
    DialogContent,DialogContentText,DialogActions } from 'material-ui/Dialog';
import ErrorIcon from 'material-ui-icons/Error'
import SuccessIcon from 'material-ui-icons/CheckCircle'
import {success,danger,view} from "../../constants/color";
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {chageTitleHeader, historyData} from "../../actions";
import {history} from "../../api";
import {PREFIX} from "../../constants/variable";

const styles = {
    root:{
      overFlowX:"hidden"
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
        width:"40%",
        border:"1px solid",
    },
    viewButton:{
        float:"right",
        width:"40%",
        border:"1px solid"
    }
};
class StatusDialog extends React.Component {
    handleUpdateHistory(){
        const {HistoryData} = this.props
        window.location.href = PREFIX+"customer/History"
        history().then(res=>{
            HistoryData(res)
        })
    }

    render() {
        const { classes,open,onClose,history,title,status} = this.props;
        return (
            <Dialog onClose={onClose}
                    className={classes.root}
                    aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title" color={status?success:danger}  className={classes.title}>
                    {status?"Successful Booking ":"Failed Booking"}</DialogTitle>
                <DialogContent className={classes.content}>
                    <DialogContentText>
                        {status?<SuccessIcon style={{ fontSize: 150,color:success }}/>:<ErrorIcon style={{ fontSize: 150,color:danger }}/>}
                    </DialogContentText>
                </DialogContent>
                <DialogContent className={classes.content}>
                    <DialogContentText>
                        {status?"Successfully Booking! Please Enjoy Your Trip."
                            :"Sorry! Networking problem!"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={status?classes.dialogAction:""}>
                    {status?
                        <span style={{justifyContent:"space-between",display:"flex",margin:"15px 20px",marginTop:0}}>
                            <Button className={classes.okButton} onClick={()=> {onClose();window.location.reload()}}
                                    style={{color:success}}>
                                OK
                            </Button>
                            <Button className={classes.viewButton} onClick={()=>{

                                    onClose()
                                    this.handleUpdateHistory()
                                }} style={{color:view}} >
                                View
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
StatusDialog.propTypes = {
    classes: PropTypes.object.isRequired,

};
const mapDispatchToProps = dispatch => {
    return {
        title:title=>(dispatch(chageTitleHeader(title))),
    }
}

export default connect(null,mapDispatchToProps)(withStyles(styles)(withRouter(StatusDialog)));
