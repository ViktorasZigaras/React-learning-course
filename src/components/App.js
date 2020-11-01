import React, { Component } from 'react';
import { ANIMALS } from '../shared/animals';
import NavMenu from './topMenu/NavMenu';
import styled from 'styled-components';

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
    };
  }

  render () {
    return (
      <Nav>
        <NavMenu list={this.state.menuList} items={this.state.items}/>
      </Nav>
    );
  }
}

const Nav = styled.nav`
    background: gray;
    ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 20px;
        li {
            padding: 5px;
        }
    }
`;

export default App;

// const user = {name:'Thomas', surname:'Philips'}

// const SimpleH2 = props => <h2 {...props} />

// const NiceH2 = styled(SimpleH2)`
//     color: ${props => props.$color}
// `;



//   const About = (props) =>
//   console.log(props) ||
//     <h2>About</h2>;

// const OtherUser = (props) => <UserHoc {...props}/>


// const Users = (props) =>
// console.log(props) ||
//   <h2>Users</h2>;


// const UserHoc = withRouter(Users)