import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import StepperInto from '../stepper'
import {WIDTH} from "../../constants/variable";

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
        textAlign:"center"
    },
    root:{
        maxWidth:WIDTH,
        marginLeft:WIDTH === 500?"calc(50% - 250px)":0
    }
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FullIntroduce extends React.Component {
    componentDidMount(){
        sessionStorage.setItem("intro","false")
    }

    render() {
        const { classes,open,onClose } = this.props;
        return (
            <div>
                <Dialog
                    className={classes.root}
                    fullScreen
                    open={open}
                    onClose={()=>onClose()}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Help
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <StepperInto onClose={()=>onClose()}/>
                </Dialog>
            </div>
        );
    }
}

FullIntroduce.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullIntroduce);
