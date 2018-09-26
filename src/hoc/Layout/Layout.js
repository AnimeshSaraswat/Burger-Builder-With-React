import React from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    };
    sideDrawerOpenHandler = () => {
		console.log('test execution');
        this.setState( ( prevState ) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render () {
        return (
            <Aux>
                <Toolbar openSideDrawer={this.sideDrawerOpenHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;