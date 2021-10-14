import Cookies from 'js-cookie';
import React, { createContext, useReducer } from 'react';
import cart from '../pages/cart';

export const StoreContext = createContext();
const initialState = {
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],
    shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress'))
      : null,
    paymentMethod: Cookies.get('paymentMethod')
      ? Cookies.get('paymentMethod')
      : '',
  },
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const newItem = action.payload;
      const existsItem = state.cart.cartItems.find((i) => {
        return i._id === newItem._id;
      });

      const cartItems = existsItem
        ? state.cart.cartItems.map((item) => {
            if (item.name === existsItem.name) {
              return newItem;
            } else {
              return item;
            }
          })
        : [...state.cart.cartItems, newItem];
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'REMOVE_FROM_CART': {
      const cartItems = state.cart.cartItems.filter((item) => {
        return item._id !== action.payload._id;
      });
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'USER_LOGIN': {
      return { ...state, userInfo: action.payload };
    }
    case 'USER_LOGOUT': {
      return { ...state, userInfo: null, cart: { cartItems: [] } };
    }
    case 'SAVE_SHIPPING_ADDRESS': {
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    }
    case 'SAVE_PAYMENT_METHOD': {
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    }
    default:
      return state;
  }
};
export function StoreProvider({ children }) {
  const [result, dispatch] = useReducer(reducer, initialState);
  const value = { result, dispatch };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
