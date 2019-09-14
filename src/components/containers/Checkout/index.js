import React from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../Order/CheckoutSummary';
import ContactData from './ContactData';


class Checkout extends React.Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 10,
            bacon: 1,
        },
        price:0,
    }
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        
        const ingredientsType = Object.keys(this.state.ingredients);
        const ingredients = {};
        ingredientsType.map(ingredient => (
            ingredients[ingredient] = parseInt(query.get(ingredient)) || 0
        ));
        this.setState({ ingredients: ingredients, price: query.get('price') });
    }
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
                    ingredients={this.state.ingredients} 
                    checkoutCancel={this.checkoutCancelHandler}
                    checkoutContinue={this.checkoutContinueHandler}
                />
                <Route path={`${this.props.match.path}/contact-data`} 
                render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />)} />
            </div>
        );
    }
}

export default Checkout;