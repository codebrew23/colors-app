import react from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './helpers';
import './App.css';
import { Component } from 'react';

class App extends Component {
  findPalette(id) {
    return seedColors.find(function(palette) {
      return palette.id === id;
    })
  }

  render () {
    return (
      <Switch>
        <Route exact path='/'  render={() => <h1>Palette Goes Here</h1>} />
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
      // <div>
      //   <Palette palette={generatePalette(seedColors[4])}/>
      // </div>
    );

  }
}
export default App;
