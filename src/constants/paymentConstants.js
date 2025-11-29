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
// PAYMENT METHODS
// ========================================
export const PAYMENT_METHODS = {
  UPI: 'UPI',
  CARD: 'Card',
  NET_BANKING: 'NetBanking',
  WALLET: 'Wallet',
  UNKNOWN: 'Unknown'
};

// ========================================
// PAYMENT METHOD ICONS
// ========================================
export const PAYMENT_METHOD_ICONS = {
  [PAYMENT_METHODS.UPI]: '📱',
  [PAYMENT_METHODS.CARD]: '💳',
  [PAYMENT_METHODS.NET_BANKING]: '🏦',
  [PAYMENT_METHODS.WALLET]: '👛',
  [PAYMENT_METHODS.UNKNOWN]: '❓'
};

// ========================================
// STATUS COLORS
// ========================================
export const PAYMENT_STATUS_COLORS = {
  [PAYMENT_STATUS.PENDING]: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-300',
    dot: 'bg-orange-500'
  },
  [PAYMENT_STATUS.COMPLETED]: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
    dot: 'bg-green-500'
  },
  [PAYMENT_STATUS.FAILED]: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300',
    dot: 'bg-red-500'
  },
  [PAYMENT_STATUS.REFUNDED]: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-300',
    dot: 'bg-purple-500'
  }
};

// ========================================
// FILTER OPTIONS
// ========================================
export const PAYMENT_STATUS_OPTIONS = [
  { value: '', label: 'All Payments' },
  { value: PAYMENT_STATUS.COMPLETED, label: 'Completed' },
  { value: PAYMENT_STATUS.PENDING, label: 'Pending' },
  { value: PAYMENT_STATUS.FAILED, label: 'Failed' },
  { value: PAYMENT_STATUS.REFUNDED, label: 'Refunded' }
];

export const PAYMENT_METHOD_OPTIONS = [
  { value: '', label: 'All Methods' },
  { value: PAYMENT_METHODS.UPI, label: 'UPI' },
  { value: PAYMENT_METHODS.CARD, label: 'Card' },
  { value: PAYMENT_METHODS.NET_BANKING, label: 'Net Banking' },
  { value: PAYMENT_METHODS.WALLET, label: 'Wallet' }
];

export const SORT_OPTIONS = [
  { value: 'paidAt', label: 'Payment Date (Newest)' },
  { value: 'finalAmount', label: 'Amount (High to Low)' },
  { value: 'bookingNumber', label: 'Booking Number' },
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

// Get status color classes
export const getPaymentStatusColor = (status) => {
  return PAYMENT_STATUS_COLORS[status] || {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-300',
    dot: 'bg-gray-500'
  };
};

// Get payment method icon
export const getPaymentMethodIcon = (method) => {
  return PAYMENT_METHOD_ICONS[method] || PAYMENT_METHOD_ICONS.UNKNOWN;
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(1);
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

// Check if payment can be refunded
export const canRefund = (payment) => {
  return (
    payment.paymentStatus === PAYMENT_STATUS.COMPLETED &&
    payment.bookingStatus !== 'Cancelled'
  );
};