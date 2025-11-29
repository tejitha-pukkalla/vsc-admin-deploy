import React, { useState } from 'react';
import PaymentStatusBadge from './PaymentStatusBadge';
import PaymentDetailsModal from './PaymentDetailsModal';
import { formatCurrency, formatDateTime, getPaymentMethodIcon } from '../../constants/paymentConstants';

const PaymentsList = ({ payments, loading, onRefresh }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setShowDetails(true);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-6 border-b border-gray-200">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!payments || payments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="text-6xl mb-4">💳</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Payments Found</h3>
        <p className="text-gray-500">Try adjusting your filters or date range</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Payment Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 font-mono text-sm">
                      {payment.transactionId || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">
                      Booking: {payment.bookingNumber}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {payment.customerDetails.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {payment.customerDetails.email}
                    </div>
                    <div className="text-xs text-gray-400">
                      {payment.customerDetails.phone}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {payment.activitySnapshot?.title || payment.activity?.title || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {payment.numberOfParticipants} participant{payment.numberOfParticipants > 1 ? 's' : ''}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDateTime(payment.paidAt || payment.createdAt)}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {getPaymentMethodIcon(payment.paymentMethod)}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {payment.paymentMethod || 'Unknown'}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-gray-900">
                      {formatCurrency(payment.finalAmount)}
                    </div>
                    {payment.discountAmount > 0 && (
                      <div className="text-xs text-green-600">
                        Discount: {formatCurrency(payment.discountAmount)}
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <PaymentStatusBadge status={payment.paymentStatus} />
                  </td>

                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleViewDetails(payment)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && selectedPayment && (
        <PaymentDetailsModal
          payment={selectedPayment}
          onClose={() => {
            setShowDetails(false);
            setSelectedPayment(null);
          }}
          onRefresh={onRefresh}
        />
      )}
    </>
  );
};

export default PaymentsList;