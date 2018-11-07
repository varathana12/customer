import React from 'react';

import { withStyles } from 'material-ui/styles';
import FullIntroduction from '../component/dialog/full_indtroduction'


const styles = theme => ({
    root: {
        width:400,
        marginTop:64
    },
    yes: {
        margin: theme.spacing.unit,
        borderStyle:"solid",
        borderWidth:2,
        borderRadius:4,
        width:"40%",
        float:'right'
    },
    no:{
        margin: theme.spacing.unit,
        borderStyle:"solid",
        width:"40%",
        borderWidth:2,
        borderRadius:4,
        float:'left'
    },
    paper: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),

});

class Introduce_Request extends React.Component {
    render(){
        const {classes} = this.props
        return(

            <div style={{marginTop:64}}>
                <FullIntroduction/>
            </div>
        )
    }
}




export default withStyles(styles, { withTheme: true })(Introduce_Request);
