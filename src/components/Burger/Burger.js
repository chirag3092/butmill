import React from 'react';
import BurgerIngredient from './BurgerIngredient';
import './burger.css';

const Burger = (props) => {
    const transformIngredient = Object.keys(props.ingredients)
    .map(igkey => {
        return [...Array(props.ingredients[igkey])].map((_, i) => {
            return <BurgerIngredient key={igkey +i} type={igkey} />
        });
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    const burgerWithIngredient = transformIngredient.length === 0 ? <p>Please add Ingredient</p> : transformIngredient
    return (
        <div className="burger">
            <BurgerIngredient type="bread-top" />
            {burgerWithIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
};
export default Burger;