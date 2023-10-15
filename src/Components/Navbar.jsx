import React, { useState, useContext } from "react";
import { Button, Navbar, Modal } from "react-bootstrap";
import { CartContext } from "../CartContext";
import CartProducts from "./CartProducts";
import { getProductData } from "../data";

const Navigationbar = () => {
  const cart = useContext(CartContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const dataToSend = cart.items.map((item) => {
    const product = getProductData(item.id);
    return {
      basePrice: product.price,
      quantity: item.quantity,
      name: product.name,
      id: product.id,
    };
  });
  const checkout = async () => {
    const url = "http://localhost:5000/checkout";
    console.log(dataToSend);

    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData);
      if (responseData?.success_url) {
        window.location.assign(responseData.success_url);
      }
    } catch (error) {
      console.error("Error:", error);
      // handle the error, e.g., show an error message to the user
    }
  };

  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">Ecommerce Stripe Geteway</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleOpen}>Cart: {productsCount} items</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your cart :</p>
              {cart.items.map((product, idx) => (
                <div key={idx}>
                  <CartProducts
                    key={idx}
                    id={product.id}
                    quantity={product.quantity}
                  />
                </div>
              ))}
              <h1>Total: {cart.getTotalCost()}</h1>
              <Button variant="success" onClick={checkout}>
                Purchase Items!
              </Button>
            </>
          ) : (
            <h2>This is where the magic happens!</h2>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Navigationbar;
