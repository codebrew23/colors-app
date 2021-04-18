import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'
import PaletteMetaForm from './PaletteMetaForm';

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    render() {
        const {classes, open, palettes, handleSubmit} = this.props;
        return (
            <div>
                <CssBaseline />
                <AppBar
                position="fixed"
                color= 'default'
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                >
                <Toolbar disableGutters={!open}>
                    <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.props.handleDrawerOpen}
                    className={classNames(classes.menuButton, open && classes.hide)}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                    Persistent drawer
                    </Typography>
                    <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit}/>
                    <Link to='/'>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        type='submit'>
                        Go Back
                    </Button>
                    </Link>

                </Toolbar>
                </AppBar>
            </div>
        )
    }
}
export default PaletteFormNav;