/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import blue from 'material-ui/colors/blue';
import Button from '@material-ui/core/Button';
var QRCode = require('qrcode-react');
var qr = require('qr-image');
const styles = theme => ({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    dialog:{
        margin:0,
        flexDirection:"row"
    },
    button: {
        margin: theme.spacing.unit,

    },
});

class Qr_code extends React.Component {
    Download(id){
        var svg_string = qr.imageSync('I love QR!', { type: 'png' });
        console.log(svg_string)
    }
    render() {
        const { classes, onClose, open , id} = this.props;
        return (
            <Dialog onClose={this.handleClose} className={classes.dialog} aria-labelledby="simple-dialog-title" open={open}
                    onClose={onClose} >
                <div style={{padding:10,paddingBottom:8}}>
                    <QRCode value={id} size={200}/>
                </div>

                {/* <Button color="primary" onClick={()=>this.Download(id)} className={classes.button}>
                        Download
                    </Button>
                    */}


            </Dialog>
        );

    }
}

Qr_code.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Qr_code);
