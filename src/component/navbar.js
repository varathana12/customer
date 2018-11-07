import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {connect} from 'react-redux'
import {WIDTH} from "../constants/variable";

const styles = {
    root: {
        flexGrow: 1,
        position:"fixed",
        top:0,
        width:"100%",
        zIndex:1,
        maxWidth:WIDTH

    },
    title:{
        alignSelf:"center"
    }

};

function SimpleAppBar(props) {
    const { classes,nameRoute,status } = props;
    const handleAppBar = (status)=>{
        if(status){
            return (<div></div>)
        }
        else{
            return (
                <div className={classes.root}>
                    <AppBar position="static" color="primary" >
                        <Toolbar className={classes.title}>
                            <Typography variant="title" color="inherit" >
                                {nameRoute}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
            )
        }
    }
    return (
        <div>
            {handleAppBar(status)}
        </div>
    );
}

SimpleAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state =>{
    return {
        nameRoute: state.nameRoute,
        status: state.app_bar_status
    }
}

export default connect(mapStateToProps)(withStyles(styles)(SimpleAppBar));
