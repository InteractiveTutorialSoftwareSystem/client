import {createAuthProvider} from 'react-token-auth';

export const [useAuth, authFetch, login, logout] =
    createAuthProvider({
        accessTokenKey: 'access_token',
        onUpdateToken: (token) => {
            // Add timeout and better error handling to prevent infinite loops
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            return fetch(process.env.REACT_APP_AUTH_URL + '/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: token.access_token,
                signal: controller.signal
            })
            .then(r => {
                clearTimeout(timeoutId);
                if (!r.ok) {
                    throw new Error(`HTTP error! status: ${r.status}`);
                }
                return r.json();
            })
            .catch((error) => {
                clearTimeout(timeoutId);
                // Clear token on any error to prevent infinite refresh attempts
                window.localStorage.removeItem('REACT_TOKEN_AUTH_KEY');
                console.warn('Token refresh failed:', error.message);
                return null; // Return null to indicate failure
            });
        }
    });