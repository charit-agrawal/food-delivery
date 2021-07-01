import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD_CART_ITEMS') {
    //concat() returns a new array without edditing the previous array.
    //const updatedItems = state.items.concat(action.item);
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

    const existingCartItem = state.items[existingCartItemIndex];

    
    let updatedItems;

    if(existingCartItem){
      let updatedItem;
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      // overwriting the old picked item with the new information...
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    else{
      // adding the item if it was not created previously...
      updatedItems = state.items.concat(action.item);
    }


    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if(action.type === 'REMOVE_CART_ITEMS'){
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount- existingItem.price;
      let updatedItems;
      if(existingItem.amount === 1){
        // filter creates a new array after filtering the array...
        // while traversing through each array element if the item pass the array condition then
        // it returns true 
        updatedItems = state.items.filter((item) => item.id !== action.id)
      }
      else{
        const updatedItem = {...existingItem, amount: existingItem.amount -1};
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return{
      items: updatedItems,
      totalAmount: updatedTotalAmount
      }

  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: 'ADD_CART_ITEMS', item: item});
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE_CART_ITEMS', id: id});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;