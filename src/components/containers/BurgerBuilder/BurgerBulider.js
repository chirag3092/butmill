import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { addIngredients, removeIngredients, initIngredients } from '../../../store/actions/burgerBuilder';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls';
import Modal from '../../UI/Modal';
import OrderSummary from '../../Burger/OrderSummary';
import axios from '../../../axios-order';
import Spinner from '../../UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

class BurgerBulider extends React.Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey]
            }).reduce((sum, el) => {
                return sum+el;
            },0);
        return sum >0;

    }

    purchaseHandler = (isOpen) => {
        this.setState({purchasing: isOpen});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disableInfo = {
            ...this.props.ings
        };
        for(var key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            <Fragment>
                <Modal show={this.state.purchasing} close={this.purchaseHandler} >
                    { this.state.loading && <Spinner /> }
                    {!this.state.loading && this.props.ings && <OrderSummary 
                        ingredients={this.props.ings} 
                        close={this.purchaseHandler} 
                        continue={this.purchaseContinueHandler}
                        totalPrice={this.props.finalPrice}
                    />}
                </Modal>
                { !this.props.ings && <Spinner /> }
                { this.props.ings &&
                    <Fragment>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls 
                            ingredientAdd={this.props.onIngredientsAdd} 
                            ingredientRemove={this.props.onIngredientsDelete}
                            disabled={disableInfo}
                            price={this.props.finalPrice}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            ordered = {this.purchaseHandler}
                        />
                    </Fragment>    
                }
                {this.props.error && <p>ingredient's can't loaded...!!!</p> }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    const { burgerBuilder, totalPrice, error } = state;
    return {
        ings: burgerBuilder.ingredients,
        finalPrice: totalPrice,
        error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdd : (ingredient) => dispatch(addIngredients(ingredient)),
        onIngredientsDelete : (ingredient) => dispatch(removeIngredients(ingredient)),
        onInitIngredients : () => dispatch(initIngredients()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBulider, axios));