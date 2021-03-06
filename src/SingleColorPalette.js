import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ColorBox from './colorBox';
import Navbar from './navBar';
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
    },
    goBack: {
        width: '20%',
        height: props => props.showingFullPalette ? '25%' : '50%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-3.5px',
        backgroundColor: 'black',
        '& a': {
            width: '100px',
            height: '30px',
            position: 'absolute',
            display: 'inline-block',
            top: '50%',
            left: '50%',
            marginLeft: '-50px',
            marginTop: '-15px',
            textAlign:'center',
            outline: 'none',
            background: 'rgba(255, 255, 255, .3)',
            fontSize: '1rem',
            lineHeight: '30px',
            color: 'white',
            textTransform: 'uppercase',
            border: 'none',
            textDecoration: 'none',        
        }
    }    
} 
class SingleColorPalette extends Component {
    
    constructor(props) {
        super(props);
        this.state = {format:'hex'};
        this.changeFormat = this.changeFormat.bind(this);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    }
    changeFormat(val) {
        this.setState({ format: val });
    }
    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;

        for(let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            );            
        }
        return shades.slice(1);

    }

    render () {
        const { format } = this.state;
        const { paletteName, emoji, id } = this.props.palette;
        const { classes } = this.props;

        const colorBoxes = this._shades.map(color => (
            <ColorBox 
                key={color.name} 
                name={color.name} 
                background={color[format]} 
                showingFullPalette={false}
            />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar 
                    handleChange={this.changeFormat} 
                    showingAllColors={false}
                />
                <div className={classes.paletteColors}>
                    {colorBoxes}
                    <div className={classes.goBack}>

                        <Link to={`/palette/${id}`} >
                            Go Back
                        </Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/> 
            </div>
        )
    }
}
export default withStyles(styles) (SingleColorPalette);