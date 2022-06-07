import { FETCH_ORDER } from './actions';

export const initialState = {
  loadingReceipt: false,
  loadingReceiptError: null,
  order: null,
};

const receiptPage = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER.BEGIN:
      return {
        ...state,
        loadingReceiptError: null,
        loadingReceipt: true,
      };
    case FETCH_ORDER.SUCCESS:
      return {
        ...state,
        order: action.payload.order,
        loadingReceipt: false,
      };
    case FETCH_ORDER.RESET:
      return {
        ...state,
        loadingReceiptError: null,
        loadingReceipt: false,
      };
    default:
      return state;
  }
};

export default receiptPage;
