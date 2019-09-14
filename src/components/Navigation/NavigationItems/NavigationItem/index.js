import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => (
    <li className="NavigationItem">
       <NavLink
            to={props.link} 
            activeClassName={`active`}
            exact
        >
            {props.name}
    </NavLink>
    </li>
);
export default NavigationItem;