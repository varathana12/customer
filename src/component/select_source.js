import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import {source_api} from "../api";
import {destinationData, selectDestination, selectSource, sourceData} from "../actions";
import {remove_element,same_parent} from "../init/data_fuctions";

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


class SelectSource extends React.Component {
    state = {
        source:''
    };
    handleItem(source_data) {

        var item = [];
        for(var key in source_data){
            item.push({[key]:source_data[key]})
        }
        var element =[]
        item.map((name)=>{
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
    renderOption(source_data){
        const data = this.handleItem(source_data);

        const option = data.map((item,index)=>{
            if(item.role==="parent"){
                return <MenuItem disabled={true} id={"optionParent"+index}
                                 key={index} className={"optionParent"}>{item.name.substr(1)}</MenuItem>
            }
            else{
                return <MenuItem value={item.id} key={index} className={"optionChild"}>{item.name}</MenuItem>
            }
        })
        return option
    }

    handleChange = event => {
        const {destinationData,source_data,selectSource,selectDestination,destination} = this.props
        let value = event.target.value
        if(same_parent(source_data,value,destination)){
            selectDestination(0)
        }
        destinationData(remove_element(source_data,value))
        selectSource(value)
    };

    componentDidMount(){
        const {source_data,sourceData,destinationData,selectSource,selectDestination} = this.props
        if(source_data.length === 0){
            source_api().then(res=>{
                sourceData(res.location)

                selectSource(res.location[Object.keys(res.location)[0]][0].id)
                destinationData(remove_element(res.location,res.location[Object.keys(res.location)[0]][0].id))
                selectDestination(res.location[Object.keys(res.location)[1]][0].id)
            })
        }
    }

    render() {
        const { classes,source_data,source,isSubmit } = this.props;

        return (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl} error={!source&&isSubmit}>
                    <InputLabel htmlFor="source_label">From</InputLabel>
                    <Select
                        value={source}
                        onChange={(event)=>this.handleChange(event)}
                        inputProps={{
                            name: 'source',
                            id: 'source_label',
                        }}
                        className={classes.Select}
                    >
                        {this.renderOption(source_data)}
                    </Select>
                    {
                        !source && isSubmit?<FormHelperText>*required</FormHelperText>:<span></span>
                    }
                </FormControl>

            </form>
        );
    }
}

SelectSource.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchToProps  = dispatch =>{
    return {
        sourceData:data=>(dispatch(sourceData(data))),
        selectSource: source =>(dispatch(selectSource(source))),
        selectDestination: destination =>(dispatch(selectDestination(destination))),
        destinationData: destination =>(dispatch(destinationData(destination)))
    }
}
const mapStateToProps = state =>{
    return {
        source: state.source,
        destination:state.destination,
        isSubmit:state.isSubmit,
        source_data:state.source_data
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SelectSource));
