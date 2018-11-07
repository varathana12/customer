import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PhoneIcon from 'material-ui-icons/Phone';
import EmailIcon from 'material-ui-icons/Email';
import Exit from 'material-ui-icons/ExitToApp'
import Logout from './dialog/logout'
import EditPhone from './dialog/edit_phone'
import {danger} from "../constants/color";


const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class ListInfo extends React.Component{
    state={
        open_login:false,
        open_phone:false,
        open_able:false
    }
    onConfirm(){
        document.getElementById("logoutForm").submit();
    }
    render(){
        const { classes , data} = this.props;
        const {open_login,open_phone} = this.state
        return (
            <div className={classes.root}>
                <List component="nav">
                    <ListItem>
                        <ListItemIcon>
                            <EmailIcon color={"primary"}/>
                        </ListItemIcon>
                        <ListItemText primary="Email" secondary={data.email}/>
                    </ListItem>
                    <ListItem button onClick={()=>this.setState({open_phone:true})}>
                        <ListItemIcon>
                            <PhoneIcon color={"primary"}/>
                        </ListItemIcon>
                        <ListItemText primary="Phone" secondary={data.phone_number?data.phone_number:"unknown"}/>
                    </ListItem>
                    <ListItem button onClick={()=>this.setState({open_login:true})}>
                        <ListItemIcon>
                            <Exit style={{color:danger}}/>
                        </ListItemIcon>
                        <ListItemText primary="Logout" secondary={"logout from system"}/>
                    </ListItem>
                </List>
                <Logout open={open_login} onClose={()=>this.setState({open_login:false})} onConfirm={()=>this.onConfirm()}/>
                {
                    data.email?<EditPhone phone={data.phone_number} open={open_phone} onClose={()=>this.setState({open_phone:false})}
                                          onConfirm={()=>this.onConfirm()}/>:<div></div>
                }

            </div>
        );
    }

}

ListInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListInfo);
