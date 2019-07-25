import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const Burger = (props) => {
 // only transfer the name but no value
  // let ingredientsArr = [];
  // Object.keys(props.ingredients).forEach((igKey) =>{
  //    for (let i = 0;  i < props.ingredients[igKey]; i++) {
  //      console.log(props.ingredients[igKey]); // 1 1 2 1
  //     ingredientsArr.push(<BurgerIngredient key={igKey + i} type={igKey} />)
  //    }
  //  })
  //  console.log(ingredientsArr);
  //  ingredientsArr.reduce((arr, el) =>{
  //    return arr.concat(el);
  //  }, []);

  // method 2
   // Max way of using map
  // const ingredientsArr = Object.keys(props.ingredients)
  // .map(igKey => {
  //   return ([...Array(props.ingredients[igKey])]
  //   .map((_, i) =>{
  //     // console.log(i);
  //    return <BurgerIngredient key = {igKey + i} type={igKey} />
  //   }))
  // }).reduce((arr, el) => {
  //    return arr.concat(el);
  //  }, []);
// console.log(ingredientsArr);

// method 3
  let ingredientsArr = [];

  for (let key in props.ingredients) {
    for (let i = 0; i < props.ingredients[key]; i++) {
      ingredientsArr.push(<BurgerIngredient key={key + i} type={key} />);
    }
  }

  if (ingredientsArr.length === 0){
    ingredientsArr = <p>Please add your ingredients..</p>
  }

  return (
    <div className = {classes.Burger}>
      <BurgerIngredient type='bread-top'/>
      {ingredientsArr}
      <BurgerIngredient type='bread-bottom'/>
    </div>
  )
}


export default Burger;
