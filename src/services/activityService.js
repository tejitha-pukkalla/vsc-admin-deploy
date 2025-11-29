import api from './api';

// Activity Service - All API calls for activities
export const activityService = {
  
  // Get all activities with filters
  getAllActivities: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/activities${queryString ? `?${queryString}` : ''}`);
  },

  // Get single activity by ID
  getActivityById: (id) => {
    return api.get(`/activities/${id}`);
  },

  // Create new activity (with images)
  createActivity: (formData) => {
    return api.post('/activities', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Update activity (with images)
  updateActivity: (id, formData) => {
    return api.put(`/activities/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Delete activity (soft delete by default, ?hardDelete=true for permanent)
  deleteActivity: (id, hardDelete = false) => {
    return api.delete(`/activities/${id}${hardDelete ? '?hardDelete=true' : ''}`);
  },

  // Change activity status
  changeActivityStatus: (id, status) => {
    return api.patch(`/activities/${id}/status`, { status });
  },

  // Bulk update status
  bulkUpdateStatus: (activityIds, status) => {
    return api.patch('/activities/bulk/status', { activityIds, status });
  },

  // Get activity statistics
  getActivityStats: () => {
    return api.get('/activities/stats/overview');
  },

  // Get activities by category
  getActivitiesByCategory: (category, limit = 10) => {
    return api.get(`/activities/category/${category}?limit=${limit}`);
  },

  // Check availability
  checkAvailability: (id, date, timeSlot) => {
    return api.post(`/activities/${id}/check-availability`, { date, timeSlot });
  },
};

export default activityService;