import React from 'react';
import { connect } from 'react-redux';
import Order from '../../Order';
import axios from '../../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler';
import { fetchOrder } from '../../../store/actions/order';

class Orders extends React.Component {

    componentDidMount()  {
        this.props.onFetchOrder();
    }

    render() {
        return (
            <div>
                { this.props.orders.map(order => (
                    <Order key={order.id} {...order} />
                )) }
            </div>
        )
    }
}

const mapStateToProps = ({ order }) => {
    const { orders } = order;
    return {
        orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: () => dispatch(fetchOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));