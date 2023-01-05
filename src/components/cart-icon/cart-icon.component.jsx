import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

// change to styled-components
// import "./cart-icon.styles.scss";
import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
