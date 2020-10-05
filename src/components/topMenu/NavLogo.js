import React from 'react';
import styled from 'styled-components';

const NavLogo = (props) => {
    return (
        <Img className={props.className} src={props.image} />
    );
}

const Img = styled.img
`
  height: 55px;
  margin-bottom: 10px;
`;

export default NavLogo;