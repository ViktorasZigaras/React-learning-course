import React, { Component } from 'react';
import { ANIMALS } from './shared/animals';
import NavMenu from './components/topMenu/NavMenu';
import ItemList from './components/items/ItemList';

class App extends Component {
  constructor (props) {
    super();
    this.state = {
      menuList: [
        {id: 1, title: "What's New", color: '#FFFFFF'},
        {id: 2, title: "Shop", color: '#FFFFFF'},
        {id: 3, title: "Dolls", color: '#FFFFFF'},
        {id: 4, title: "Halloween", color: '#FF9000'},
        {id: 5, title: "Clearance", color: '#FF0000'}
      ],
      items: ANIMALS
    }
  }

  render () {
    return (
      <div>
        <NavMenu list={this.state.menuList} />
        <ItemList list={this.state.items} />
      </div>
    );
  }
}

export default App;

// import './App.css';
// import Zoo from './components/Zoo';