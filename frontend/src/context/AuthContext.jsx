import { createContext, useReducer, useEffect, useContext } from 'react';
import API from '../api/axios';

const AuthContext = createContext({});

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    case 'LOADING':
      return { ...state, loading: action.payload };
    case 'ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { token, user: null }
      });
    }

    dispatch({ type: 'LOADING', payload: false });
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: 'LOADING' });
      const response = await API.post('/api/auth/login', { email, password });
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
      return { success: true };
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response?.data?.message || 'Login failed' });
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete API.defaults.headers.common['Authorization'];
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
