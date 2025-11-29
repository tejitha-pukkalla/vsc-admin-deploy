import React, { useState } from 'react';
import BookingStatusBadge from './BookingStatusBadge';
import CancelBookingModal from './CancelBookingModal';
import { formatCurrency, formatDate, formatDateTime, formatTime, canCancelBooking, canCheckIn } from '../../constants/bookingConstants';
import { checkInBooking } from '../../services/bookingService';
import toast from 'react-hot-toast';

const BookingDetailsModal = ({ booking, onClose, onRefresh }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    if (!window.confirm('Check-in this booking manually?')) return;

    setLoading(true);
    try {
      await checkInBooking(booking._id);
      toast.success('Check-in successful!');
      onRefresh();
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to check-in');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSuccess = () => {
    setShowCancelModal(false);
    onRefresh();
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 sticky top-0 z-10">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2">Booking Details</h2>
                <p className="text-blue-100">Booking #{booking.bookingNumber}</p>
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
                <p className="text-sm text-gray-600 mb-1">Booking Status</p>
                <BookingStatusBadge status={booking.bookingStatus} />
              </div>
              <div className="border-l border-gray-300 pl-4">
                <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                <BookingStatusBadge status={booking.paymentStatus} />
              </div>
              {booking.checkedIn && (
                <div className="border-l border-gray-300 pl-4">
                  <p className="text-sm text-gray-600 mb-1">Check-in</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    ✓ Checked In
                  </span>
                </div>
              )}
            </div>

            {/* Customer Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                👤 Customer Information
              </h3>
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold">{booking.customerDetails.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold">{booking.customerDetails.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{booking.customerDetails.email}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-semibold">{booking.customerDetails.address}</p>
                </div>
              </div>
            </div>

            {/* Activity Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                🎯 Activity Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Activity Name</p>
                  <p className="font-semibold text-lg">{booking.activitySnapshot?.title || booking.activity?.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Venue</p>
                    <p className="font-semibold">{booking.activitySnapshot?.venue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">City</p>
                    <p className="font-semibold">{booking.activitySnapshot?.city}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-semibold">{booking.activitySnapshot?.address}</p>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                📅 Booking Information
              </h3>
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Event Date</p>
                  <p className="font-semibold">{formatDate(booking.bookingDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time Slot</p>
                  <p className="font-semibold">
                    {formatTime(booking.selectedTimeSlot.startTime)} - {formatTime(booking.selectedTimeSlot.endTime)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Participants</p>
                  <p className="font-semibold text-lg">{booking.numberOfParticipants} persons</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Booked On</p>
                  <p className="font-semibold">{formatDateTime(booking.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                💳 Payment Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per Person</span>
                  <span className="font-semibold">{formatCurrency(booking.pricePerPerson)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-semibold">{formatCurrency(booking.totalAmount)}</span>
                </div>
                {booking.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">- {formatCurrency(booking.discountAmount)}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-2 flex justify-between text-lg">
                  <span className="font-semibold">Final Amount</span>
                  <span className="font-bold text-blue-600">{formatCurrency(booking.finalAmount)}</span>
                </div>
                {booking.transactionId && (
                  <div className="border-t border-gray-300 pt-2">
                    <p className="text-sm text-gray-600">Transaction ID</p>
                    <p className="font-mono text-sm">{booking.transactionId}</p>
                  </div>
                )}
                {booking.paidAt && (
                  <div>
                    <p className="text-sm text-gray-600">Paid On</p>
                    <p className="font-semibold">{formatDateTime(booking.paidAt)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Check-in Details */}
            {booking.checkedIn && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  ✅ Check-in Information
                </h3>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-600">Checked In At</p>
                  <p className="font-semibold">{formatDateTime(booking.checkInTime)}</p>
                </div>
              </div>
            )}

            {/* Cancellation Details */}
            {booking.bookingStatus === 'Cancelled' && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  ❌ Cancellation Information
                </h3>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200 space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Cancelled On</p>
                    <p className="font-semibold">{formatDateTime(booking.cancelledAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Reason</p>
                    <p className="font-semibold">{booking.cancellationReason || 'No reason provided'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              {canCheckIn(booking) && (
                <button
                  onClick={handleCheckIn}
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
                >
                  {loading ? 'Processing...' : '✓ Check In'}
                </button>
              )}
              
              {canCancelBooking(booking) && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Cancel Booking
                </button>
              )}
              
              <button
                onClick={onClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <CancelBookingModal
          booking={booking}
          onClose={() => setShowCancelModal(false)}
          onSuccess={handleCancelSuccess}
        />
      )}
    </>
  );
};

export default BookingDetailsModal;