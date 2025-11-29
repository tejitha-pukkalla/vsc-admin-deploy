import api from './api';

// ========================================
// PUBLIC - Submit Contact Form
// ========================================
export const submitContactForm = async (formData) => {
  try {
    const response = await api.post('/contact/submit', formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error submitting contact form' };
  }
};

// ========================================
// ADMIN - Get All Contacts with Filters
// ========================================
export const getAllContacts = async (filters = {}) => {
  try {
    const params = {
      page: filters.page || 1,
      limit: filters.limit || 20,
      status: filters.status || '',
      search: filters.search || '',
      sortBy: filters.sortBy || 'createdAt',
      sortOrder: filters.sortOrder || 'desc'
    };

    // Remove empty params
    Object.keys(params).forEach(key => {
      if (!params[key] && params[key] !== 0) delete params[key];
    });

    const response = await api.get('/contact', { params });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching contacts' };
  }
};

// ========================================
// ADMIN - Get Single Contact by ID
// ========================================
export const getContactById = async (id) => {
  try {
    const response = await api.get(`/contact/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching contact details' };
  }
};

// ========================================
// ADMIN - Get Contact Statistics
// ========================================
export const getContactStats = async () => {
  try {
    const response = await api.get('/contact/stats');
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching statistics' };
  }
};

// ========================================
// ADMIN - Update Contact Status & Notes
// ========================================
export const updateContact = async (id, updateData) => {
  try {
    const response = await api.put(`/contact/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating contact' };
  }
};

// ========================================
// ADMIN - Delete Contact
// ========================================
export const deleteContact = async (id) => {
  try {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error deleting contact' };
  }
};

// ========================================
// ADMIN - Bulk Update Status
// ========================================
export const bulkUpdateStatus = async (contactIds, status) => {
  try {
    const response = await api.patch('/contact/bulk/status', {
      contactIds,
      status
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating contacts' };
  }
};

// ========================================
// EXPORT TO CSV
// ========================================
export const exportContactsToCSV = (contacts) => {
  try {
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Subject',
      'Message',
      'Status',
      'Submitted On',
      'Admin Notes'
    ];

    const rows = contacts.map(contact => [
      contact.name,
      contact.email,
      contact.phone,
      contact.subject,
      contact.message.replace(/"/g, '""'), // Escape quotes
      contact.status,
      new Date(contact.createdAt).toLocaleString('en-IN'),
      (contact.adminNotes || 'N/A').replace(/"/g, '""')
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
    link.setAttribute('download', `contacts_export_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return { success: true, message: 'CSV downloaded successfully' };
  } catch (error) {
    throw { message: 'Error exporting to CSV' };
  }
};