import React from 'react';
import { getStatusColor } from '../../constants/bookingConstants';

const BookingStatusBadge = ({ status, type = 'booking' }) => {
  const colors = getStatusColor(status);

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
        ${colors.bg} ${colors.text} ${colors.border} border
      `}
    >
      {status}
    </span>
  );
};

export default BookingStatusBadge;