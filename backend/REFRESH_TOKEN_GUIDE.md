# Refresh Token Implementation Guide

This backend implements a  refresh token system for secure JWT authentication. Here's how it works:

## Overview

- **Access tokens**: Expire in 2 minutes (for testing purposes)
- **Refresh tokens**: Expire in 20 minutes

## API Endpoints

### 1. Signup/Login Response Format
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 2. Refresh Token Endpoint
**POST** `/api/auth/refresh-token`

**Request Body:**
```json
{
  "refreshToken": "your_refresh_token_here"
}
```

**Response:**
```json
{
  "accessToken": "new_access_token",
  "refreshToken": "new_refresh_token",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 3. Logout Endpoint
**POST** `/api/auth/logout`

**Headers:**
```
Authorization: Bearer your_access_token
```

**Request Body (optional):**
```json
{
  "refreshToken": "refresh_token_to_revoke"
}
```

## Frontend Implementation Example

### JavaScript/Fetch API Example

```javascript
class AuthService {
  constructor() {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  // Store tokens after login/signup
  setTokens(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  // Clear tokens on logout
  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  // Refresh access token
  async refreshAccessToken() {
    try {
      const response = await fetch('/api/auth/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: this.refreshToken
        })
      });

      if (response.ok) {
        const data = await response.json();
        this.setTokens(data.accessToken, data.refreshToken);
        return data.accessToken;
      } else {
        // Refresh token is invalid or expired, redirect to login
        this.clearTokens();
        window.location.href = '/login.html';
        return null;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearTokens();
      window.location.href = '/login.html';
      return null;
    }
  }

  // Make authenticated API calls
  async makeAuthenticatedRequest(url, options = {}) {
    const makeRequest = async (token) => {
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
    };

    // Try with current access token
    let response = await makeRequest(this.accessToken);

    // If token expired, try to refresh
    if (response.status === 401) {
      const responseData = await response.json();
      if (responseData.code === 'TOKEN_EXPIRED') {
        const newAccessToken = await this.refreshAccessToken();
        if (newAccessToken) {
          // Retry with new token
          response = await makeRequest(newAccessToken);
        }
      }
    }

    return response;
  }

  // Login
  async login(email, password) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        this.setTokens(data.accessToken, data.refreshToken);
        return data;
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  // Logout
  async logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: this.refreshToken
        })
      });
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      this.clearTokens();
      window.location.href = '/login.html';
    }
  }
}

// Usage example
const authService = new AuthService();

// Example: Get user profile
async function getUserProfile() {
  try {
    const response = await authService.makeAuthenticatedRequest('/api/users/me');
    if (response.ok) {
      const user = await response.json();
      console.log('User profile:', user);
    }
  } catch (error) {
    console.error('Failed to get user profile:', error);
  }
}
```

## Error Handling

The auth middleware now returns specific error codes to help with frontend error handling:

- `NO_TOKEN`: No authorization header or token provided
- `TOKEN_EXPIRED`: Access token has expired (trigger refresh)
- `INVALID_TOKEN`: Token is malformed or invalid
- `USER_NOT_FOUND`: User associated with token doesn't exist
- `AUTH_FAILED`: General authentication failure

## Security Best Practices

1. **Token Storage**: Store tokens securely (consider httpOnly cookies for production)
2. **HTTPS Only**: Always use HTTPS in production
3. **Token Rotation**: Refresh tokens are rotated on each use
4. **Automatic Cleanup**: Expired tokens should be cleaned up periodically
5. **Logout**: Always revoke refresh tokens on logout

## Testing the Implementation

1. **Login/Signup**: Verify both tokens are returned
2. **Access Protected Route**: Use access token to access protected endpoints
3. **Token Expiry**: Wait 2 minutes, verify access token expires
4. **Token Refresh**: Use refresh token to get new access token
5. **Logout**: Verify refresh token is revoked

## Environment Variables

Make sure these are set in your `.env` file:

```env
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=2m
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
REFRESH_TOKEN_EXPIRES_IN=20m
```

## Database Cleanup (Optional)

Consider adding a cleanup job to remove expired tokens:

```javascript
// Example cleanup function (can be run as a cron job)
const cleanupExpiredTokens = async () => {
  const now = new Date();
  await db.tokens.remove({
    expiresAt: { $lt: now }
  });
};
```

This implementation provides a robust, secure, and educational example of JWT refresh token handling for your students!
