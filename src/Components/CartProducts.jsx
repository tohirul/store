import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import { getProductData } from "../data";
import { Button } from "react-bootstrap";

const CartProducts = (props) => {
  const cart = useContext(CartContext);
  const { id, quantity } = props;
  const productData = getProductData(id);

  return (
    <>
      <h3>Name: {productData.name} </h3>
      <p>Quantity: {quantity}</p>
      <p>Amount: ${(quantity * productData.price).toFixed(2)}</p>
      <Button size="sm" onClick={() => cart.deleteFromCart(id)}>
        Remove
      </Button>
      <hr />
    </>
  );
};

export default CartProducts;
