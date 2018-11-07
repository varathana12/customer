import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {connect} from 'react-redux'
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import AdultIcon from 'material-ui-icons/Accessibility';
import ChildIcon from 'material-ui-icons/ChildCare';
import InputTicket from './input_ticket'
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import MinusIcon from 'material-ui-icons/Remove'
import {success,danger,view} from "../constants/color";
import {amountAdult, amountChild} from "../actions";
import SwipeableDrawer from 'material-ui/SwipeableDrawer';
const styles = {
    container_list:{

    },
    list: {
        fontSize:18,
        width:"100%"
    },
    fullList: {
        width: 'auto',
        padding:20
    },
    icon:{
        float: 'right',
    },
    iconMinus:{
        color:danger,
        border:"2px solid",
        borderRadius:"50%",
    },
    iconAdd:{
        color:view,
        border:"2px solid",
        borderRadius:"50%",
    },
    button:{
        width:"100%",
    },
    adult:{
        color:"gray"
    },
    child:{
        color:"gray"
    }
};

class SelectNumberTicket extends React.Component {
    state = {
        bottom: false,
        adult:1,
        child:0
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };
    handleChild(value){
        const {amountChild,amount_child,amount_adult} = this.props
        if(value < 0){
            if(amount_child > 0){
                amountChild(amount_child + value)
            }
        }
        else if(amount_child + amount_adult < 10){
            amountChild(amount_child + value)
        }
    }
    handleAdult(value){
        const {amountAdult,amount_adult, amount_child} = this.props
        if(value < 0){
            if(amount_adult >1){
                amountAdult(amount_adult + value)
            }
        }
        else if(amount_adult + amount_child< 10){
            amountAdult(amount_adult + value)
        }


    }

    render() {
        const { classes,amount_adult,amount_child} = this.props;


        const {adult,child} = this.state;
        const fullList = (
            <div className={classes.fullList}>
                <List className={classes.list} ><IconButton>
                    <AdultIcon className={classes.adult}/>
                </IconButton><span style={{color:"gray"}}>{amount_adult>1?"Adults":"Adult"}: {amount_adult}</span>
                    <IconButton className={classes.icon} onClick={()=>this.handleAdult(1)}>
                        <AddIcon className={classes.iconAdd}/>
                        </IconButton>
                    <IconButton className={classes.icon} onClick={()=>this.handleAdult(-1)}>
                        <MinusIcon className={classes.iconMinus}/>
                    </IconButton>
                </List >
                <List className={classes.list}><IconButton>
                    <ChildIcon className={classes.child}/>
                </IconButton><span style={{color:"gray"}}>{amount_child>1?"Children":"Child"}: {amount_child}</span>
                    <IconButton className={classes.icon} onClick={()=>this.handleChild(1)} >
                        <AddIcon className={classes.iconAdd}/>
                    </IconButton>
                    <IconButton className={classes.icon} onClick={()=>this.handleChild(-1)}>
                        <MinusIcon className={classes.iconMinus}/>
                    </IconButton>
                </List>
                <List className={classes.list}>
                    <Button style={{border:"2px solid",fontSize:"1rem"}} color="primary" className={classes.button} onClick={this.toggleDrawer('bottom',false)}>
                        Done
                    </Button>
                </List>
            </div>
        );
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        return (
            <div>
                <InputTicket toggle={this.toggleDrawer} data={[adult,child]}/>
                <SwipeableDrawer
                    disableBackdropTransition={!iOS} disableDiscovery={iOS}
                    anchor="bottom"
                    open={this.state.bottom}
                    onClose={this.toggleDrawer('bottom', false)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                    >
                        {fullList}
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

SelectNumberTicket.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchToProps  = dispatch =>{
    return {
        amountChild:data=>(dispatch(amountChild(data))),
        amountAdult: data =>(dispatch(amountAdult(data))),

    }
}
const mapStateToProps = state =>{
    return {
        amount_adult: state.amount_adult,
        amount_child:state.amount_child,
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SelectNumberTicket));
