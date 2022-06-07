import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  'ecommerce.receipt.heading': {
    id: 'ecommerce.receipt.heading',
    defaultMessage: 'Thank you for your order!',
    description: 'Page heading for receipt.',
  },
  'ecommerce.receipt.confirm.message': {
    id: 'ecommerce.receipt.confirm.message',
    defaultMessage: 'Your order is complete. If you need a receipt, you can print this page.You will also receive a confirmation message with this information at ',
    description: 'Receipt order confirmation message',
  },
  'ecommerce.receipt.table.column.quantity': {
    id: 'ecommerce.receipt.table.column.quantity',
    defaultMessage: 'Quantity',
    description: 'Column quantity title for order info table',
  },
  'ecommerce.receipt.table.column.description': {
    id: 'ecommerce.receipt.table.column.description',
    defaultMessage: 'Description',
    description: 'Column description title for order info table',
  },
  'ecommerce.receipt.table.column.price': {
    id: 'ecommerce.receipt.table.column.price',
    defaultMessage: 'Item Price',
    description: 'Column item price title for order info table',
  },
  'ecommerce.receipt.loading.error': {
    id: 'ecommerce.receipt.loading.error',
    defaultMessage: 'Error: {error}',
    description: 'Message when the order fails to load',
  },
  'ecommerce.receipt.loading.order': {
    id: 'ecommerce.receipt.loading.order',
    defaultMessage: 'Loading order...',
    description: 'Message when order is being loaded',
  },
  'ecommerce.receipt.link.dashboard': {
    id: 'ecommerce.receipt.link.dashboard',
    defaultMessage: 'Go to dashboard',
    description: 'Link to learner dashboard',
  },
  'ecommerce.receipt.link.find.courses': {
    id: 'ecommerce.receipt.link.find.courses',
    defaultMessage: 'Find more courses',
    description: 'Link to search for courses',
  },
});

export default messages;
