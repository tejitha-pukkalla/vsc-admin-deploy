import React, { useState, useEffect } from 'react';
import { getTodayCheckIns } from '../../services/qrService';
import { formatDateTime } from '../../constants/bookingConstants';
import toast from 'react-hot-toast';

const ScanHistory = () => {
  const [checkIns, setCheckIns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCheckIns();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchCheckIns, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchCheckIns = async () => {
    try {
      const data = await getTodayCheckIns();
      setCheckIns(data);
    } catch (error) {
      console.error('Error fetching check-ins:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Today's Check-ins</h3>
          <p className="text-sm text-gray-600 mt-1">
            {checkIns.length} customer{checkIns.length !== 1 ? 's' : ''} checked in
          </p>
        </div>
        <button
          onClick={fetchCheckIns}
          className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium text-sm"
        >
          🔄 Refresh
        </button>
      </div>

      {checkIns.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <span className="text-5xl mb-3 block">📋</span>
          <p className="font-semibold">No check-ins yet today</p>
          <p className="text-sm mt-1">Scanned bookings will appear here</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {checkIns.map((checkIn) => (
            <div
              key={checkIn._id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                      ✓ Checked In
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDateTime(checkIn.checkInTime)}
                    </span>
                  </div>
                  
                  <div className="font-semibold text-gray-900 mb-1">
                    {checkIn.bookingNumber}
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Customer:</span>{' '}
                      {checkIn.customerDetails.name}
                    </p>
                    <p>
                      <span className="font-medium">Activity:</span>{' '}
                      {checkIn.activitySnapshot?.title || checkIn.activity?.title}
                    </p>
                    <p>
                      <span className="font-medium">Participants:</span>{' '}
                      {checkIn.numberOfParticipants}
                    </p>
                  </div>
                </div>

                <div className="ml-4 text-right">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScanHistory;