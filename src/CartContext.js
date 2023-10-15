import { createContext, useState } from "react";
import { getProductData } from "./data";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const getProductQuantity = (id) => {
    const quantity = cartProducts.find((item) => item.id === id)?.quantity;

    if (quantity === undefined) return 0;
    else return quantity;
  };
  const addOneToCart = (id) => {
    const quantity = getProductQuantity(id);
    if (quantity === 0)
      setCartProducts([...cartProducts, { id: id, quantity: 1 }]);
    else
      setCartProducts(
        cartProducts.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
  };

  const deleteFromCart = (id) => {
    setCartProducts(cartProducts.filter((item) => item.id !== id));
  };

  const removeOneFromCart = (id) => {
    const quantity = getProductQuantity(id);
    if (quantity === 1) deleteFromCart(id);
    else
      setCartProducts(
        cartProducts.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
  };
  const getTotalCost = () => {
    let totalCost = 0;
    cartProducts.forEach((item) => {
      const data = getProductData(item.id);
      // console.log("Data:", data);
      totalCost += data.price * item.quantity;
      // console.log(totalCost, data.price, item.quantity);
    });
    return totalCost;
  };

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
