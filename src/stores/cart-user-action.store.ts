import { createReduxModule } from "hooks-for-redux";

export const [useCartUserAction, { goToHome, markAsWentToHome }] = createReduxModule("cart-user-action", { keepBuying: false }, {
  goToHome: (state) => {
    state.keepBuying = true

    return { ...state }
  },
  markAsWentToHome: (state) => {
    state.keepBuying = false

    return { ...state }
  }
});
