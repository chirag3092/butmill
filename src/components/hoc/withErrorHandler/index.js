import React, { Fragment } from 'react';
import Modal from '../../UI/Modal';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends React.Component  {
        state = {
            error : null
        }
        UNSAFE_componentWillMount () {
            this.reqInterceptors  = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            this.resInterceptors  =axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            })
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.request.eject(this.resInterceptors);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Fragment>
                    <Modal 
                        show= {this.state.error}
                        close={this.errorConfirmedHandler}
                    >
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>    
            )
        }
    }
};

export default withErrorHandler;