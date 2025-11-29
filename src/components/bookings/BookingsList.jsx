import React, { useState } from 'react';
import BookingStatusBadge from './BookingStatusBadge';
import BookingDetailsModal from './BookingDetailsModal';
import { formatCurrency, formatDate, formatTime } from '../../constants/bookingConstants';

const BookingsList = ({ bookings, loading, onRefresh }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
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

  if (!bookings || bookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bookings Found</h3>
        <p className="text-gray-500">Try adjusting your filters or search criteria</p>
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
                  Booking #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {booking.bookingNumber}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(booking.createdAt)}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {booking.customerDetails.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.customerDetails.phone}
                    </div>
                    <div className="text-xs text-gray-400">
                      {booking.customerDetails.email}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {booking.activitySnapshot?.title || booking.activity?.title || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.activitySnapshot?.venue || booking.activity?.venue || 'N/A'}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {formatDate(booking.bookingDate)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatTime(booking.selectedTimeSlot.startTime)} - {formatTime(booking.selectedTimeSlot.endTime)}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-semibold">
                      {booking.numberOfParticipants}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">
                      {formatCurrency(booking.finalAmount)}
                    </div>
                    {booking.discountAmount > 0 && (
                      <div className="text-xs text-green-600">
                        Saved {formatCurrency(booking.discountAmount)}
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <BookingStatusBadge status={booking.bookingStatus} />
                    {booking.checkedIn && (
                      <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        ✓ Checked In
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <BookingStatusBadge status={booking.paymentStatus} />
                  </td>

                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleViewDetails(booking)}
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
      {showDetails && selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => {
            setShowDetails(false);
            setSelectedBooking(null);
          }}
          onRefresh={onRefresh}
        />
      )}
    </>
  );
};

export default BookingsList;