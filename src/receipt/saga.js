import { call, put, takeEvery } from 'redux-saga/effects';

// Actions
import {
  FETCH_ORDER,
  fetchOrderBegin,
  fetchOrderSuccess,
  fetchOrderReset,
} from './actions';

// Services
import * as OrderApiService from './service';

export function* handleFetchOrder(action) {
  const { orderToFetch } = action.payload;
  // JK TODO: try and finally block? Remove console.log
  console.log('receipt/saga.js handleFetchOrder(), orderToFetch:', orderToFetch);
  yield put(fetchOrderBegin());
  const result = yield call(OrderApiService.getOrder, orderToFetch);
  yield put(fetchOrderSuccess(result));
  yield put(fetchOrderReset());
}

export default function* receiptSaga() {
  yield takeEvery(FETCH_ORDER.BASE, handleFetchOrder);
}
