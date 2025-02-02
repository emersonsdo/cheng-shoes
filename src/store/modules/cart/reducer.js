import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, (draft) => {
        const { product } = action;

        draft.push(product);
        // const productIndex = draft.findIndex((p) => p.id === action.product.id);

        // if (productIndex >= 0) {
        //   draft[productIndex].amount += 1;
        // } else {
        //   draft.push({ ...action.product, amount: 1 });
        // }
      });
    //   return [...state, { ...action.product, amount: 1 }];
    case '@cart/REMOVE':
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    default:
      return state;

    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }
  }
}
