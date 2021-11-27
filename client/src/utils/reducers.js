/*
  The reducers file is where we manage state for all the entities we are dealing
  with in the application. 

  The key thing about reducers is that they never modify the current state. They make 
  a copy of the current state, modify the copy, and replace the current with the
  new state. This makes it possible for state updates to work predictably, and to also 
  easily undo/rollback state changes.

  Notice how all actions which dictate state are defined here. Each action is defined 
  only once and can be called anytime needed. When called, it will always behave the 
  exact same way.
*/


/* The import statement below, and the file it pulls from (actions.js) simply define 
  queries as constant variables. This is considered a best practice when using Redux,
  but it does add some extra overhead.
*/
import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART
} from "./actions";

// Here we define the initial state value for all the data points we are keeping track of.
const initialState = {
  products: [],
  categories: [],
  currentCategory: '',
  cart: [],
  cartOpen: false
};

/* The reducers function is where we actual make the state change. Each time the 
function is called, the current state is passed through, along with an action object.
The action object usually contains the name of the action to be performed (action.type) and 
any data needed for that operation. */

export const reducers = (state = initialState, action) => {
  switch (action.type) {

    /* Here we are taking in the current state, and modifying the products array based 
    on data contained in action.products */
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
    
    /* Here we are duplicating current state, setting cartOpen to true, and then adding a 
    new product to the cart. The resulting updated state then replaces current state. */
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };


    /* TODO:  create a case statement for ADD_MULTIPLE_TO_CART. It should duplicate current state, 
    then update the cart array: first by duplicating the existing cart, then adding all new products 
    passed in via the action object. */

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(product => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity
          }
          return product
        })
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter(product => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };

    /* TODO: create a case statement for CLEAR_CART. It should duplicate current state, 
    set cartOpen to false, and empty the cart array. */
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };

    /* TODO: create a case statement for TOGGLE_CART. It should duplicate the current 
    state, then set the cartOpen variable to it's opposite value. */
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    /* TODO: create a case statement for UPDATE_CURRENT_CATEGORY. It should duplicate 
    the current state, then modify the currentCategory to whatever is passed in via the 
    action object. */
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      }

    /* If an action is called that we don't define above, then we simply return back the 
    current state. */
    default:
      return state;
  }
};

export default reducers;