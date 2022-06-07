import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

const { ECOMMERCE_BASE_URL } = getConfig();

const ECOMMERCE_API_BASE_URL = `${ECOMMERCE_BASE_URL}/api/v2`;

// JK TODO: remove hard coded orderNumber
// eslint-disable-next-line import/prefer-default-export
export async function getOrder(orderNumber = 'EDX-100002') {
  const httpClient = getAuthenticatedHttpClient();

  //   /api/v2/orders/<order-number>/
  const { data } = await httpClient.get(`${ECOMMERCE_API_BASE_URL}/orders/${orderNumber}`);

  return {
    order: data,
  };
}
