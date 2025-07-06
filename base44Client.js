import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "686207e7397cad7a43b22b37", 
  requiresAuth: true // Ensure authentication is required for all operations
});
