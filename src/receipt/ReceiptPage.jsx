import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getConfig,
} from '@edx/frontend-platform';
import {
  injectIntl,
  intlShape,
  FormattedNumber,
} from '@edx/frontend-platform/i18n';
import { DataTable, Hyperlink } from '@edx/paragon';

import messages from './ReceiptPage.messages';

// Actions
import { fetchOrder } from './actions';
import { pageSelector } from './selectors';
import { PageLoading } from '../common';

class ReceiptPage extends React.Component {
  componentDidMount() {
    // JK TODO: remove hard coded order number
    this.props.fetchOrder('EDX-100002');
    console.log('MOUNTED + FETCHED');
  }

  getFormatedOrderDate(date) {
    return new Date(date).toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  renderOrderInfoTable() {
    const lineData = this.props.order.lines.map(line => ({
      quantity: line.quantity,
      description: line.description,
    }));

    return (
      <DataTable
        itemCount={1}
        data={[
          {
            quantity: lineData[0].quantity,
            description: lineData[0].description,
            item_price: <FormattedNumber
              value={this.props.order.total_excl_tax}
              style="currency" // eslint-disable-line react/style-prop-object
              currency={this.props.order.currency}
            />,
          },
        ]}
        columns={[
          {
            Header: this.props.intl.formatMessage(messages['ecommerce.receipt.table.column.quantity']),
            accessor: 'quantity',
          },
          {
            Header: this.props.intl.formatMessage(messages['ecommerce.receipt.table.column.description']),
            accessor: 'description',
          },
          {
            Header: this.props.intl.formatMessage(messages['ecommerce.receipt.table.column.price']),
            accessor: 'item_price',
          },
        ]}
      >
        <DataTable.Table />
      </DataTable>
    );
  }

  renderError() {
    return (
      <div>
        {this.props.intl.formatMessage(messages['ecommerce.receipt.loading.error'], {
          error: this.props.loadingReceiptError,
        })}
      </div>
    );
  }

  renderLoading() {
    return (
      <PageLoading srMessage={this.props.intl.formatMessage(messages['ecommerce.receipt.loading.order'])} />
    );
  }

  render() {
    const {
      loadingReceipt,
      loadingReceiptError,
      order,
    } = this.props;
    const loaded = !loadingReceipt && !loadingReceiptError;

    const { LMS_BASE_URL } = getConfig();

    const DASHBOARD_URL = `${LMS_BASE_URL}/dashboard`;
    const FIND_COURSES_URL = `${LMS_BASE_URL}/courses`;

    return (
      <div
        id="receipt-container"
        className="page__receipt receipt container content-container"
        // data-currency={order.currency}
        // data-order-id={order.number}
        // data-total-amount={order.total_incl_tax}
        // data-product-ids={}
        // data-back-button="{{ disable_back_button | default:0 }}"
      >
        {loadingReceiptError ? this.renderError() : null}
        {/*  JK TODO empty - no orders is not a thing? */}
        {loaded && order ? (
          <div className="list-info">
            <h2 className="thank-you text-primary-500">{this.props.intl.formatMessage(messages['ecommerce.receipt.heading'])}</h2>
            <div className="info-item payment-info row">
              <div className="copy col-md-8">
                <div className="confirm-message">
                  {/* JK TO DO: if has_enrollment_code_product */}
                  {this.props.intl.formatMessage(messages['ecommerce.receipt.confirm.message'])}
                  <Hyperlink destination="mailto:{order.user.email}">{order.user.email}</Hyperlink>
                </div>
                {order.billing_address ? (
                  <address className="billing-address" data-hj-suppress>
                    {order.billing_address.first_name} {order.billing_address.last_name} <br />
                    {order.billing_address.line1} <br />
                    {order.billing_address.city} <br />
                    {order.billing_address.state} <br />
                    {order.billing_address.postcode} <br />
                    {order.billing_address.country} <br />
                  </address>
                ) : null}
              </div>
              <div className="order-summary col-md-4">
                <dl>
                  <dt>Order Number:</dt>
                  <dd>{order.number}</dd>
                  {/* if payment_method: payment_method */}
                  {order.number ? (
                    <><dt>Payment Method:</dt><dd>Visa...</dd></>
                  ) : null}
                  <dt>Order Date:</dt>
                  <dd>{this.getFormatedOrderDate(order.date_placed)}</dd>
                </dl>
              </div>
            </div>
            <h2 className="text-primary-500">Order Information</h2>
            <div className="info-table">
              {this.renderOrderInfoTable()}
              <div className="order-total border-gray-200 border-bottom">
                <span className="description">Subtotal</span>
                <div className="price">
                  <FormattedNumber
                    value={this.props.order.total_excl_tax}
                    style="currency" // eslint-disable-line react/style-prop-object
                    currency={this.props.order.currency}
                  />
                </div>
              </div>
              <div className="order-total">
                <span className="description">Total</span>
                <div className="price">
                  <FormattedNumber
                    value={this.props.order.total_excl_tax}
                    style="currency" // eslint-disable-line react/style-prop-object
                    currency={this.props.order.currency}
                  />
                </div>
              </div>
            </div>
            <div id="cta-nav-links" className="row">
              <div className="col-12 text-right">
                <Hyperlink className="dashboard-link" destination={DASHBOARD_URL}>{this.props.intl.formatMessage(messages['ecommerce.receipt.link.dashboard'])}</Hyperlink>
                <Hyperlink destination={FIND_COURSES_URL}> {this.props.intl.formatMessage(messages['ecommerce.receipt.link.find.courses'])}</Hyperlink>
              </div>
            </div>
          </div>
        ) : null}
        {loadingReceipt ? this.renderLoading() : null}
      </div>
    );
  }
}

ReceiptPage.propTypes = {
  intl: intlShape.isRequired,
  order: PropTypes.shape({
    billing_address: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      line1: PropTypes.string,
      line2: PropTypes.string,
      postcode: PropTypes.string,
      state: PropTypes.string,
    }),
    currency: PropTypes.string,
    date_placed: PropTypes.string,
    discount: PropTypes.string,
    enable_hoist_order_history: PropTypes.bool,
    lines: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string,
      linePriceExclTax: PropTypes.string,
      quantity: PropTypes.number,
      status: PropTypes.string,
      title: PropTypes.string,
      unitPriceExclTax: PropTypes.string,
    })),
    number: PropTypes.string,
    payment_processor: PropTypes.string,
    status: PropTypes.string,
    total_excl_tax: PropTypes.string,
    total_incl_tax: PropTypes.string,
    user: PropTypes.shape({
      email: PropTypes.string,
      username: PropTypes.string,
    }),
    vouchers: PropTypes.arrayOf(),
  }),
  loadingReceipt: PropTypes.bool,
  loadingReceiptError: PropTypes.string,
  fetchOrder: PropTypes.func.isRequired,
};

ReceiptPage.defaultProps = {
  order: null,
  loadingReceiptError: null,
  loadingReceipt: false,
};

export default connect(pageSelector, {
  fetchOrder,
})(injectIntl(ReceiptPage));

// export default injectIntl(ReceiptPage);
