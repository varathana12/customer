import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import {selectDestination,destinationData} from "../actions";

const styles = theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 5,
    },
    formControl: {
        minWidth: "100%",
        marginBottom:20
    },
    Select:{
        lineHeight:"2.5rem"
    }
});
class SelectDestination extends React.Component {
    state = {
        age: '',
        name: 'hai',
    };
    handleItem(destination_data) {
        var element =[]
        destination_data.map((name)=>{
            var key_name = Object.keys(name)[0]
            element.push(
                {name:key_name,role:"parent"}
            )
            name[Object.keys(name)[0]].map(lo=>{
                element.push({name:lo.name,id:lo.id,role:"child"})
            })
        })

        return element
    }
    renderOption(destination_data){
        const data = this.handleItem(destination_data);
        const option = data.map((item,index)=>{
            if(item.role==="parent"){
                return <MenuItem disabled={true} id={"optionParent"+index} key={index}
                                 className={"optionParent"}>{item.name.substr(1)}</MenuItem>
            }
            else{
                return <MenuItem value={item.id} key={index} className={"optionChild"}>{item.name}</MenuItem>
            }
        })
        return option
    }

    handleChange = event => {
        let value = event.target.value
        const {selectDestination} = this.props
        selectDestination(value)
    };

    render() {
        const { classes, destination_data,destination,isSubmit} = this.props;
        return (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl} error={!destination && isSubmit}>
                    <InputLabel htmlFor="destination_label">To</InputLabel>
                    <Select
                        value={destination}
                        onChange={(event)=>this.handleChange(event)}
                        inputProps={{
                            name: 'destination',
                            id: 'destination_label',
                        }}
                        className={classes.Select}
                    >
                        {this.renderOption(destination_data)}
                    </Select>
                    {
                        !destination && isSubmit?<FormHelperText>*required</FormHelperText>:<span></span>
                    }
                </FormControl>
            </form>
        );
    }
}
SelectDestination.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps  = dispatch =>{
    return {
        selectDestination: destination =>(dispatch(selectDestination(destination))),
        destinationData: destination =>(dispatch(destinationData(destination)))
    }
}
const mapStateToProps = state =>{
    return {
        destination:state.destination,
        isSubmit:state.isSubmit,
        destination_data:state.destination_data
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SelectDestination));
