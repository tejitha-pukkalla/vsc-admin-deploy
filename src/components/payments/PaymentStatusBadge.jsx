import React from 'react';
import { getPaymentStatusColor } from '../../constants/paymentConstants';

const PaymentStatusBadge = ({ status }) => {
  const colors = getPaymentStatusColor(status);

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
        ${colors.bg} ${colors.text} ${colors.border} border gap-1
      `}
    >
      <span className={`w-2 h-2 rounded-full ${colors.dot}`}></span>
      {status}
    </span>
  );
};

export default PaymentStatusBadge;