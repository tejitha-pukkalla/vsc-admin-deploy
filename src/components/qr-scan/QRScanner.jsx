import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { scanQR } from '../../services/qrService';
import QRScanResult from './QRScanResult';
import toast from 'react-hot-toast';

const QRScanner = ({ onScanSuccess, onScanError }) => {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let scanner = null;

    const initScanner = () => {
      scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          disableFlip: false,
        },
        false
      );

      scanner.render(onScanSuccess, onScanFailure);
      setScanning(true);
    };

    const onScanSuccess = async (decodedText, decodedResult) => {
      console.log('QR Code scanned:', decodedText);
      
      // Stop scanner
      scanner.clear();
      setScanning(false);

      // Show loading toast
      const loadingToast = toast.loading('Verifying QR code...');

      try {
        // Call API to scan QR
        const response = await scanQR(decodedText);
        
        toast.dismiss(loadingToast);
        toast.success('✅ Check-in successful!');
        
        setScanResult(response.data);
        if (onScanSuccess) onScanSuccess(response.data);
      } catch (err) {
        toast.dismiss(loadingToast);
        toast.error(err.message || 'Invalid QR code');
        
        setError(err.message || 'Invalid QR code');
        if (onScanError) onScanError(err);
        
        // Restart scanner after 3 seconds
        setTimeout(() => {
          setError(null);
          initScanner();
        }, 3000);
      }
    };

    const onScanFailure = (error) => {
      // Silent - don't show errors for failed scans
      // Only show if it's a critical error
      if (error && !error.includes('NotFoundException')) {
        console.warn('QR Scan error:', error);
      }
    };

    initScanner();

    return () => {
      if (scanner) {
        scanner.clear().catch(console.error);
      }
    };
  }, []);

  const handleReset = () => {
    setScanResult(null);
    setError(null);
    window.location.reload(); // Restart scanner
  };

  if (scanResult) {
    return <QRScanResult result={scanResult} onReset={handleReset} />;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <span className="text-3xl">📱</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Scan QR Code
        </h3>
        <p className="text-gray-600">
          Position the QR code within the frame to scan
        </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800">
            <span className="text-xl">❌</span>
            <span className="font-semibold">{error}</span>
          </div>
        </div>
      )}

      <div className="relative">
        <div id="qr-reader" className="w-full"></div>
        
        {scanning && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm font-medium">Scanning...</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">Instructions:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Hold the QR code steady within the frame</li>
          <li>• Ensure good lighting conditions</li>
          <li>• The scanner will automatically detect the code</li>
          <li>• Check-in will be completed instantly</li>
        </ul>
      </div>
    </div>
  );
};

export default QRScanner;