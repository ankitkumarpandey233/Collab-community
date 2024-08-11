// src/utils/db/api.js

// Fetch all users
export const fetchAllUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch all users');
      }
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  

// Fetch followers of a specific user
export const fetchFollowers = async (userId) => {
  const response = await fetch(`/api/users/${userId}/followers`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Fetch following users of a specific user
export const fetchFollowing = async (userId) => {
  const response = await fetch(`/api/users/${userId}/following`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
