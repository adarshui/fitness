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

  // Simple auth check based on presence of an access token
  isAuthenticated() {
    return !!this.getToken();
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(options.headers || {}),
      },
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

  // Correct endpoint for fetching user profile
  async getUserProfile() {
    return this.request('/api/get_user_profile/');
  }

  async trackWorkout(exerciseTime) {
    return this.request('/api/track-workout/', {
      method: 'POST',
      body: JSON.stringify({ exercise_time: exerciseTime }),
    });
  }

  // Save user profile
  async saveUserProfile(profileData) {
    return this.request('/api/save_user_profile/', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }

  logout() {
    this.removeToken();
  }
}

export default new ApiService();
