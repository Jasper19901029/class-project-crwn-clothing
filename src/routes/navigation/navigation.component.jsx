import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as Crown } from "../../assets/crown.svg";

// 換成styled-components
// import "./navigation.styles.scss";
import {
  NavContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
} from "./navigation.styles";

const Navigation = () => {
  const { currentUser /*setCurrentUser*/ } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  // 改 onAuthStateChangedListener 監聽， auth相關資料移到UserContext處理
  // const signOutUserHandler = async () => {
  //   await signOutUser();
  //   setCurrentUser(null);
  // };
  return (
    <Fragment>
      <NavContainer>
        <LogoContainer to="/">
          <Crown className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavContainer>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
