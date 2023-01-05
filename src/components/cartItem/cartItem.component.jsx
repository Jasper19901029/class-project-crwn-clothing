// change to styled-components
// import "./cartItem.styles.scss";
import { CartItemContainer, ItemDetailsContainer } from "./cartItem.styles";

const CartItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetailsContainer>
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </ItemDetailsContainer>
    </CartItemContainer>
  );
};

export default CartItem;
