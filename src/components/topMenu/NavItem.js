import React from 'react';
import styled from 'styled-components';
import {
    NavLink
} from "react-router-dom";

const NavItem = (props) => {
    return (
        <li>
            <Link exact to={props.path} activeClassName="selected">{props.title}</Link>
            {/* <Link className={props.className} color={props.color} href="#" >
                {props.title}
            </Link> */}
        </li>
    );
}

// const StyledLink = styled(NavLink)`
//     color: green;
//     text-decoration: none;
//     transition: all 0.2s;
//     font-weight: bold;
//     border-bottom: 1px solid transparent;
//     &:hover {
//         color: orange;
//     }
//     &.selected {
//         border-bottom: 1px solid white;
//     }
// `;

const Link = styled(NavLink)
`
  color: ${props => props.color};
  text-decoration: none;
`;

export default NavItem;