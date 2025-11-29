import React, { useState, useEffect } from 'react';
import ScanStats from '../components/qr-scan/ScanStats';
import QRScanner from '../components/qr-scan/QRScanner';
import ManualCheckIn from '../components/qr-scan/ManualCheckIn';
import ScanHistory from '../components/qr-scan/ScanHistory';
import { getCheckInStats } from '../services/qrService';
import toast from 'react-hot-toast';

const QRScanPage = () => {
  const [activeTab, setActiveTab] = useState('scanner'); // 'scanner' | 'manual'
  const [stats, setStats] = useState({});
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    
    // Auto-refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const statsData = await getCheckInStats();
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleScanSuccess = (result) => {
    // Refresh stats after successful scan
    fetchStats();
  };

  const handleManualCheckInSuccess = (result) => {
    // Refresh stats after manual check-in
    fetchStats();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">QR Scanner & Check-in</h1>
              <p className="text-gray-600 mt-1">Scan QR codes and manage customer check-ins</p>
            </div>
            <button
              onClick={fetchStats}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
            >
              <span>🔄</span>
              Refresh
            </button>
          </div>
        </div>

        {/* Statistics */}
        <ScanStats stats={stats} loading={statsLoading} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Scanner/Manual */}
          <div className="lg:col-span-2">
            {/* Tab Switcher */}
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('scanner')}
                  className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                    activeTab === 'scanner'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">📱</span>
                  QR Scanner
                </button>
                <button
                  onClick={() => setActiveTab('manual')}
                  className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                    activeTab === 'manual'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">🔍</span>
                  Manual Check-in
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'scanner' ? (
              <QRScanner 
                onScanSuccess={handleScanSuccess}
                onScanError={(error) => console.error(error)}
              />
            ) : (
              <ManualCheckIn onSuccess={handleManualCheckInSuccess} />
            )}

            {/* Quick Tips */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Quick Tips:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use QR Scanner for quick check-ins with QR code</li>
                <li>• Use Manual Check-in when QR code is unavailable</li>
                <li>• Stats update automatically every 30 seconds</li>
                <li>• Check the history panel for recent check-ins</li>
              </ul>
            </div>
          </div>

          {/* Right Column - History */}
          <div className="lg:col-span-1">
            <ScanHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanPage;