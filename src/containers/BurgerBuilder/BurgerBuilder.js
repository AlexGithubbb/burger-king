import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_UNIT = {
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
  salad: 0.5
};

class BurgerBuilder extends Component {
  state = {
    // ingredients: {
    //   salad: 0,
    //   bacon: 0,
    //   cheese: 0,
    //   meat: 0
    // },
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error : false
  };

  // updatePerchase(ingredients) {
  //   // wired way with some
  //   // return Object.values(ingredients).some(amount => amount > 0)

  //   // use Object.values(obj)
  //   // another way easier than Object.keys(obj)
  //   let sum = 0;
  //   sum = Object.values(ingredients).reduce((sum, el) => {
  //     return sum + el;
  //   }, 0);

  //   // if(sum > 0){
  //   //   this.setState({purchasable: true})
  //   // }
  //   this.setState({ purchasable: sum > 0 });
  // }

  componentDidMount() {
    // https://react-boost-burger123.firebaseio.com/ingredients
    axios.get('/ingredients.json')
    .then(response => {

      ///////////////////
      // to sort the ingredients name alphabatically
      const sortable = [];
      const desiredOrder = ['salad', 'bacon', 'cheese', 'meat'];
      for (var ingredient in response.data) {
        sortable.push([ingredient, response.data[ingredient]]);
      }
      sortable.sort(function(a, b) {
        return desiredOrder.indexOf(a[0]) - desiredOrder.indexOf(b[0]);
      });
      const sortedIngredients = Object.fromEntries(sortable);
      ///////////////////

      this.setState({ ingredients: sortedIngredients });
    })
    .catch(error => {
      this.setState({error : true})
    })
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;

    const additionPrice = INGREDIENTS_UNIT[type];
    const newPrice = this.state.totalPrice + additionPrice;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    // this.updatePerchase(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const newCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;

    const deductionPrice = INGREDIENTS_UNIT[type];
    const newPrice = this.state.totalPrice - deductionPrice;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    // this.updatePerchase(updatedIngredients);
  };

  showModalHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert('You Continue!')
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'bowei Yao',
        address: {
          street: 'Shipka',
          zipcode: '123456',
          country: 'Canada'
        }
      },
      deliveryOption: 'fastest'
    };
    axios
      .post('/orders.json', order)
      .then(res => this.setState({ loading: false, purchasing: false }))
      .catch(err => this.setState({ loading: false, purchasing: false }));
  };

  //////////////////  RENDER /////////////////////////////////

  render() {

    let ordersummary = null;
    let burgerView = this.state.error ? <h1>Failed to get ingredients from Database</h1> :  <Spinner />
    if (this.state.ingredients) {
      const canWeOrder = Object.values(this.state.ingredients).some(i => i > 0);
      const disabledIngredients = {
        ...this.state.ingredients
      };

      for (let key in disabledIngredients) {
        disabledIngredients[key] = disabledIngredients[key] <= 0;
      }

    // {salad: true, bacon: true, cheese: true, meat: true}
    // console.log(disabledIngredients);
       burgerView = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />;
        <BuildControls
            disabled={disabledIngredients}
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            currentPrice={this.state.totalPrice}
            // purchasable={this.state.purchasable}
            purchasable={canWeOrder}
            ordered={this.showModalHandler}
          />
        </Aux>
      );
      ordersummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      ordersummary = <Spinner />;
    }

    //////////////////  RETURN  /////////////////////////////////

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {ordersummary}
        </Modal>
        {burgerView}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
