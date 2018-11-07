import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';
import {chageTitleHeader, departureTime} from "../actions";
import {disable_select_time,timeFormat,sortTime} from "../init/init_function";
import {danger,success} from "../constants/color";
import {withRouter} from 'react-router-dom'
import {PREFIX} from "../constants/variable";
class SelectTime extends React.Component {
    state ={
        disable:false,
    }
    onChangeTime(value){
        const {departureTime,changeTitleHeader} = this.props
        console.log(value)
        if(value !== "request_time"){
            departureTime(value)
        }else {
            changeTitleHeader("Request")
            this.props.history.push(PREFIX+"customer/"+"Request")
        }
    }
    render() {
        const { classes,marginTop,departure_time, departure_date,today,list_departure_times,hidden_request } = this.props;


        return (
            <div>
            <form className={classes.root} autoComplete="off" style={{marginTop:marginTop?-marginTop:0}}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="departure_time_label">Departure Time</InputLabel>
                    <Select
                        value={departure_time}
                        onChange={(event)=>this.onChangeTime(event.target.value)}
                        inputProps={{
                            name: 'departure_time',
                            id: 'departure_time_label',
                        }}
                        className={classes.Select}
                    >
                        {
                            sortTime(list_departure_times).map((item,index)=>{
                                const disable = disable_select_time(departure_date,today,item)

                                return(
                                    <MenuItem disabled={disable}
                                              style={{color:disable?danger:"unset"}}
                                              key={index}
                                              value={item}>{timeFormat(item)}</MenuItem>
                                )
                            })
                        }
                        {hidden_request?null:
                            <MenuItem hidden="true" value={"request_time"} style={{color:success}}>{"Request Time"}</MenuItem>
                        }
                       
                        
                    </Select>
                </FormControl>
            </form>
            </div>
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

SelectTime.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchToProps  = dispatch =>{
    return {
        departureTime: data =>(dispatch(departureTime(data))),
        changeTitleHeader: nameRoute => (dispatch(chageTitleHeader(nameRoute))),

    }
}
const mapStateToProps = state =>{
    return {
        departure_time:state.departure_time,
        departure_date:state.date,
        today:state.today,
        list_departure_times:state.list_departure_times
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)((withRouter)(SelectTime)));
