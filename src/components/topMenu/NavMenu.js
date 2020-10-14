import React from 'react';
import styled from 'styled-components';
import NavLogo from './NavLogo';
import NavList from './NavList';

const NavMenu = (props) => {
    return (
        <Menu className={props.className}>
            <NavLogo image={'assets/images/dollskill_logo.png'} />
            <NavList list={props.list} items={props.items} />
        </Menu>
    );
}

const Menu = styled.header
`
  width: 100%;
  box-sizing: border-box;
  background-color: #000000;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding-left: 15px;
  padding-right: 15px;
  min-height: 84px;
`;

export default NavMenu;