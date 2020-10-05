import React from 'react';
import styled from 'styled-components';
import NavItem from './NavItem';

const List = (props) => {
    const links = props.list.map((link) => <li key={link.id}><NavItem color={link.color} title={link.title} /></li>);
    return (
        <ul className={props.className}>
            {links}
        </ul>
    );
}

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