import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    constructor() {
      super();
      this.reqInterceptor = axios.interceptors.request.use(
        req => {
          this.setState({ error: null });
          return req;
        }
      );
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        err => {
          this.setState({ error: err });
        }
      );
    }
componentWillUnmount(){
  console.log('ComponentWIllUnmount', this.reqInterceptor, this.resInterceptor);

  axios.interceptors.request.eject(this.reqInterceptor);
  axios.interceptors.response.eject(this.resInterceptor);
}
    errorConfirmHandler =() => {
      this.setState({error: null})
    }
    render() {
      return (
        <Aux>
          <Modal show={this.state.error}
            modalClosed = {this.errorConfirmHandler}>
            {/* message is return from error object by firebase */}
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
