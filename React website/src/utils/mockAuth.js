/**
 * Mock Authentication Service
 * For development/testing without PHP backend
 * 
 * REMOVE THIS IN PRODUCTION!
 */

const MOCK_USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'Admin@2025',
    email: 'admin@susingroup.com',
    full_name: 'System Administrator',
    role: 'admin'
  },
  {
    id: 2,
    username: 'hr_manager',
    password: 'HR@2025',
    email: 'hr@susingroup.com',
    full_name: 'HR Manager',
    role: 'hr'
  },
  {
    id: 3,
    username: 'demo',
    password: 'demo123',
    email: 'demo@susingroup.com',
    full_name: 'Demo User',
    role: 'employee'
  }
];

/**
 * Simulate API delay
 */
const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock login function
 */
export const mockLogin = async (username, password) => {
  await delay();
  
  const user = MOCK_USERS.find(
    u => (u.username === username || u.email === username) && u.password === password
  );
  
  if (!user) {
    throw new Error('Invalid username or password');
  }
  
  // Store in sessionStorage
  const { password: _, ...userWithoutPassword } = user;
  sessionStorage.setItem('mockUser', JSON.stringify(userWithoutPassword));
  sessionStorage.setItem('mockLoggedIn', 'true');
  
  return {
    success: true,
    message: 'Login successful',
    user: userWithoutPassword,
    redirect: user.role === 'admin' || user.role === 'hr' 
      ? '/admin-dashboard' 
      : '/dashboard'
  };
};

/**
 * Mock logout function
 */
export const mockLogout = async () => {
  await delay(300);
  sessionStorage.removeItem('mockUser');
  sessionStorage.removeItem('mockLoggedIn');
  
  return {
    success: true,
    message: 'Logged out successfully'
  };
};

/**
 * Mock session check
 */
export const mockCheckSession = async () => {
  await delay(200);
  
  const loggedIn = sessionStorage.getItem('mockLoggedIn') === 'true';
  const userStr = sessionStorage.getItem('mockUser');
  
  if (!loggedIn || !userStr) {
    return {
      logged_in: false,
      user: null
    };
  }
  
  return {
    logged_in: true,
    user: JSON.parse(userStr)
  };
};

/**
 * Check if mock mode is enabled
 */
export const isMockMode = () => {
  // Enable mock mode if:
  // 1. Environment variable is set, OR
  // 2. localStorage flag is set, OR
  // 3. Running on localhost development
  return (
    import.meta.env.VITE_MOCK_AUTH === 'true' ||
    localStorage.getItem('useMockAuth') === 'true' ||
    window.location.hostname === 'localhost'
  );
};

/**
 * Toggle mock mode
 */
export const toggleMockMode = (enabled) => {
  localStorage.setItem('useMockAuth', enabled ? 'true' : 'false');
  window.location.reload();
};
