import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
        position:"fixed",
        top:"calc(50% - 50px)",
        right:"calc(50% - 50px)"
    },
});

function CircularIndeterminate(props) {
    const { classes,hidden } = props;
    return (
        <span>
        {
            hidden? <CircularProgress className={classes.progress} size={50}/>:<span></span>
        }
        </span>
    );
}

CircularIndeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);