import React from 'react';
import './input.css';

const Input = (props) => {
    let inputElem = '';
    switch(props.inputType) {
        case 'input' : {
            inputElem = <input {...props} className="inputElem" />
            break;
        }
        case 'textarea': {
            inputElem = <textarea {...props} className="inputElem" />
            break;
        }     
        default : {
            inputElem = <input {...props} className="inputElem" />
            break;
        }
    }

    return (
        <div className="input" >
            <label className="label">{props.label}</label>
            {inputElem}
        </div>
    )
}
export default Input;