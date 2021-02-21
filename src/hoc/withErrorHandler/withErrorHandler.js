import React, { useState } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);
        axios.interceptors.request.use(req => {
            setError(null);
            return req;
        })
        axios.interceptors.response.use(resp => resp, error => {
            setError(error)
        });
        const errorConfirmHandler = () => {
            this.setState({error: null});
        };
        return (
            <Aux>
                <Modal show={error} modalClosed={errorConfirmHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default withErrorHandler;