import React, { Fragment } from 'react';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls';
import Modal from '../../UI/Modal';
import OrderSummary from '../../Burger/OrderSummary';
import axios from '../../../axios-order';
import Spinner from '../../UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

const ingredientPrice = {
    salad: 5,
    bacon: 10,
    cheese: 15,
    meat: 20 
}

class BurgerBulider extends React.Component {
    state = {
        ingredients : null,
        totalprice: 30,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        axios.get('https://butmill.firebaseio.com/ingredient.json')
            .then(response => {
                this.setState({ ingredients: response.data })
                this.updatePurchaseState(response.data)       
            })
            .catch(error => {
                this.setState({error: true});
            })    
        ;
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey]
            }).reduce((sum, el) => {
                return sum+el;
            },0);
        this.setState({ purchasable: sum >0 })    

    }

    addIngredientHandler = (type) => {
        const oldcount = this.state.ingredients[type];
        const updatecount = oldcount+1;
        const updatedIngredient = {
            ...this.state.ingredients,
        }
        updatedIngredient[type] = updatecount;
        const priceAddition = ingredientPrice[type];
        const oldPrice = this.state.totalprice;
        const newPrice = oldPrice+priceAddition;
        this.setState({totalprice: newPrice, ingredients: updatedIngredient});
        this.updatePurchaseState(updatedIngredient);
    }
    removeIngredientHandler = (type) => {
        const oldcount = this.state.ingredients[type];
        if(oldcount<=0) {
            return;
        }
        const updatecount = oldcount-1;
        const updatedIngredient = {
            ...this.state.ingredients,
        }
        updatedIngredient[type] = updatecount;
        const priceDeduction = ingredientPrice[type];
        const oldPrice = this.state.totalprice;
        const newPrice = oldPrice-priceDeduction;
        this.setState({totalprice: newPrice, ingredients: updatedIngredient});
        this.updatePurchaseState(updatedIngredient);
    }
    
    purchaseHandler = (isOpen) => {
        this.setState({purchasing: isOpen});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        const ingredientsType = Object.keys(this.state.ingredients);
        ingredientsType.map(ingredient => (
            queryParams.push(`${ingredient}=${this.state.ingredients[ingredient]}`)
        ));
        queryParams.push(`price=${this.state.totalprice}`);
        const queryString = queryParams.join('&');
        this.props.history.push({
           pathname: '/checkout',
           search: `?${queryString}` 
        });
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for(var key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            <Fragment>
                <Modal show={this.state.purchasing} close={this.purchaseHandler} >
                    { this.state.loading && <Spinner /> }
                    {!this.state.loading && this.state.ingredients && <OrderSummary 
                        ingredients={this.state.ingredients} 
                        close={this.purchaseHandler} 
                        continue={this.purchaseContinueHandler}
                        totalPrice={this.state.totalprice}
                    />}
                </Modal>
                { !this.state.ingredients && <Spinner /> }
                { this.state.ingredients &&
                    <Fragment>
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls 
                            ingredientAdd={this.addIngredientHandler} 
                            ingredientRemove={this.removeIngredientHandler}
                            disabled={disableInfo}
                            price={this.state.totalprice}
                            purchasable={this.state.purchasable}
                            ordered = {this.purchaseHandler}
                        />
                    </Fragment>    
                }
                {this.state.error && <p>ingredient's can't loaded...!!!</p> }
            </Fragment>
        )
    }
}
export default withErrorHandler(BurgerBulider, axios);