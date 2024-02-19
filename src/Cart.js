import React from "react";
import classes from './Cart.module.css';

const Cart = ({ cart, setCart }) => {
  return (
    <div className={classes.cartContainer}>
    <h2 className={classes.cartHeader}>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <p>
              Name: {item.name}
              Use: {item.use}
              Price:{item.price}
              Quantity:{item.quantity}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;

