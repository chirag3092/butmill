import React from 'react';
import './input.css';

const Input = (props) => {
    let inputElem = '';
    let validationError = null;
    const inputClasses = ['inputElem'];

    if(props.invalid && props.touched) {
        inputClasses.push('error');
        validationError = <p className="ValidationError">Please enter a valid value!</p>;
    }

    switch(props.elementType) {
        case 'input' : {
            inputElem = <input 
                            className={inputClasses.join(' ')}
                            {...props.elementConfig}
                            value={props.value}  
                            onChange={props.changeHandler} />
            break;
        }
        case 'textarea': {
            inputElem = <textarea 
                            className={inputClasses.join(' ')}
                            {...props.elementConfig}
                            value={props.value} 
                            onChange={props.changeHandler} />
            break;
        }
        case 'select': {
            inputElem = (
                        <select 
                            className={inputClasses.join(' ')}
                            value={props.value} 
                            onChange={props.changeHandler}>
                            { props.elementConfig.options.map(option => (
                                <option key={option.value} value={option.value} >
                                    {option.displayValue}
                                </option>
                            )) }    
                            </select>
                        )
            break;
        }     
        default : {
            inputElem = <input 
                            className={inputClasses.join(' ')}
                            {...props.elementConfig}
                            value={props.value} 
                            onChange={props.changeHandler} />
            break;
        }
    }

    return (
        <div className="input" >
            <label className="label">{props.label}</label>
            {inputElem}
            {validationError}
        </div>
    )
}
export default Input;