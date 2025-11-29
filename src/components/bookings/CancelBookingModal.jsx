import React, { useState } from 'react';
import { cancelBooking } from '../../services/bookingService';
import toast from 'react-hot-toast';

const CancelBookingModal = ({ booking, onClose, onSuccess }) => {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!reason.trim()) {
      toast.error('Please provide a cancellation reason');
      return;
    }

    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    setLoading(true);
    try {
      await cancelBooking(booking._id, reason);
      toast.success('Booking cancelled successfully');
      onSuccess();
    } catch (error) {
      toast.error(error.message || 'Failed to cancel booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-red-600 text-white p-6 rounded-t-lg">
          <h2 className="text-xl font-bold">Cancel Booking</h2>
          <p className="text-red-100 text-sm mt-1">Booking #{booking.bookingNumber}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              <strong>⚠️ Warning:</strong> This action cannot be undone. The customer will be notified about the cancellation.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cancellation Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide a reason for cancellation..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Booking Summary */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-gray-700 mb-2">Booking Summary</h4>
            <div className="text-sm space-y-1">
              <p><span className="text-gray-600">Customer:</span> <span className="font-medium">{booking.customerDetails.name}</span></p>
              <p><span className="text-gray-600">Activity:</span> <span className="font-medium">{booking.activitySnapshot?.title}</span></p>
              <p><span className="text-gray-600">Amount:</span> <span className="font-medium">₹{booking.finalAmount}</span></p>
              <p><span className="text-gray-600">Payment:</span> <span className="font-medium">{booking.paymentStatus}</span></p>
            </div>
          </div>

          {booking.paymentStatus === 'Completed' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This booking has been paid. You may need to process a refund separately.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Keep Booking
          </button>
          <button
            onClick={handleCancel}
            disabled={loading || !reason.trim()}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? 'Cancelling...' : 'Cancel Booking'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;