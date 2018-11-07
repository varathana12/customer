import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import BusIcon from 'material-ui-icons/DirectionsBus'
import RequestIcon from 'material-ui-icons/Cached'
import HistoryIcon from 'material-ui-icons/History'
import PeopleIcon from 'material-ui-icons/People'
import Badge from 'material-ui/Badge';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {chageTitleHeader,hideAppBar,Notification} from "../actions";
import {PREFIX,WIDTH} from "../constants/variable";
import {danger} from "../constants/color";
import {get_notification} from "../api";

const styles = {
    root: {
        width: "100%",
        maxWidth:WIDTH,
        position:"fixed",
        bottom:0,
        boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px " +
        "5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
    },
    badge: {
        backgroundColor:"#fff",
        color:danger,
        top: -3,
        right: -7,
        // The border color match the background color.
        border: "2px solid "+ danger,
        width:17,
        height:17

    },
};

class SimpleBottomNavigation extends React.Component {
    state = {
        value: 0
    };

    handleChange = (event, value) => {
        const {changeTitleHeader, hideAppBar} = this.props
        changeTitleHeader(value==="customer"?"Booking":value)
        if(value === 'Profile'){
            hideAppBar(true)
        }
        else{
            hideAppBar(false)
        }
        this.props.history.push(PREFIX+"customer/"+value)
    };
    componentDidMount(){
        const {Notification} = this.props;
        get_notification().then(res=>{
            Notification(res.notification)
            }
        )
    }

    render() {
        const { classes,nameRoute,notification } = this.props;
        const { value} = this.state;
        console.log(notification)
        return (
                <BottomNavigation
                    value={nameRoute}
                    onChange={this.handleChange}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction value="Booking" label="Booking" icon={<BusIcon />} />
                    <BottomNavigationAction value="Request" label="Request" icon={<RequestIcon />} />
                    <BottomNavigationAction value="History" label="History" icon={

                        notification?
                                <Badge badgeContent={notification} classes={{ badge: classes.badge }}>
                                    <HistoryIcon />
                                </Badge>
                                :<HistoryIcon />
                            } />
                    <BottomNavigationAction value="Profile" label="Profile" icon={<PeopleIcon />} />
                </BottomNavigation>
        );
    }
}

SimpleBottomNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchToProps =dispatch =>{
    return {
        changeTitleHeader: nameRoute => (dispatch(chageTitleHeader(nameRoute))),
        hideAppBar :status => (dispatch(hideAppBar(status))),
        Notification :notification => (dispatch(Notification(notification)))
    }
}
const mapStateToProps =state =>{
    return {
        nameRoute:state.nameRoute,
        notification:state.notification
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)((withRouter)(SimpleBottomNavigation)));
