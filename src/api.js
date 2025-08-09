const API_BASE_URL = 'http://localhost:8000';

class ApiService {
  getToken() {
    return localStorage.getItem('access_token');
  }

  setToken(token) {
    localStorage.setItem('access_token', token);
  }

  removeToken() {
    localStorage.removeItem('access_token');
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async login(username, password) {
    const response = await this.request('/api/token/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    this.setToken(response.access);
    return response;
  }

  async register(username, email, password) {
    return this.request('/api/register/', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  }

  async getDashboardData() {
    return this.request('/api/dashboard/');
  }

  async getUserProfile() {
    return this.request('/api/profile/');
  }

  logout() {
    this.removeToken();
  }
}

export default new ApiService();