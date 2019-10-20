import React from 'react';
import { connect } from 'react-redux';
import { purchaseBurger } from '../../../../store/actions/order';
import Button from '../../../UI/Button';
import './contactData.css';
import Spinner from '../../../UI/Spinner';
import Input from '../../../UI/Input';

class ContactData extends React.Component {
    state = {
        orderData: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            buliding: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Building'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 10,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastes', displayValue: 'Fastes'},
                        {value: 'regular', displayValue: 'Regular'},
                    ]
                },
                value: 'fastes',
                validation: {},
                valid: true,
            },
        },
    }

    checkValidation(value, rules) {
        let isvalid = true;
        
        if(rules.required) {
            isvalid = value.trim() !== '' && isvalid ;
        }
        if(rules.minLength) {
            isvalid = value.length >= rules.minLength && isvalid;
        }

        if(rules.maxLength) {
            isvalid = value.length <= rules.maxLength && isvalid;
        }

        return isvalid;
    }

    orderHandler = (e) => {
        e.preventDefault();
        const formData = {};
        const formElement =  Object.keys(this.state.orderData);
        formElement.map(formValue => (
            formData[formValue] = this.state.orderData[formValue].value
        ));
        const orderData = {
            ingredients: this.props.ings,
            price: this.props.price,
            customerData: formData,
        };
        
        this.props.onPurchaseBurger(orderData);
    }
    elementChangeHandler = (event, inputIdentifier ) => {
        const updatedOrderForm = {
            ...this.state.orderData
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier],
            value: event.target.value,
            touched: true,
        }
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({ orderData: updatedOrderForm});
        
    }
    render() {
        const formElements = [];
        const formData = Object.keys(this.state.orderData);
        formData.map(key => (
            formElements.push({
                id: key,
                config: this.state.orderData[key]
            })
        ));
        return (    
            <div className="contactData" >
                <h3>Enter Your Contact Data</h3>
                <h2><strong>{this.props.price}</strong> </h2>
                { this.props.loading ? <Spinner /> : 
                    <form onSubmit={this.orderHandler} >
                        { formElements.map(formElement =>(
                            <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                touched={formElement.config.touched}
                                changeHandler={(event) =>this.elementChangeHandler(event, formElement.id)}
                            />
                        )) }
                        <Button name="Order" className="Success" />
                    </form>    
                }
            </div>
        )
    }
}
const mapStateToProps = ({ burgerBuilder, order }) => {
    const { ingredients, totalPrice } = burgerBuilder;
    const { loading } = order;
    return {
        ings: ingredients,
        price: totalPrice,
        loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseBurger: (orderData) => dispatch(purchaseBurger(orderData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);