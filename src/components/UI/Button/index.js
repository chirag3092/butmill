import React from 'react';
import './button.css';

const Button = (props)=> (
    <button
        onClick={props.clicked}
        className={`Button ${props.className}`}
        >{props.name}</button>);
export default Button;