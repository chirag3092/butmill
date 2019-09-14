import React from 'react';
import Order from '../../Order';
import axios from '../../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler';

class Orders extends React.Component {

    state = {
        orders: [],
        loading: true,
    }

    componentDidMount()  {
        axios.get('/orders.json')
            .then(respone => {
                const fetchOrders=  [];
                const responseData = Object.keys(respone.data);
                responseData.map(key =>(
                    fetchOrders.push({
                        ...respone.data[key],
                        id: key
                    })
                ));
                this.setState({ loading: false, orders: fetchOrders });
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            })
    }

    render() {
        console.log(this.state.orders);
        return (
            <div>
                { this.state.orders.map(order => (
                    <Order key={order.id} {...order} />
                )) }
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);