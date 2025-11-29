import api from './api';

// ========================================
// GET ALL BOOKINGS WITH FILTERS
// ========================================
export const getAllBookings = async (filters = {}) => {
  try {
    const params = {
      page: filters.page || 1,
      limit: filters.limit || 20,
      bookingStatus: filters.bookingStatus || '',
      paymentStatus: filters.paymentStatus || '',
      activityId: filters.activityId || '',
      fromDate: filters.fromDate || '',
      toDate: filters.toDate || '',
      search: filters.search || '',
      sortBy: filters.sortBy || 'createdAt',
      sortOrder: filters.sortOrder || 'desc'
    };

    // Remove empty params
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key];
    });

    const response = await api.get('/bookings', { params });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching bookings' };
  }
};

// ========================================
// GET SINGLE BOOKING BY ID
// ========================================
export const getBookingById = async (id) => {
  try {
    const response = await api.get(`/bookings/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching booking details' };
  }
};

// ========================================
// GET BOOKING STATISTICS
// ========================================
export const getBookingStats = async (dateRange = {}) => {
  try {
    const params = {
      fromDate: dateRange.fromDate || '',
      toDate: dateRange.toDate || ''
    };

    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key];
    });

    const response = await api.get('/bookings/stats/overview', { params });
    return response.data.data.overview;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching statistics' };
  }
};

// ========================================
// CANCEL BOOKING
// ========================================
export const cancelBooking = async (id, reason) => {
  try {
    const response = await api.patch(`/bookings/${id}/cancel`, { reason });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error cancelling booking' };
  }
};

// ========================================
// CHECK-IN BOOKING (MANUAL)
// ========================================
export const checkInBooking = async (id, qrData = null) => {
  try {
    const response = await api.post(`/bookings/${id}/checkin`, { qrData });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error checking in booking' };
  }
};

// ========================================
// EXPORT BOOKINGS TO CSV
// ========================================
export const exportBookingsToCSV = (bookings) => {
  try {
    const headers = [
      'Booking Number',
      'Customer Name',
      'Phone',
      'Email',
      'Activity',
      'Date',
      'Time',
      'Participants',
      'Amount',
      'Status',
      'Payment Status',
      'Booked On'
    ];

    const rows = bookings.map(booking => [
      booking.bookingNumber,
      booking.customerDetails.name,
      booking.customerDetails.phone,
      booking.customerDetails.email,
      booking.activitySnapshot.title,
      new Date(booking.bookingDate).toLocaleDateString('en-IN'),
      `${booking.selectedTimeSlot.startTime} - ${booking.selectedTimeSlot.endTime}`,
      booking.numberOfParticipants,
      `₹${booking.finalAmount}`,
      booking.bookingStatus,
      booking.paymentStatus,
      new Date(booking.createdAt).toLocaleDateString('en-IN')
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `bookings_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return { success: true, message: 'CSV downloaded successfully' };
  } catch (error) {
    throw { message: 'Error exporting to CSV' };
  }
};

// ========================================
// SEARCH BOOKINGS BY QUERY
// ========================================
export const searchBookings = async (query) => {
  try {
    const response = await api.get('/bookings', {
      params: { search: query, limit: 10 }
    });
    return response.data.data.bookings;
  } catch (error) {
    throw error.response?.data || { message: 'Error searching bookings' };
  }
};