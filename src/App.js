import react from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import { generatePalette } from './helpers';
import NewPalleteForm from './NewPaletteForm';
import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { palettes: seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);

  }
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  };
  savePalette(newPalette) {
    this.setState({palettes: [...this.state.palettes, newPalette] });
  }
  render () {
    return (
      <Switch>
        <Route 
          exact
          path='/palette/new' 
          render={(routeProps) => ( <NewPalleteForm  savePalette={this.savePalette} {...routeProps}/> )}
        />

        <Route 
          exact
          path='/palette/:paletteId/:colorId' 
          render={routeProps => (
            <SingleColorPalette 
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )} 
            />
          )}
        />

        <Route 
          exact 
          path='/'  
          render={routeProps => (
            <PaletteList palettes={this.state.palettes} {...routeProps}/>
        )} />

        <Route 
          exact path='/palette/:id' 
          render={routeProps => (
            <Palette 
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )} 
            />
          )}
        />
        

      </Switch>
    );

  }
}
export default App;
