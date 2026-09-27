import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/auth'; // Replace with your backend URL

// Configure axios defaults for cookies
axios.defaults.withCredentials = true;

// Function to handle common API errors
const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('API Error - Response Data:', error.response.data);
    console.error('API Error - Response Status:', error.response.status);
    console.error('API Error - Response Headers:', error.response.headers);
    throw new Error(error.response.data?.message || `Server error: ${error.response.status}`);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('API Error - No Response:', error.request);
    throw new Error('No response received from the server. Please check your network connection.');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('API Error - Request Setup:', error.message);
    throw new Error('An unexpected error occurred.');
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    
    // Store user name and phone for future use
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userPhone', userData.phone);
    
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const verifyOtp = async (otpData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify`, otpData);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const login = async (credentials) => {
  try {
    // Spring Security expects form-urlencoded data by default
    const formData = new URLSearchParams();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);
    
    console.log("Sending login request with form data:", credentials.email);
    
    const response = await axios.post(`${API_BASE_URL}/login`, formData, {
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    });
    
    console.log("Login response:", response);
    
    // Store email for fallback mechanism
    localStorage.setItem('userEmail', credentials.email);
    
    // Try to extract user name from the login response if available
    if (response.data && response.data.name) {
      localStorage.setItem('userName', response.data.name);
    }
    
    // Spring Security typically returns 200 on success
    return response.data;
  } catch (error) {
    console.error("Login error details:", error);
    
    // If the backend responded with a 401 (Unauthorized), it's bad credentials
    if (error.response && error.response.status === 401) {
      throw new Error("Invalid credentials or account not verified.");
    }
    
    // For any other error, use the general error handler
    handleError(error);
  }
};

export const checkAuthStatus = async () => {
  try {
    console.log("Checking auth status...");
    const response = await axios.get(`${API_BASE_URL}/status`, {
      withCredentials: true
    });
    console.log("Auth status response:", response);
    return response.data === true || response.status === 200;
  } catch (error) {
    console.error("Authentication status check failed:", error);
    return false;
  }
};

export const getUserProfile = async () => {
  try {
    console.log("Fetching user profile...");
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      withCredentials: true
    });
    console.log("Profile response:", response);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    
    // For demo purposes - if backend doesn't have a profile endpoint yet,
    // return mock data based on stored JWT payload
    // This is a fallback for frontend testing until backend is updated
    try {
      // Extract user info from localStorage
      const storedEmail = localStorage.getItem('userEmail');
      const storedName = localStorage.getItem('userName') || storedEmail?.split('@')[0] || 'User';
      const storedPhone = localStorage.getItem('userPhone') || '+91 98765 43210';
      
      if (storedEmail) {
        return {
          email: storedEmail,
          name: storedName,
          phone: storedPhone,
          joinDate: new Date().toISOString().split('T')[0]
        };
      }
    } catch (fallbackError) {
      console.error("Profile fallback also failed:", fallbackError);
    }
    
    throw new Error("Could not retrieve user profile");
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_BASE_URL}/logout`, {}, {
      withCredentials: true
    });
    localStorage.removeItem('userEmail'); // Clear any stored user data
    return true;
  } catch (error) {
    handleError(error);
  }
};

export const requestPasswordReset = async (email) => {
  try {
    // Ensure email is sent in a request body
    const response = await axios.post(`${API_BASE_URL}/forgot-password-request`, { email });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const confirmPasswordReset = async (email, otp, newPassword) => {
  try {
    console.log("Sending password reset request:", { email, otp, newPassword: '***' });
    
    const resetData = {
      email: email,
      otp: otp,
      newPassword: newPassword
    };
    
    const response = await axios.post(`${API_BASE_URL}/reset-password`, resetData);
    console.log("Password reset response:", response);
    return response;
  } catch (error) {
    console.error("Password reset error:", error);
    handleError(error);
  }
};