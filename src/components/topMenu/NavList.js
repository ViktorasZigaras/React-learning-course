import React from 'react';
import styled from 'styled-components';
import NavItem from './NavItem';
import {
    BrowserRouter as Router,
    Route,
    withRouter
  } from "react-router-dom";
  import ItemList from '../items/ItemList';

const List = (props) => {
    console.log(props)
    const links = props.list.map((link) => <NavItem color={link.color} title={link.title} path={'/' + link.id} key={link.id} />);
    return (
        <Router>
          <nav>
            <ul className={props.className}>
                {links}
            </ul>
          </nav>
            
          <div>
            <Route exact path="/1" component={() => <ItemsRouted list={props.items} />} />
          </div>
            
            {/* <Route exact path="/2" component={Items} />
            <Route exact path="/3" component={Items} />
            <Route exact path="/4" component={Items} />
            <Route exact path="/5" component={Items} /> */}
            {/* <Route exact path="/about" component={About} /> */}
            {/* <Route exact path="/users" render={() => <OtherUser user={user} /> } /> */}
        </Router>
    );
}

const Items = (props) => console.log(props) || <div><ItemList list={props.list} /></div>; // <ItemList list={props.items} />
const ItemsHoc = withRouter(Items);
const ItemsRouted = (props) => <ItemsHoc {...props}/>; 


// const Nav = styled.nav
// `
//     background: gray;
//     ul {
//         display: flex;
//         list-style: none;
//         margin: 0;
//         padding: 20px;
//         li {
//             padding: 5px;
//         }
//     }
// `;

/* 
<StyledLink to="/about" activeClassName="selected">About</StyledLink>
<StyledLink to="/users" activeClassName="selected">Users</StyledLink> */

// const OtherUser = (props) => <UserHoc {...props}/>
// const Users = (props) =>
// console.log(props) ||
//   <h2>Users</h2>;
// const UserHoc = withRouter(Users)



const NavList = styled(List)
`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin: 0;
  height: 84px;
  list-style: none;
  li {
      margin: 0;
      a {
        //   fonat-family: 'PT Sans Narrow, sans-serif;
          fonst-size: 22px;
          text-transform: uppercase;
          letter-spacing: -0.4px;
          padding: 10px;
          display: inline-block;
      }
  }
`;

export default NavList;