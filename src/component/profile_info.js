import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import ListInfo from './list_info'
import classNames from 'classnames';
import Avatar from 'material-ui/Avatar';
import user from '../assets/user.png'
import {success} from "../constants/color";
import Person from 'material-ui-icons/Person'
const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: 12,
    }),
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        marginTop:50,
        color:"white"
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
});

function ProfileInfo(props) {
    const { classes,data } = props;
    return (

        <div style={{marginTop:0}} elevation={4}>
            <Paper elevation={4}>
            <div className={classes.row} style={{width:'100%',height:200,backgroundColor:success}}>
                <Person
                    size={25}
                    className={classNames(classes.avatar, classes.bigAvatar)}
                />
                <div style={{position:"absolute",marginTop:120}}>
                    <h5 style={{fontSize:18,color:"#fff",fontWeight:"bold"}}>{data.username}</h5>
                </div>

            </div>
            </Paper>
            <Paper className={classes.root} elevation={4}>
               <ListInfo data={data}/>
            </Paper>

        </div>
    );
}

ProfileInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileInfo);
