import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuth() {
      const token = await AsyncStorage.getItem('@token');
      if (token) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    }

    loadAuth();
  }, []);

  async function login() {
    setIsAuthenticated(true);
    // Aqui opcionalmente podemos salvar o token se quiser reforçar
  }

  async function logout() {
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('@token');
    await AsyncStorage.removeItem('@user');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
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