import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PaperSheet from './paper_introduce'
const styles = theme => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

function getSteps() {
    return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return 'Select campaign settings...';
        case 1:
            return 'What is an ad group anyways?';
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Uknown stepIndex';
    }
}
function getDescription(stepIndex) {
    switch (stepIndex) {
        case 0:
            return 'Select campaign settings...';
        case 1:
            return 'What is an ad group anyways?';
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Uknown stepIndex';
    }
}

class HorizontalLabelPositionBelowStepper extends React.Component {
    state = {
        activeStep: 0,
        title:"Select campaign settings...",
        description:""
    };

    handleNext = () => {
        const {onClose} = this.props
        const { activeStep } = this.state;
        if(activeStep === getSteps().length -1){
            onClose()
        }else{
            this.setState({
                activeStep: activeStep + 1,
            });
        }


    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep,title } = this.state;

        return (
            <div className={classes.root}>
                <div style={{margin:20}}>
                    <PaperSheet title={getStepContent(activeStep)} description={getDescription(activeStep)}/>
                </div>

                <Stepper activeStep={activeStep} alternativeLabel style={{padding:0,paddingTop:20,paddingBottom:20}}>
                    {steps.map(label => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div style={{margin:20}}>

                        <div >
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.backButton}
                                >
                                    Back
                                </Button>
                                <Button variant="contained" color="primary" onClick={this.handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

HorizontalLabelPositionBelowStepper.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalLabelPositionBelowStepper);
