const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Products API
export const productsAPI = {
  // Get all products
  getAll: async (category = null) => {
    const url = category 
      ? `${API_BASE_URL}/products?category=${category}`
      : `${API_BASE_URL}/products`;
    const response = await fetch(url);
    return handleResponse(response);
  },

  // Get single product
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return handleResponse(response);
  },

  // Create product (admin only)
  create: async (productData) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData)
    });
    return handleResponse(response);
  },

  // Update product (admin only)
  update: async (id, productData) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData)
    });
    return handleResponse(response);
  },

  // Delete product (admin only)
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Users API
export const usersAPI = {
  // Register new user
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  // Login user
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return handleResponse(response);
  },

  // Get user profile
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  }
};

// Cart API
export const cartAPI = {
  // Get cart items
  getItems: async () => {
    const response = await fetch(`${API_BASE_URL}/cart`);
    return handleResponse(response);
  },

  // Add item to cart
  addItem: async (productId, quantity = 1) => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    });
    return handleResponse(response);
  },

  // Remove item from cart
  removeItem: async (productId) => {
    const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
      method: 'DELETE'
    });
    return handleResponse(response);
  }
};

// Orders API
export const ordersAPI = {
  // Get all orders
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/orders`);
    return handleResponse(response);
  },

  // Place new order
  create: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return handleResponse(response);
  },

  // Update order status
  update: async (id, orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return handleResponse(response);
  }
};

// Health check
export const healthCheck = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  return handleResponse(response);
}; 