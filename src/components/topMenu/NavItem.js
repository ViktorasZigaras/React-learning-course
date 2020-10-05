import React from 'react';
import styled from 'styled-components';

const NavItem = (props) => {
    return (
        <Link className={props.className} color={props.color} href="#" >
            {props.title}
        </Link>
    );
}

const Link = styled.a
`
  color: ${props => props.color};
  text-decoration: none;
`;

export default NavItem;