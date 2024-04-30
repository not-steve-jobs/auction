import { ErrorsUtil } from '../utils';
const { ResourceNotFoundError } = ErrorsUtil;

export default class isValidToken {
  static async googleTokenVerification(token) {
    // Define the URL for the Google userinfo endpoint
    const userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';

    // Define the headers with the Authorization header containing the access token
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Make the GET request to fetch user information
    const response = await fetch(userInfoUrl, {
      method: 'GET',
      headers,
    });

    // Parse the JSON response to get user data
    const user = await response.json();

    return user; // Return the user object
  }

  static async facebookTokenVerification(token) {
    const userInfoUrl = `https://graph.facebook.com/v18.0/me?fields=name,email,picture&access_token=${token}`;

    try {
      const response = await fetch(userInfoUrl, { method: 'GET' });

      if (!response.ok) {
        throw new ResourceNotFoundError(`Failed to fetch user information: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      throw new ResourceNotFoundError(`Error during Facebook token verification: ${error.message}`);
    }
  }
}
