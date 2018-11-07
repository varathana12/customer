import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControl, FormControlLabel} from 'material-ui/Form';
import {tripChoice} from "../actions";
import {connect} from 'react-redux'

const styles = theme => ({
    root: {
        display: 'flex',
        marginBottom:10,

    },
    formControl: {


    },
    group: {
        flexDirection:"row"
    },
    radio_choice:{
        marginRight:theme.spacing.unit*8
    }
});

class RadioButtonsGroup extends React.Component {

    render() {
        const { classes,choice,tripChoice } = this.props;

        return (
            <div className={classes.root}>
                <FormControl component="fieldset" required className={classes.formControl}>
                    <RadioGroup
                        aria-label="trip"
                        name="trip"
                        className={classes.group}
                        value={choice}
                        onChange={(event)=>tripChoice(event.target.value)}
                    >
                        <FormControlLabel className={classes.radio_choice} value={"1"} control={<Radio color="primary"/>} label="One Trip" />
                        <FormControlLabel value={"2"} control={<Radio color="primary"/>} label="Round Trip" />

                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

RadioButtonsGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch =>{
    return {
        tripChoice: choice =>(dispatch(tripChoice(choice))),

    }
}
const mapStateToProps = state =>{
    return {
        choice: state.choice,
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(RadioButtonsGroup));