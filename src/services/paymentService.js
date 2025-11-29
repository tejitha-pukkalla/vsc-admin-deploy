import api from './api';

// ========================================
// GET ALL PAYMENTS WITH FILTERS
// ========================================
export const getAllPayments = async (filters = {}) => {
  try {
    const params = {
      page: filters.page || 1,
      limit: filters.limit || 20,
      paymentStatus: filters.paymentStatus || '',
      fromDate: filters.fromDate || '',
      toDate: filters.toDate || '',
      search: filters.search || '',
      minAmount: filters.minAmount || '',
      maxAmount: filters.maxAmount || '',
      sortBy: filters.sortBy || 'paidAt',
      sortOrder: filters.sortOrder || 'desc'
    };

    // Remove empty params
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key];
    });

    const response = await api.get('/bookings', { 
      params: {
        ...params,
        paymentStatus: 'Completed' // Only show completed payments
      }
    });
    
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching payments' };
  }
};

// ========================================
// GET PAYMENT STATISTICS
// ========================================
export const getPaymentStats = async (dateRange = {}) => {
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
    throw error.response?.data || { message: 'Error fetching payment statistics' };
  }
};

// ========================================
// GET PAYMENT BY TRANSACTION ID
// ========================================
export const getPaymentByTransactionId = async (transactionId) => {
  try {
    const response = await api.get('/bookings', {
      params: { search: transactionId }
    });
    return response.data.data.bookings[0] || null;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching payment details' };
  }
};

// ========================================
// GET PAYMENT BY BOOKING ID
// ========================================
export const getPaymentByBookingId = async (bookingId) => {
  try {
    const response = await api.get(`/payments/status/${bookingId}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching payment status' };
  }
};

// ========================================
// EXPORT PAYMENTS TO CSV
// ========================================
export const exportPaymentsToCSV = (payments) => {
  try {
    const headers = [
      'Transaction ID',
      'Booking Number',
      'Customer Name',
      'Email',
      'Phone',
      'Activity',
      'Payment Date',
      'Payment Method',
      'Amount',
      'Status',
      'Participants'
    ];

    const rows = payments.map(payment => [
      payment.transactionId || 'N/A',
      payment.bookingNumber,
      payment.customerDetails.name,
      payment.customerDetails.email,
      payment.customerDetails.phone,
      payment.activitySnapshot?.title || payment.activity?.title,
      new Date(payment.paidAt).toLocaleString('en-IN'),
      payment.paymentMethod || 'Unknown',
      `₹${payment.finalAmount}`,
      payment.paymentStatus,
      payment.numberOfParticipants
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `payments_${Date.now()}.csv`);
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
// GET REVENUE BY DATE RANGE
// ========================================
export const getRevenueByDateRange = async (fromDate, toDate) => {
  try {
    const response = await api.get('/bookings/stats/overview', {
      params: { fromDate, toDate }
    });
    return response.data.data.overview;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching revenue data' };
  }
};

// ========================================
// GET PAYMENT METHODS BREAKDOWN
// ========================================
export const getPaymentMethodsBreakdown = async () => {
  try {
    const response = await api.get('/bookings', {
      params: { 
        paymentStatus: 'Completed',
        limit: 1000 
      }
    });
    
    const payments = response.data.data.bookings;
    
    // Group by payment method
    const breakdown = payments.reduce((acc, payment) => {
      const method = payment.paymentMethod || 'Unknown';
      if (!acc[method]) {
        acc[method] = { count: 0, amount: 0 };
      }
      acc[method].count += 1;
      acc[method].amount += payment.finalAmount;
      return acc;
    }, {});

    return breakdown;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching payment methods' };
  }
};