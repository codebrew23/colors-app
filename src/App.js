import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './helpers';
import './App.css';
import { Component } from 'react';

class App extends Component {
  render () {
    console.log(generatePalette(seedColors[4]));

    return (
      <div>
        <Palette {...seedColors[4]}/>
      </div>
    );

  }
}
export default App;
