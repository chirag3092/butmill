import React, { Fragment } from 'react';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar';
import SideDrawer from '../Navigation/SideDrawer';

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }
    slideDrawerCloseHanlder = (isOpen) => {
        this.setState({ showSideDrawer: !!isOpen });       
    }

    
    render() {
        return(
            <Fragment>
                <Toolbar drawerToggleClick={this.slideDrawerCloseHanlder} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.slideDrawerCloseHanlder} />
                <main className="content" >
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}
export default Layout;