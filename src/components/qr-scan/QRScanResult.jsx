import React from 'react';
import { formatDateTime } from '../../constants/bookingConstants';

const QRScanResult = ({ result, onReset }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-4">
          <span className="text-5xl">✓</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Check-in Successful!</h2>
        <p className="text-green-100">Welcome to the venue</p>
      </div>

      {/* Booking Details */}
      <div className="p-6 space-y-6">
        {/* Booking Number */}
        <div className="text-center pb-4 border-b border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Booking Number</p>
          <p className="text-2xl font-bold text-gray-900">{result.bookingNumber}</p>
        </div>

        {/* Customer Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>👤</span> Customer Information
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-semibold text-gray-900">{result.customerName}</span>
            </div>
          </div>
        </div>

        {/* Activity Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>🎯</span> Activity Details
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Activity:</span>
              <span className="font-semibold text-gray-900">{result.activity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Participants:</span>
              <span className="font-semibold text-gray-900">{result.participants}</span>
            </div>
          </div>
        </div>

        {/* Check-in Time */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>⏰</span> Check-in Time
          </h3>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-center text-xl font-bold text-green-800">
              {formatDateTime(result.checkInTime)}
            </p>
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-center font-medium">
            ✓ Customer has been successfully checked in. Please proceed to the activity area.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onReset}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          Scan Next QR Code
        </button>
      </div>
    </div>
  );
};

export default QRScanResult;