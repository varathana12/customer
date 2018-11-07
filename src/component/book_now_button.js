import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
    button: {
        minWidth: '100%',
        padding: 12,
        marginTop: 20,
        fontSize: 16,
        border:"2px solid"
    }
});

class BookNowButton extends React.Component {
    render() {
        const {classes, name,onSubmit} = this.props;
        return (
            <div>
                <Button color="primary" onClick={onSubmit} className={classes.button}>
                    {name}
                </Button>
            </div>
        );
    }
}

BookNowButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookNowButton);