import React from 'react';
import './checkoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button';

const CheckoutSummary = (props) => {
    if(!props.ingredients) {
        window.location.href = '/';
    }
    return (
        <div className="checkoutsummary" >
            <h1>We hope it tasted!!</h1>
            <div style={{width: '300px', height: '300px', margin: 'auto' }} >
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                className="Danger"
                clicked={props.checkoutCancel} name="CANCEL" />
            <Button className="Success" clicked={props.checkoutContinue} name="Continue" />
        </div>
    );
}
export default CheckoutSummary;