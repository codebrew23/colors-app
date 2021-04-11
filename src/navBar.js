import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import { MenuItem, Select, IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import SnackBar from '@material-ui/core/Snackbar';

// import IconButton from '@material-ui/core/IconButton';
import 'rc-slider/assets/index.css';
import './NavBar.css'


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { format: 'hex', open: false }
        this.handleChange = this.handleChange.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
    }
    handleChange(e) {
        this.setState({ format: e.target.value, open: true});
        this.props.handleChange(e.target.value);
    }
    closeSnackBar(e) {
        this.setState({ open: false})
    }
    render () {
     const { level, changeLevel} = this.props;
     const { format } = this.state;
     const { showingAllColors } = this.props;
      return (
        <header className='NavBar'>
            <div className='logo'>
                <Link to='/'>reactcolorpicker</Link>
            </div>
            {showingAllColors && (
                <div className='slider-container'>
                    <span>Level: {level}</span>
                    <div className='slider'>
                        <Slider 
                            defaultValue={level} 
                            min={100} 
                            max={900} 
                            step={100}
                            onAfterChange={changeLevel} />
                    </div>
                </div>
            )}
            <div className='select-container'>
                <Select value ={format} onChange={this.handleChange}>
                    <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                    <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
                    <MenuItem value='rgba'>RGBA - rgba(255,255,255, 1.0)</MenuItem>
                </Select>
            </div>
            < SnackBar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
                open={this.state.open}
                autoHideDuration={3000}
                message= {<span id='message-id'>Format Changed!</span>}
                ContentProps ={{ 'aria-describeby': 'message-id' }}  
                action = {[
                    <IconButton onClick={this.closeSnackBar} 
                        color='inherit' 
                        key='close' >
                        <CloseIcon/>
                    </IconButton>
                ]}  
            />
        </header>
        );
  
    }
  }
  export default NavBar;
  