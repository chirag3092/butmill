import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToogle';

const Toolbar = (props) => (
    <header className="Toolbar" >
        <DrawerToggle clicked={props.drawerToggleClick} />
        <div><Logo /></div>
        <nav className="DesktopOnly" >
            <NavigationItems />
        </nav>
    </header>
);
export default Toolbar;