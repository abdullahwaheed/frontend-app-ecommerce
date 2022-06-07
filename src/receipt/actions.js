import { utils } from '../common';

const { AsyncActionType } = utils;

export const FETCH_ORDER = new AsyncActionType('RECEIPT', 'FETCH_ORDER');

// FETCH ORDER ACTIONS

export const fetchOrder = (pageToFetch) => ({
  type: FETCH_ORDER.BASE,
  payload: { pageToFetch },
});

export const fetchOrderBegin = () => ({
  type: FETCH_ORDER.BEGIN,
});

export const fetchOrderSuccess = result => ({
  type: FETCH_ORDER.SUCCESS,
  payload: result,
});

export const fetchOrderReset = () => ({
  type: FETCH_ORDER.RESET,
});
