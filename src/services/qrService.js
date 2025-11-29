import api from './api';

// ========================================
// SCAN QR CODE AND CHECK-IN
// ========================================
export const scanQR = async (qrData) => {
  try {
    const response = await api.post('/qr/scan', { qrData });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error scanning QR code' };
  }
};

// ========================================
// VALIDATE QR CODE (WITHOUT CHECK-IN)
// ========================================
export const validateQR = async (qrData) => {
  try {
    const response = await api.post('/qr/validate', { qrData });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error validating QR code' };
  }
};

// ========================================
// RESEND QR CODE TO CUSTOMER
// ========================================
export const resendQR = async (bookingNumber, email, phone) => {
  try {
    const response = await api.post('/qr/resend', {
      bookingNumber,
      email,
      phone
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error resending QR code' };
  }
};

// ========================================
// GET TODAY'S CHECK-INS
// ========================================
export const getTodayCheckIns = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const response = await api.get('/bookings', {
      params: {
        bookingStatus: 'Confirmed,Completed',
        fromDate: today.toISOString(),
        toDate: tomorrow.toISOString(),
        limit: 100,
        sortBy: 'checkInTime',
        sortOrder: 'desc'
      }
    });
    
    return response.data.data.bookings.filter(b => b.checkedIn);
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching check-ins' };
  }
};

// ========================================
// GET CHECK-IN STATISTICS
// ========================================
export const getCheckInStats = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get today's bookings
    const response = await api.get('/bookings', {
      params: {
        bookingDate: today.toISOString().split('T')[0],
        limit: 1000
      }
    });

    const bookings = response.data.data.bookings;

    // Calculate stats
    const stats = {
      totalExpected: bookings.filter(b => 
        b.bookingStatus === 'Confirmed' || b.bookingStatus === 'Completed'
      ).length,
      checkedIn: bookings.filter(b => b.checkedIn).length,
      pending: bookings.filter(b => 
        b.bookingStatus === 'Confirmed' && !b.checkedIn
      ).length,
      totalParticipants: bookings
        .filter(b => b.checkedIn)
        .reduce((sum, b) => sum + b.numberOfParticipants, 0)
    };

    return stats;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching statistics' };
  }
};

// ========================================
// MANUAL CHECK-IN (WITHOUT QR)
// ========================================
export const manualCheckIn = async (bookingId) => {
  try {
    const response = await api.post(`/bookings/${bookingId}/checkin`, {});
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error performing check-in' };
  }
};

// ========================================
// SEARCH BOOKING BY NUMBER OR PHONE
// ========================================
export const searchBooking = async (query) => {
  try {
    const response = await api.get('/bookings', {
      params: {
        search: query,
        limit: 10
      }
    });
    return response.data.data.bookings;
  } catch (error) {
    throw error.response?.data || { message: 'Error searching booking' };
  }
};