import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
    button: {
        minWidth: '100%',
        padding: 10,
        marginTop: 20,
        fontSize: 14,
        border:"1px solid",
        width:"80%",
        minWidth:"unset",
        borderRadius:4
    }
});

function ButtonNormal(props) {
    const { classes,name,onClick,buttonStyle,status } = props;
    return (
       
            <Button color="primary" disabled={status} className={classes.button} style={buttonStyle} onClick={onClick}>
                {name}
            </Button>
       
    );
}

ButtonNormal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonNormal);