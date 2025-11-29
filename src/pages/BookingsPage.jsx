import React, { useState, useEffect } from 'react';
import BookingStats from '../components/bookings/BookingStats';
import BookingFilters from '../components/bookings/BookingFilters';
import BookingsList from '../components/bookings/BookingsList';
import Pagination from '../components/common/Pagination';
import { getAllBookings, getBookingStats, exportBookingsToCSV } from '../services/bookingService';
import toast from 'react-hot-toast';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
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
    bookingStatus: '',
    paymentStatus: '',
    fromDate: '',
    toDate: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);

  // Fetch bookings
  useEffect(() => {
    fetchBookings();
  }, [filters]);

  // Fetch stats only once on mount
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getAllBookings(filters);
      setBookings(response.bookings);
      setPagination(response.pagination);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const statsData = await getBookingStats();
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
      page: 1, // Reset to first page when filters change
      limit: filters.limit
    });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExport = async () => {
    try {
      if (bookings.length === 0) {
        toast.error('No bookings to export');
        return;
      }
      
      // Fetch all bookings without pagination for export
      const allBookings = await getAllBookings({ ...filters, limit: 1000 });
      exportBookingsToCSV(allBookings.bookings);
      toast.success('Bookings exported successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to export bookings');
    }
  };

  const handleRefresh = () => {
    fetchBookings();
    fetchStats();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
              <p className="text-gray-600 mt-1">View and manage all customer bookings</p>
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
        <BookingStats stats={stats} loading={statsLoading} />

        {/* Filters */}
        <BookingFilters onFilterChange={handleFilterChange} onExport={handleExport} />

        {/* Results Summary */}
        {!loading && bookings.length > 0 && (
          <div className="mb-4 text-sm text-gray-600">
            Showing <span className="font-semibold">{bookings.length}</span> of{' '}
            <span className="font-semibold">{pagination.totalItems}</span> bookings
          </div>
        )}

        {/* Bookings List */}
        <BookingsList bookings={bookings} loading={loading} onRefresh={handleRefresh} />

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

export default BookingsPage;