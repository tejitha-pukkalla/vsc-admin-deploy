import React from 'react';
import { formatCurrency } from '../../constants/bookingConstants';

const BookingStats = ({ stats, loading }) => {
  const statsCards = [
    {
      title: 'Total Bookings',
      value: stats?.totalBookings || 0,
      icon: '📋',
      color: 'bg-blue-500',
      trend: null
    },
    {
      title: 'Confirmed',
      value: stats?.confirmedBookings || 0,
      icon: '✅',
      color: 'bg-green-500',
      trend: null
    },
    {
      title: 'Pending',
      value: stats?.pendingBookings || 0,
      icon: '⏳',
      color: 'bg-yellow-500',
      trend: null
    },
    {
      title: 'Cancelled',
      value: stats?.cancelledBookings || 0,
      icon: '❌',
      color: 'bg-red-500',
      trend: null
    },
    {
      title: "Today's Bookings",
      value: stats?.todayBookings || 0,
      icon: '📅',
      color: 'bg-purple-500',
      trend: null
    },
    {
      title: 'Upcoming Events',
      value: stats?.upcomingBookings || 0,
      icon: '🎯',
      color: 'bg-indigo-500',
      trend: null
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: '💰',
      color: 'bg-emerald-500',
      trend: null
    },
    {
      title: 'Completed Payments',
      value: stats?.completedPayments || 0,
      icon: '💳',
      color: 'bg-teal-500',
      trend: null
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.color} text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl`}>
              {stat.icon}
            </div>
            {stat.trend && (
              <span className={`text-sm font-semibold ${stat.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend > 0 ? '↑' : '↓'} {Math.abs(stat.trend)}%
              </span>
            )}
          </div>
          
          <h3 className="text-gray-600 text-sm font-medium mb-2">
            {stat.title}
          </h3>
          
          <p className="text-3xl font-bold text-gray-900">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BookingStats;