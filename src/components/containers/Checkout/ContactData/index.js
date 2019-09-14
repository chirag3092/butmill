import React, { Fragment }  from 'react';
import Button from '../../../UI/Button';
import './contactData.css';
import axios from '../../../../axios-order';
import Spinner from '../../../UI/Spinner';
import Input from '../../../UI/Input';

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: 'Test Flat',
            zipcode: '123456',
        },
        loading: false,
    }
    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const orderData = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customerData: {
                name: 'Chirag Patel',
                address: {
                    buliding: 'Test Flat',
                    zipcode: '123456',
                    country: 'India'
                },
                email: 'chirag.3092@gmail.com'
            },
            deliveryMethod: 'fastestdd'
        };
        
        axios.post('/orders.json',orderData)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }
    render() {
        return (    
            <div className="contactData" >
                <h3>Enter Your Contact Data</h3>
                { this.props.loading ? <Spinner /> : 
                    <Fragment>
                        <Input inputType="input" type="text" name="name" placeholder="Your Name" />
                        <Input inputType="input" type="text" name="email" placeholder="Your Email" />
                        <Input inputType="input" type="text" name="street" placeholder="Street" />
                        <Input inputType="input" type="text" name="zipcode" placeholder="zipcode" />
                        <Button name="Order" clicked={this.orderHandler} className="Success" />
                    </Fragment>    
                }
            </div>
        )
    }
}

export default ContactData;