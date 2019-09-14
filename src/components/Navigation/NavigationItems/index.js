import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem';

const NavigationItems = (props) => (
    <ul className="NavigationItems" >
       <NavigationItem name={'Burger Builder'} link={'/'} />
       <NavigationItem name={'Orders'} link={'/orders'} />
    </ul>
);
export default NavigationItems;