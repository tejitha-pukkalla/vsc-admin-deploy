// ========================================
// BOOKING STATUS
// ========================================
export const BOOKING_STATUS = {
  INITIATED: 'Initiated',
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
  NO_SHOW: 'No-Show'
};

// ========================================
// PAYMENT STATUS
// ========================================
export const PAYMENT_STATUS = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  REFUNDED: 'Refunded'
};

// ========================================
// STATUS COLORS
// ========================================
export const STATUS_COLORS = {
  // Booking Status Colors
  [BOOKING_STATUS.INITIATED]: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-300'
  },
  [BOOKING_STATUS.CONFIRMED]: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300'
  },
  [BOOKING_STATUS.CANCELLED]: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300'
  },
  [BOOKING_STATUS.COMPLETED]: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-300'
  },
  [BOOKING_STATUS.NO_SHOW]: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-300'
  },

  // Payment Status Colors
  [PAYMENT_STATUS.PENDING]: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-300'
  },
  [PAYMENT_STATUS.COMPLETED]: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300'
  },
  [PAYMENT_STATUS.FAILED]: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300'
  },
  [PAYMENT_STATUS.REFUNDED]: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-300'
  }
};

// ========================================
// FILTER OPTIONS
// ========================================
export const BOOKING_STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: BOOKING_STATUS.INITIATED, label: 'Initiated' },
  { value: BOOKING_STATUS.CONFIRMED, label: 'Confirmed' },
  { value: BOOKING_STATUS.COMPLETED, label: 'Completed' },
  { value: BOOKING_STATUS.CANCELLED, label: 'Cancelled' },
  { value: BOOKING_STATUS.NO_SHOW, label: 'No Show' }
];

export const PAYMENT_STATUS_OPTIONS = [
  { value: '', label: 'All Payments' },
  { value: PAYMENT_STATUS.PENDING, label: 'Pending' },
  { value: PAYMENT_STATUS.COMPLETED, label: 'Completed' },
  { value: PAYMENT_STATUS.FAILED, label: 'Failed' },
  { value: PAYMENT_STATUS.REFUNDED, label: 'Refunded' }
];

export const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Booking Date (Newest)' },
  { value: 'bookingDate', label: 'Event Date' },
  { value: 'finalAmount', label: 'Amount' },
  { value: 'customerDetails.name', label: 'Customer Name' }
];

// ========================================
// HELPER FUNCTIONS
// ========================================

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

// Format date with time
export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// Format time
export const formatTime = (time) => {
  // Converts 24hr to 12hr format
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

// Get status color classes
export const getStatusColor = (status) => {
  return STATUS_COLORS[status] || {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-300'
  };
};

// Check if booking can be cancelled
export const canCancelBooking = (booking) => {
  return (
    booking.bookingStatus !== BOOKING_STATUS.CANCELLED &&
    booking.bookingStatus !== BOOKING_STATUS.COMPLETED &&
    booking.paymentStatus !== PAYMENT_STATUS.REFUNDED
  );
};

// Check if booking can be checked in
export const canCheckIn = (booking) => {
  return (
    booking.bookingStatus === BOOKING_STATUS.CONFIRMED &&
    booking.paymentStatus === PAYMENT_STATUS.COMPLETED &&
    !booking.checkedIn &&
    isToday(booking.bookingDate)
  );
};

// Check if date is today
export const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

// Get relative time (e.g., "2 hours ago")
export const getRelativeTime = (date) => {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 7) return formatDate(date);
  if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  if (diffHour > 0) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  if (diffMin > 0) return `${diffMin} min${diffMin > 1 ? 's' : ''} ago`;
  return 'Just now';
};