import { createReduxModule } from "hooks-for-redux";

export const [useCartList, { add, remove }] = createReduxModule("cart-list", [] as string[], {
  add: (state: string[], movie: string) => [...new Set([...state, movie])],
  remove: (state: string[], movieId: string) => state.filter((id) => id !== movieId),
});
