import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import {success} from "../constants/color";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margin:0
    },
    button: {
        margin: theme.spacing.unit*2,
        padding:0

    },
});

class ImageCard extends React.Component{


render(){
    const { classes,src,title,status,submitData } = this.props;
    return (

            <Button className={classes.button} onClick={()=>submitData(status)}>
            <Paper className={classes.root} elevation={1}>

               <img width={100} height={100} src={src}/>
                <p style={{color:success,marginTop:5,marginBottom:-5,fontWeight:"bold"}}>{title}</p>
            </Paper>
            </Button>

    )};
}

ImageCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageCard);
