import React, { Component } from 'react';
import ColorBox from './colorBox';
import NavBar from './navBar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';

import './Palette.css';
const styles = {
    Palette: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',   
    },
    paletteColors: {
        height: '90%'
    }
} 
class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {level: 500, format: 'hex' };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeLevel(level) {
        this.setState({ level });
    }
    changeFormat(val) {
        this.setState({ format: val });
    }
    render () {
        const { colors, paletteName, emoji, id} = this.props.palette;
        const { classes } = this.props;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox 
                key={color.id} 
                background={color[format]}  
                name={color.name}
                id={color.id} 
                paletteId={id}
                showingFullPalette 
            />
        ))
        return (
            <div className={classes.Palette}>
                <NavBar 
                    level={level} 
                    changeLevel={this.changeLevel} 
                    handleChange={this.changeFormat}
                    showingAllColors
                />
                <div className={classes.paletteColors}>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/> 
            </div>
        )
    }
}
export default withStyles(styles) (Palette);