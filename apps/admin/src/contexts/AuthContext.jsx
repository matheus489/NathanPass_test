import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('@NathanPass:token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('@NathanPass:token');
          setUser(null);
        } else {
          api.defaults.headers.common.Authorization = `Bearer ${token}`;
          setUser(decoded);
        }
      } catch (error) {
        localStorage.removeItem('@NathanPass:token');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;

      localStorage.setItem('@NathanPass:token', token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      const decoded = jwtDecode(token);
      setUser(decoded);
      navigate('/');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  };

  const signOut = () => {
    localStorage.removeItem('@NathanPass:token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 