import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../Order/CheckoutSummary';
import ContactData from './ContactData';

class Checkout extends React.Component {
    
    checkoutCancelHandler = () =>  {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings} 
                    checkoutCancel={this.checkoutCancelHandler}
                    checkoutContinue={this.checkoutContinueHandler}
                />
                <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { burgerBuilder } = state;
    return {
        ings: burgerBuilder.ingredients,
    }
}
export default connect(mapStateToProps)(Checkout);