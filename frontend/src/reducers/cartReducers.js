import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'


// checking if item sent in action.payload already exists in the cart, if it does - overwrite the whole item (basically overriding only qty)
export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const addedItem = action.payload
            const existingItem = state.cartItems.find(productInCart => productInCart._id === addedItem._id)

            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(productInCart => productInCart._id === addedItem._id ? addedItem : productInCart)
                }
            } else {
                return { ...state, cartItems: [...state.cartItems, addedItem] }
            }

        default:
            return state
    }
}
