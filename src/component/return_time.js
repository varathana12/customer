import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';
import {returnTime} from "../actions";
import {sortTime, timeFormat} from "../init/init_function";

class ReturnTime extends React.Component {

    render() {
        const { classes,return_time,returnTime,list_departure_times } = this.props;

        return (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="return_time_label">Return Time</InputLabel>
                    <Select
                        value={return_time}
                        onChange={(event)=>returnTime(event.target.value)}
                        inputProps={{
                            name: 'return_time',
                            id: 'return_time_label',
                        }}
                        className={classes.Select}
                    >

                        {
                            sortTime(list_departure_times).map((item,index)=>{

                                return(
                                    <MenuItem
                                              key={index}
                                              value={item}>{timeFormat(item)}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>

            </form>
        );
    }
}
const styles = theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 5,
    },
    formControl: {
        minWidth: "100%",
        marginBottom:10,
        marginTop:10
    },
    Select:{
        lineHeight:"2.5rem"
    }
});

ReturnTime.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchToProps  = dispatch =>{
    return {
        returnTime: data =>(dispatch(returnTime(data))),

    }
}
const mapStateToProps = state =>{
    return {
        return_time:state.return_time,
        list_departure_times:state.list_departure_times
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ReturnTime));
