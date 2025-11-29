import React, { useState, useEffect } from 'react';
import PaymentStats from '../components/payments/PaymentStats';
import PaymentFilters from '../components/payments/PaymentFilters';
import PaymentsList from '../components/payments/PaymentsList';
import Pagination from '../components/common/Pagination';
import { getAllPayments, getPaymentStats, exportPaymentsToCSV } from '../services/paymentService';
import toast from 'react-hot-toast';

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20
  });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    search: '',
    paymentStatus: 'Completed', // Default: show only completed
    paymentMethod: '',
    fromDate: '',
    toDate: '',
    minAmount: '',
    maxAmount: '',
    sortBy: 'paidAt',
    sortOrder: 'desc'
  });
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);

  // Fetch payments
  useEffect(() => {
    fetchPayments();
  }, [filters]);

  // Fetch stats only once on mount
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await getAllPayments(filters);
      setPayments(response.bookings);
      setPagination(response.pagination);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const statsData = await getPaymentStats();
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters({
      ...newFilters,
      page: 1,
      limit: filters.limit
    });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExport = async () => {
    try {
      if (payments.length === 0) {
        toast.error('No payments to export');
        return;
      }
      
      const allPayments = await getAllPayments({ ...filters, limit: 1000 });
      exportPaymentsToCSV(allPayments.bookings);
      toast.success('Payments exported successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to export payments');
    }
  };

  const handleRefresh = () => {
    fetchPayments();
    fetchStats();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
              <p className="text-gray-600 mt-1">View and track all payment transactions</p>
            </div>
            <button
              onClick={handleRefresh}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
            >
              <span>🔄</span>
              Refresh
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <PaymentStats stats={stats} loading={statsLoading} />

        {/* Filters */}
        <PaymentFilters onFilterChange={handleFilterChange} onExport={handleExport} />

        {/* Results Summary */}
        {!loading && payments.length > 0 && (
          <div className="mb-4 text-sm text-gray-600 flex items-center justify-between">
            <span>
              Showing <span className="font-semibold">{payments.length}</span> of{' '}
              <span className="font-semibold">{pagination.totalItems}</span> payments
            </span>
            <span className="font-semibold text-green-600">
              Total: {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 0
              }).format(payments.reduce((sum, p) => sum + p.finalAmount, 0))}
            </span>
          </div>
        )}

        {/* Payments List */}
        <PaymentsList payments={payments} loading={loading} onRefresh={handleRefresh} />

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsPage;