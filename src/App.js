import React, { Component } from 'react';
import './App.css';
import Zoo from './components/Zoo';
import { ANIMALS } from './shared/animals';

class App extends Component {
  constructor (props) {
    super();
    this.state = {
      animals: ANIMALS
    }
  }

  render () {
    return (
      <div>
        <Zoo animals={this.state.animals} />
      </div>
    );
  }
}

export default App;
