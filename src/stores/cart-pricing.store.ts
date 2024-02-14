import { createReduxModule } from "hooks-for-redux";

export const [useCartPricing, { inc, dec }] = createReduxModule("cart-pricing", { total: 0, subTotal: 0, shipping: 0 }, {
  inc: (state, amount: number) => {
    state.subTotal += amount
    state.total = state.subTotal + state.shipping
    state.shipping = 11.27

    return { ...state }
  },
  dec: (state, amount: number) => {
    state.subTotal -= amount

    if (state.subTotal === 0) {
      state.shipping = 0
    }

    state.total = state.subTotal + state.shipping    

    return { ...state }
  }
});
