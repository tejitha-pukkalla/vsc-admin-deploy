import React, { useState } from 'react';
import { searchBooking, manualCheckIn } from '../../services/qrService';
import toast from 'react-hot-toast';

const ManualCheckIn = ({ onSuccess }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.error('Please enter a booking number or phone number');
      return;
    }

    setLoading(true);
    try {
      const results = await searchBooking(searchQuery);
      
      // Filter only today's confirmed bookings
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayBookings = results.filter(booking => {
        const bookingDate = new Date(booking.bookingDate);
        bookingDate.setHours(0, 0, 0, 0);
        return bookingDate.getTime() === today.getTime() &&
               booking.bookingStatus === 'Confirmed' &&
               !booking.checkedIn;
      });

      setSearchResults(todayBookings);
      
      if (todayBookings.length === 0) {
        toast.error('No matching bookings found for today');
      }
    } catch (error) {
      toast.error(error.message || 'Error searching booking');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (bookingId) => {
    if (!window.confirm('Confirm manual check-in for this booking?')) {
      return;
    }

    setChecking(true);
    try {
      const response = await manualCheckIn(bookingId);
      toast.success('✅ Check-in successful!');
      
      if (onSuccess) {
        onSuccess(response.data);
      }
      
      // Clear search
      setSearchQuery('');
      setSearchResults([]);
    } catch (error) {
      toast.error(error.message || 'Check-in failed');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
          <span className="text-3xl">🔍</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Manual Check-in
        </h3>
        <p className="text-gray-600">
          Search by booking number or customer phone number
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter booking number or phone..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Search Results:</h4>
          {searchResults.map((booking) => (
            <div
              key={booking._id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">
                    {booking.bookingNumber}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Customer:</span>{' '}
                      {booking.customerDetails.name}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{' '}
                      {booking.customerDetails.phone}
                    </p>
                    <p>
                      <span className="font-medium">Activity:</span>{' '}
                      {booking.activitySnapshot?.title || booking.activity?.title}
                    </p>
                    <p>
                      <span className="font-medium">Participants:</span>{' '}
                      {booking.numberOfParticipants}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span>{' '}
                      {booking.selectedTimeSlot.startTime} - {booking.selectedTimeSlot.endTime}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleCheckIn(booking._id)}
                  disabled={checking}
                  className="ml-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm disabled:opacity-50"
                >
                  {checking ? 'Processing...' : 'Check In'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {searchQuery && !loading && searchResults.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <span className="text-4xl mb-2 block">🔍</span>
          <p>No bookings found</p>
          <p className="text-sm mt-1">Try searching with booking number or phone</p>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">When to use:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Customer forgot QR code</li>
          <li>• QR code is damaged or unreadable</li>
          <li>• Technical issues with QR scanner</li>
          <li>• Customer shows alternative verification</li>
        </ul>
      </div>
    </div>
  );
};

export default ManualCheckIn;