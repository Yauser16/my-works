

import { NavLink as Link } from "react-router-dom";
import styled, { css } from 'styled-components';
  
export const Nav = styled.nav` 
  position: absolute;
`;
  
export const NavLink = styled(Link)` 
  display: table;
  ${props => props.more && css`
   display: flex; 
   padding-top: 4px;
   justify-content: center`}
`;
  
export const NavText = styled.p`  
 font-size: 12px;
 display: table-cell;
 vertical-align: bottom;  
 font-family: 'Merienda', cursive;
 color: ${props => props.footer ? 'black' : 'white'}
`;

export const NavMenu = styled.div` 
  width:355px;  
  height: 40px;
  display: flex;  
  margin-top: 38px;
  margin-left: 135px;
  justify-content: space-between;
  @media (max-width: 768px) { 
    margin-left: 0.1px;
    justify-content: space-around;

  }
`;