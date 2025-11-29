// Get user from localStorage
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Set user and token
export const setAuth = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

// Clear auth data
export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Check user role
export const hasRole = (allowedRoles) => {
  const user = getUser();
  if (!user) return false;
  return allowedRoles.includes(user.role);
};

// Get role-based dashboard path
export const getDashboardPath = (role) => {
  const paths = {
    superadmin: '/admin/dashboard',
    manager: '/admin/manager-dashboard',
    accountant: '/admin/accountant-dashboard',
    security: '/admin/security-dashboard',
  };
  return paths[role] || '/admin/dashboard';
};