import React from 'react';
import BuildControl from './BuildControl';
import './BuildControls.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => (
    <div className="burgerControls"> 
        <p>Current Price: <strong>{props.price}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added={() => props.ingredientAdd(ctrl.type)}
                removed={() => props.ingredientRemove(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button 
            className="OrderButton"
            disabled={!props.purchasable}
            onClick={() =>props.ordered(true)}
        >Order Now</button>
    </div>
);

export default BuildControls;