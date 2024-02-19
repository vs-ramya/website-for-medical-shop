
import React, { useState } from "react";
import Cart from "./Cart";
import classes from './AddProduct.module.css';

const AddProduct = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [price, setPrice] = useState(0); 

  const addToCartHandler = async (item) => {
    if (quantity > 0 && quantity <= item.quantity) {
      const newItem = {
        name: item.name,
        use: item.use,
        quantity: 1, 
        price: item.price,
      };
      let updatedCart = [...cart];
      const index = updatedCart.findIndex((cartItem) => cartItem.name === item.name);
      if (index !== -1) {
        // If item already exists in cart, update its quantity
        updatedCart[index].quantity += 1;
      } else {
        // If item is not in cart, add it
        updatedCart.push(newItem);
      }

      setCart(updatedCart);

      setData((prevData) => {
        return prevData.map((prevItem) => {
          if (prevItem === item) {
            return {
              ...prevItem,
              quantity: prevItem.quantity - 1,
            };
          }
          return prevItem;
        });
      });

      setQuantity(quantity - 1);

      try {
        const response = await fetch(
          "https://crudcrud.com/api/f9848a720c9c4eeb979393e708ff7c6d/carts",
          {
            method: "POST",
            body: JSON.stringify({
              name: item.name,
              use: item.use,
              quantity: "1",
              price: item.price,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);
      } catch (error) {
        console.error("Error sending data:", error);
      }
    } else {
      console.log("Invalid quantity or quantity not available");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newData = {
      name: e.target.elements.name.value,
      use: e.target.elements.use.value,
      quantity: parseInt(e.target.elements.quantity.value, 10),
      price: price, 
    };
    setData([...data, newData]);
    setQuantity(newData.quantity);
    setPrice(0); // Reset price after adding the product
    e.target.reset();
  };

  const showItemInCart = () => {
    setShowCart(true);
  };

  return (
    <>
      <button onClick={showItemInCart} className={classes.cartButton}>
        Cart {cart.length}
      </button>
      <div className={classes.formContainer}>
        <form onSubmit={submitHandler}>
          <label className={classes.inputLabel}>Medicine name:</label>
          <input type="text" name="name" className={classes.inputField} onChange={(e) => e.target.value} />
          <label className={classes.inputLabel}>Medicine use:</label>
          <input type="text" name="use" className={classes.inputField} onChange={(e) => e.target.value} />
          <label className={classes.inputLabel}>Quantity:</label>
          <input
            type="number"
            name="quantity" 
            value={quantity || ""}
            className={classes.inputField}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          />
          <label className={classes.inputLabel}>Price:</label>
          <input
            type="number"
            name="price"
            value={price || ""}
            className={classes.inputField}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
          <button type="submit" className={classes.submitButton}>Submit</button>
        </form>
      </div>
      <h1>Product details</h1>
      <div className={classes.formContainer}>
        {data.map((item, index) => (
          <ul key={index} className={classes.productList}>
            <li>
              <p className={classes.cartItem}>
                Name: {item.name}
                Use: {item.use}
                Quantity: {item.quantity}
                Price: {item.price} 
                <button 
                  onClick={() => addToCartHandler(item)}
                  disabled={item.quantity === 0} // Disable the button if quantity is 0
                  className={classes.cartButton}
                >
                  Add to bill
                </button>
              </p>
            </li>
          </ul>
        ))}
      </div>
      {showCart && <Cart cart={cart} setCart={setCart} />}
    </>
  );
};

export default AddProduct;
