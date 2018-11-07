import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle,
    DialogContent,DialogContentText,DialogActions } from 'material-ui/Dialog';

import {update_phone} from "../../api";
import TextField from '@material-ui/core/TextField';


import {success,danger} from "../../constants/color";
import {connect} from 'react-redux'
import {profile} from "../../api";
import {studentInfo} from "../../actions";

const styles = theme => ({
    root:{
      minWidth:300
    },
    title:{
        textAlign:"center"
    },
    formControl: {
        //margin: theme.spacing.unit,
        width:"100%"
    },

});

class EditPhone extends React.Component{
    state={
        phone:"",
        message:"",
        submit:false
    }
    handlePhone(phone){
        var reg = /^\d+$/;
        console.log(reg.test(phone))
        if(reg.test(phone)){
            if(phone.length<11){
                this.setState({phone})
                if(phone.length<8){
                    this.setState({message:"should more than 8 digits"})
                }else{
                    this.setState({message:""})
                }
            }
        }else if(phone.length ===0||phone.length ===1){
            this.setState({phone:"",message:"*required"})
        }
    }


    componentDidMount(){
        const {phone} = this.props
        this.setState({phone})
    }
    onSave(){
        this.setState({submit:true})
        const {phone,message} = this.state
        const {onClose,studentInfo} = this.props
        if(!message){
            update_phone({phone}).then(res=>{
                if(res.status){
                    onClose()
                    profile().then(res=>{
                        studentInfo(res)
                    })
                }
            })
        }
    }

    render() {
        const { classes,open,onClose,onConfirm} = this.props;
        const {phone,message,submit} = this.state
        return (
            <Dialog onClose={onClose} className={"hello world"} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle className={classes.title} id="simple-dialog-title" color="primary">Phone Number</DialogTitle>
                <DialogContent className={classes.root}>
                    <TextField
                        fullWidth={true}
                        type={"string"}
                        label="phone"
                        id="margin-normal"
                        onChange={(e)=>this.handlePhone(e.target.value.trim())}
                        margin="normal"
                        value={phone}
                        error={message&&submit?true:false}
                        helperText={message&&submit?message:""}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} onClick={onClose} style={{color:success}}>
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} onClick={()=>{this.onSave()}} style={{color:success}}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        studentInfo:data=>(dispatch(studentInfo(data)))
    }
}



export default connect(null,mapDispatchToProps)(withStyles(styles)(EditPhone));
