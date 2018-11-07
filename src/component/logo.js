import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';

const styles = {
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        margin: 0,
        borderRadius:0
    },
    bigAvatar: {
        width: 45,
        height: 45
    },
};

function Logo(props) {
    const { classes } = props;
    return (
        <div className={classes.row}>
            <Avatar
                alt="Adelle Charles"
                src="http://vkirirom.com/images/HomePage/vKirirom.svg"
                className={classNames(classes.avatar, classes.bigAvatar)}
            />
        </div>
    );
}

Logo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Logo);
