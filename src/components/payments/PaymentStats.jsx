import React from 'react';
import { formatCurrency } from '../../constants/paymentConstants';

const PaymentStats = ({ stats, loading }) => {
  const statsCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: '💰',
      color: 'bg-emerald-500',
      description: 'All time earnings'
    },
    {
      title: 'Completed Payments',
      value: stats?.completedPayments || 0,
      icon: '✅',
      color: 'bg-green-500',
      description: 'Successful transactions'
    },
    {
      title: 'Pending Payments',
      value: stats?.pendingBookings || 0,
      icon: '⏳',
      color: 'bg-yellow-500',
      description: 'Awaiting payment'
    },
    {
      title: 'Failed Payments',
      value: 0, // We'll calculate this separately
      icon: '❌',
      color: 'bg-red-500',
      description: 'Failed transactions'
    },
    {
      title: "Today's Revenue",
      value: formatCurrency(0), // Can be calculated from bookings
      icon: '📅',
      color: 'bg-blue-500',
      description: 'Earnings today'
    },
    {
      title: 'Avg Transaction',
      value: formatCurrency(
        stats?.completedPayments > 0 
          ? stats.totalRevenue / stats.completedPayments 
          : 0
      ),
      icon: '📊',
      color: 'bg-purple-500',
      description: 'Average per booking'
    },
    {
      title: 'Refunds',
      value: 0, // Track refunded amount
      icon: '↩️',
      color: 'bg-orange-500',
      description: 'Refunded amount'
    },
    {
      title: 'Total Transactions',
      value: stats?.totalBookings || 0,
      icon: '💳',
      color: 'bg-indigo-500',
      description: 'All payment attempts'
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
          className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-transparent hover:border-current"
          style={{ borderLeftColor: index === 0 ? '#10b981' : 'transparent' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.color} text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg`}>
              {stat.icon}
            </div>
          </div>
          
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            {stat.title}
          </h3>
          
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {stat.value}
          </p>
          
          <p className="text-xs text-gray-500">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PaymentStats;