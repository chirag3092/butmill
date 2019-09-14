import React, { Fragment } from 'react';
import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';
import './SideDrawer.css';
import BackDrop from '../../UI/BackDrop';

const SideDrawer = (props) => {
    return (
        <Fragment>
            <BackDrop show={props.open} close={props.closed} />
            <div className={`SideDrawer ${props.open ? 'Open' : 'Close'} `} >
                <Logo />
                <nav>
                    <NavigationItems />
                </nav>    
            </div>
        </Fragment>
    );
};
export default SideDrawer;