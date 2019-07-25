import React, { Component } from 'react';
import Button from '../UI/Button/Button';

class OrderSummary extends Component {
  // This does not have to be a class component, just for testing and make sure it's not re-rendering until the modal shows, coz it's wrapped within a modal comp
  componentDidUpdate(){
    console.log('[OrderSumary] did update');
  }
  render() {
    const ingredients = this.props.ingredients;
    const orders = Object.keys(ingredients).map(key => {
      return (
        <li key={key}>
          {key} : {ingredients[key]}
        </li>
      );
    });
    return (
      <div>
        <h1>Your Order</h1>
        <p>A delicious burger with the following ingredients:</p>
        <div>
          <strong>Total Price: ${this.props.price.toFixed(2)}</strong>
        </div>
        <ul>{orders}</ul>
        <p> Continue to checkout? </p>
        <Button btnType='Danger' clicked={this.props.cancel}>
          CANCEL
        </Button>
        <Button btnType='Success' clicked={this.props.continue}>
          CONTINUE
        </Button>
      </div>
    );
  }
}

export default OrderSummary;
