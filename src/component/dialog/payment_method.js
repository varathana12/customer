import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle,
    DialogContent,DialogContentText,DialogActions } from 'material-ui/Dialog';
import ImageCard from '../image_card'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {chageTitleHeader, historyData} from "../../actions";
import {history} from "../../api";
import cash from '../../assets/payment-method.png'
import credit from '../../assets/credit-card.png'
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
        const { classes,open,onClose,status,submitData} = this.props;
        return (
            <Dialog onClose={onClose}
                    className={classes.root}
                    aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title" className={classes.title}>
                    Payment Method
                   </DialogTitle>
                <DialogContent className={classes.content}>
                    <DialogContentText>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <ImageCard src={cash} title={"pay later"} status={"cash"} 
                            submitData={()=>{submitData("cash");onClose()}}/>
                            <ImageCard src={credit} title={"pay now"} status={"credit"} submitData={()=>{submitData("credit");onClose()}}/>
                        </div>

                    </DialogContentText>
                </DialogContent>
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
