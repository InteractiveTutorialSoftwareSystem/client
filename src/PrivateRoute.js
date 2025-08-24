import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { authFetch } from "./auth";

function PrivateRoute({ component: Component, roles, ...props }) {
  const [authState, setAuthState] = useState({
    role: "",
    serverResponse: false,
    logged: false,
    id: "",
    loading: true,
    error: null
  });

  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounts
    let retryCount = 0;
    const maxRetries = 2;
    
    const validateAuth = async (attempt = 1) => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        if (!token) {
          if (isMounted) {
            setAuthState(prev => ({ 
              ...prev, 
              serverResponse: true, 
              logged: false, 
              loading: false 
            }));
          }
          return;
        }

        // Add timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        // Validate token with server
        const response = await authFetch(process.env.REACT_APP_AUTH_URL + '/auth/protected', {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (isMounted) {
          if (data.role && data.id) {
            setAuthState(prev => ({
              ...prev,
              role: data.role,
              serverResponse: true,
              logged: true,
              id: data.id,
              loading: false,
              error: null
            }));
          } else {
            // Invalid response, clear token
            localStorage.removeItem('REACT_TOKEN_AUTH_KEY');
            setAuthState(prev => ({ 
              ...prev, 
              serverResponse: true, 
              logged: false, 
              loading: false 
            }));
          }
        }
      } catch (error) {
        if (isMounted) {
          // Only retry on network errors, not auth errors
          if (error.name === 'AbortError' || error.message.includes('Failed to fetch')) {
            retryCount++;
            if (retryCount <= maxRetries && attempt <= maxRetries) {
              // Wait before retry with exponential backoff
              setTimeout(() => {
                if (isMounted) {
                  validateAuth(attempt + 1);
                }
              }, Math.pow(2, attempt) * 1000);
              return;
            }
          }
          
          // Clear invalid token after max retries or on auth errors
          localStorage.removeItem('REACT_TOKEN_AUTH_KEY');
          setAuthState(prev => ({ 
            ...prev, 
            serverResponse: true, 
            logged: false, 
            loading: false,
            error: 'Unable to connect to authentication server'
          }));
        }
      }
    };

    validateAuth();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  // Loading state
  if (authState.loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // Not authenticated
  if (!authState.logged) {
    return <Navigate to='/login' replace />
  }

  // Role check - redirect to tutorial if user doesn't have required role
  if (roles && roles.indexOf(authState.role) === -1) {
    return (
      <Navigate
        to='/tutorial'
        state={{ 
          role: authState.role,
          userId: String(authState.id)
        }}
        replace
      />
    )
  }

  // Render the protected component
  return <Component userId={String(authState.id)} role={authState.role} {...props} />
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  roles: PropTypes.array
};

export default PrivateRoute;