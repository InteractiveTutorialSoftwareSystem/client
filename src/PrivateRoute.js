import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
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
    
    const validateAuth = async () => {
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

        // Validate token with server
        const response = await authFetch(process.env.REACT_APP_AUTH_URL + '/auth/protected');
        
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
        // Auth validation error handled silently in production
        
        if (isMounted) {
          // Clear invalid token
          localStorage.removeItem('REACT_TOKEN_AUTH_KEY');
          setAuthState(prev => ({ 
            ...prev, 
            serverResponse: true, 
            logged: false, 
            loading: false,
            error: error.message 
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
          userId: authState.id
        }}
        replace
      />
    )
  }

  // Render the protected component
  return <Component userId={authState.id} role={authState.role} {...props} />
}

export default PrivateRoute;