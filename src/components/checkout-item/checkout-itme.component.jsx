import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

// change to styled-component
// import "./checkout-item.styles.scss";
import {
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  RemoveButtonContainer,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  const { addItemToCart, removeItemToCart, clearItemToCart } =
    useContext(CartContext);
  const clearItemHandler = () => clearItemToCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemToCart(cartItem);
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <span className="name">{name}</span>
      <Quantity>
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </Quantity>
      <span className="price">{price}</span>
      <RemoveButtonContainer onClick={clearItemHandler}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
