import React, { Component } from 'react';
import ColorBox from './colorBox';
import NavBar from './navBar';
import './Palette.css';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {level: 500};
        this.changeLevel = this.changeLevel.bind(this);
    }
    changeLevel(level) {
        this.setState({ level });
    }
    render () {
        const { colors } = this.props.palette;
        const { level } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color.hex} name={color.name} />
        ))
        return (
            <div className='Palette'>
                <NavBar level={level} changeLevel={this.changeLevel}/>
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                {/* Footer Eventually */}
            </div>
        )
    }
}
export default Palette;