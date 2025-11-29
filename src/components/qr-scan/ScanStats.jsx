import React from 'react';

const ScanStats = ({ stats, loading }) => {
  const statsCards = [
    {
      title: 'Expected Today',
      value: stats?.totalExpected || 0,
      icon: '📅',
      color: 'bg-blue-500',
      description: 'Total bookings for today'
    },
    {
      title: 'Checked In',
      value: stats?.checkedIn || 0,
      icon: '✅',
      color: 'bg-green-500',
      description: 'Successfully checked in'
    },
    {
      title: 'Pending',
      value: stats?.pending || 0,
      icon: '⏳',
      color: 'bg-yellow-500',
      description: 'Yet to check in'
    },
    {
      title: 'Total Participants',
      value: stats?.totalParticipants || 0,
      icon: '👥',
      color: 'bg-purple-500',
      description: 'People checked in'
    }
  ];

  // Calculate completion percentage
  const completionRate = stats?.totalExpected > 0
    ? ((stats.checkedIn / stats.totalExpected) * 100).toFixed(1)
    : 0;

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6"
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

      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Today's Check-in Progress
          </span>
          <span className="text-sm font-bold text-blue-600">
            {completionRate}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{stats?.checkedIn || 0} checked in</span>
          <span>{stats?.pending || 0} pending</span>
        </div>
      </div>
    </>
  );
};

export default ScanStats;