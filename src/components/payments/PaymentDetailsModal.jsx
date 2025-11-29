import React from 'react';
import PaymentStatusBadge from './PaymentStatusBadge';
import { formatCurrency, formatDateTime, getPaymentMethodIcon } from '../../constants/paymentConstants';

const PaymentDetailsModal = ({ payment, onClose, onRefresh }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 sticky top-0 z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">Payment Details</h2>
              <p className="text-green-100">Transaction ID: {payment.transactionId || 'N/A'}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Section */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 mb-1">Payment Status</p>
              <PaymentStatusBadge status={payment.paymentStatus} />
            </div>
            <div className="border-l border-gray-300 pl-4">
              <p className="text-sm text-gray-600 mb-1">Payment Method</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getPaymentMethodIcon(payment.paymentMethod)}</span>
                <span className="font-semibold">{payment.paymentMethod || 'Unknown'}</span>
              </div>
            </div>
            <div className="border-l border-gray-300 pl-4">
              <p className="text-sm text-gray-600 mb-1">Booking Status</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                {payment.bookingStatus}
              </span>
            </div>
          </div>

          {/* Transaction Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              💳 Transaction Information
            </h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="font-mono text-sm font-semibold">{payment.transactionId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Razorpay Order ID</p>
                <p className="font-mono text-sm font-semibold">{payment.razorpayOrderId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Razorpay Payment ID</p>
                <p className="font-mono text-sm font-semibold">{payment.razorpayPaymentId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Date</p>
                <p className="font-semibold">{formatDateTime(payment.paidAt || payment.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              👤 Customer Information
            </h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold">{payment.customerDetails.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold">{payment.customerDetails.phone}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{payment.customerDetails.email}</p>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              📋 Booking Information
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div>
                <p className="text-sm text-gray-600">Booking Number</p>
                <p className="font-semibold text-lg">{payment.bookingNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Activity</p>
                <p className="font-semibold">{payment.activitySnapshot?.title || payment.activity?.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Venue</p>
                  <p className="font-semibold">{payment.activitySnapshot?.venue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Participants</p>
                  <p className="font-semibold">{payment.numberOfParticipants} persons</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              💰 Payment Breakdown
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Price per Person</span>
                <span className="font-semibold">{formatCurrency(payment.pricePerPerson)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Number of Participants</span>
                <span className="font-semibold">{payment.numberOfParticipants}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatCurrency(payment.totalAmount)}</span>
              </div>
              {payment.discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-semibold">- {formatCurrency(payment.discountAmount)}</span>
                </div>
              )}
              <div className="border-t border-gray-300 pt-3 flex justify-between text-lg">
                <span className="font-bold">Total Paid</span>
                <span className="font-bold text-green-600">{formatCurrency(payment.finalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              ⏱️ Timeline
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Booking Created</p>
                  <p className="font-semibold text-sm">{formatDateTime(payment.createdAt)}</p>
                </div>
              </div>
              {payment.paidAt && (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Payment Completed</p>
                    <p className="font-semibold text-sm">{formatDateTime(payment.paidAt)}</p>
                  </div>
                </div>
              )}
              {payment.confirmationDate && (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Booking Confirmed</p>
                    <p className="font-semibold text-sm">{formatDateTime(payment.confirmationDate)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Close
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <span>🖨️</span>
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsModal;