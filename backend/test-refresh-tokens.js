// Test script for refresh token implementation
const axios = require("axios");

const API_BASE = "http://localhost:3000/api";

// Test data
const testUser = {
  name: "Test User",
  email: "test@example.com",
  password: "password123",
};

async function testRefreshTokenFlow() {
  try {
    console.log("=== Testing Refresh Token Implementation ===\n");

    // 1. Test Signup
    console.log("1. Testing Signup...");
    const signupResponse = await axios.post(`${API_BASE}/auth/signup`, testUser);
    console.log("✅ Signup successful");
    console.log("Response structure:", Object.keys(signupResponse.data));
    console.log("Has accessToken:", !!signupResponse.data.accessToken);
    console.log("Has refreshToken:", !!signupResponse.data.refreshToken);
    console.log("Has user:", !!signupResponse.data.user);

    const { accessToken, refreshToken } = signupResponse.data;
    console.log("\n");

    // 2. Test Protected Route with Access Token
    console.log("2. Testing protected route with access token...");
    const profileResponse = await axios.get(`${API_BASE}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("✅ Protected route access successful");
    console.log("User profile retrieved:", !!profileResponse.data);
    console.log("\n");

    // 3. Test Refresh Token Endpoint
    console.log("3. Testing refresh token endpoint...");
    const refreshResponse = await axios.post(`${API_BASE}/auth/refresh-token`, {
      refreshToken: refreshToken,
    });
    console.log("✅ Token refresh successful");
    console.log("New tokens received:", Object.keys(refreshResponse.data));
    console.log("Has new accessToken:", !!refreshResponse.data.accessToken);
    console.log("Has new refreshToken:", !!refreshResponse.data.refreshToken);

    const newAccessToken = refreshResponse.data.accessToken;
    console.log("\n");

    // 4. Test Protected Route with New Access Token
    console.log("4. Testing protected route with new access token...");
    const newProfileResponse = await axios.get(`${API_BASE}/users/me`, {
      headers: {
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
    console.log("✅ Protected route with new token successful");
    console.log("\n");

    // 5. Test Invalid Refresh Token
    console.log("5. Testing invalid refresh token...");
    try {
      await axios.post(`${API_BASE}/auth/refresh-token`, {
        refreshToken: "invalid_token",
      });
      console.log("❌ Should have failed with invalid token");
    } catch (error) {
      console.log("✅ Invalid refresh token properly rejected");
      console.log("Error message:", error.response?.data?.message);
    }
    console.log("\n");

    // 6. Test Logout
    console.log("6. Testing logout...");
    const logoutResponse = await axios.post(
      `${API_BASE}/auth/logout`,
      {
        refreshToken: refreshResponse.data.refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      }
    );
    console.log("✅ Logout successful");
    console.log("Logout message:", logoutResponse.data.message);
    console.log("\n");

    // 7. Test Using Refresh Token After Logout
    console.log("7. Testing refresh token after logout...");
    try {
      await axios.post(`${API_BASE}/auth/refresh-token`, {
        refreshToken: refreshResponse.data.refreshToken,
      });
      console.log("❌ Should have failed - token should be revoked");
    } catch (error) {
      console.log("✅ Refresh token properly revoked after logout");
      console.log("Error message:", error.response?.data?.message);
    }

    console.log("\n=== All Tests Completed Successfully! ===");
  } catch (error) {
    console.error("❌ Test failed:", error.response?.data || error.message);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testRefreshTokenFlow();
}

module.exports = { testRefreshTokenFlow };
