import {createAuthProvider} from 'react-token-auth';

export const [useAuth, authFetch, login, logout] =
    createAuthProvider({
        accessTokenKey: 'access_token',
        onUpdateToken: (token) => fetch(process.env.REACT_APP_AUTH_URL + '/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: token.access_token
        })
        .then(r => r.json())
        .catch((error)=>{
            window.localStorage.removeItem('REACT_TOKEN_AUTH_KEY');
        })
    });