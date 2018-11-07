import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl,FormHelperText } from 'material-ui/Form';
import {connect} from 'react-redux'
import AdultIcon from 'material-ui-icons/Accessibility';
import ChildIcon from 'material-ui-icons/ChildCare';

const styles = theme => ({
    margin: {
    minWidth:"100%",
        marginTop:10,
        lineHeight: '2.5rem',
        width:"100%"

    },
    input:{
        maxHeight: 'unset',
    },
    inputError:{
        maxHeight: 'unset',
        color:"#f44336"
    }
});

class InputTicket extends React.Component {
    render() {
        const {classes,toggle,amount_child, amount_adult, isSubmit} = this.props;
        let status = isSubmit && (amount_adult + amount_child) === 0
        return (
            <div>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment"
                                error={status}>Passengers</InputLabel>
                    <Input
                        error={status}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start" className={status?classes.inputError:classes.input} color="secondary">
                                <AdultIcon/> <span style={{marginRight: 10}}></span>{amount_adult}
                                <span style={{marginRight: 40}}></span>
                                <ChildIcon/> <span style={{marginRight: 10}}></span>{amount_child}
                            </InputAdornment>
                        }
                        className={classes.margin}
                        readOnly={true}
                        onClick={toggle('bottom', true)}
                    />
                    {
                         status? <FormHelperText error={true}>*at least 1 adult</FormHelperText> : <span></span>
                    }
                </FormControl>
            </div>
        );
    }
}

InputTicket.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state =>{
    return {
        amount_adult: state.amount_adult,
        amount_child:state.amount_child,
        isSubmit:state.isSubmit,

    }
}

export default connect(mapStateToProps)(withStyles(styles)(InputTicket));
