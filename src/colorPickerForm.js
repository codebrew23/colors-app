/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { ChromePicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = theme => ({
    formBox: {
        display: 'flex',
    },
});
  
class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentColor: 'teal',
            newColorName: '',
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        // This validation probably should be in colorPickerForm to keep all associated 
        // color picking processing together, but it didn't work, so I moved it back and its fine.
        ValidatorForm.addValidationRule('isColorNameUnique', value => 
          this.props.colors.every(
            ({name}) => name.toLowerCase() !== value.toLowerCase()
          )
        );
        ValidatorForm.addValidationRule('isColorUnique', value => 
          this.props.colors.every(
            ({color}) => color !== this.state.currentColor
          )
        );
      }
        
    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex});
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit(){
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        };
        this.props.addNewColor(newColor);
        this.setState({ newColorName: ''})
      
      
    }
        
    render() {
        const { paletteIsFull } = this.props;
        const { currentColor, newColorName } = this.state;
        return (
            <div>
                <ChromePicker 
                    color={currentColor}
                    onChangeComplete={this.updateCurrentColor}/>
                <ValidatorForm onSubmit={this.handleSubmit} >
                    <div className={styles.formBox}>
                    <TextValidator 
                        value={newColorName} 
                        name='newColorName'
                        onChange = {this.handleChange}
                        validators={['required','isColorNameUnique','isColorUnique']}
                        errorMessages={[ 'Cannot be empty', 'Color Name already in use', 'Color is already in use']}
                    />
                    <Button 
                        type='submit'  
                        variant="contained"
                        style={{backgroundColor: paletteIsFull 
                        ? 'grey' :
                        currentColor}} 
                        disabled = {paletteIsFull}
                        color="primary" >
                        {paletteIsFull ? 'Palette full' : 'Add Color'}
                    </Button>
                    </div>
                </ValidatorForm>
            </div>
        )
    }
}
export default ColorPickerForm;