import React, {Fragment} from 'react';
import Button from '../../UI/Button';

const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igkey =>  {
            return <li key={igkey} >
                <span>{igkey}</span>: {props.ingredients[igkey]}
            </li>
        })
    ;
    return (
        <Fragment>
            <h3>Order Summary</h3>
            <p>A Burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {props.totalPrice}</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={() => props.close(false)} className='Danger' name='Cancel' />
            <Button clicked={props.continue} className='Success' name='Continue' />
        </Fragment>
    )
};
export default OrderSummary;