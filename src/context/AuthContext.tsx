import React, { createContext, useEffect, useState, useContext } from 'react';
import { getToken, saveToken, clearToken } from '../services/auth';
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:W6SexkSR';

interface UserData {
  id: number;
  name: string;
  category_current: string;
  category_suggested: string;
  category_edit: boolean;
}

interface AuthContextData {
  token: string | null;
  user: UserData | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  loadingUser: boolean;
  refreshUser: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [hasTriedInit, setHasTriedInit] = useState<boolean>(false);

  const isAuthenticated = !!token;
  const loading = loadingUser && !hasTriedInit;

  const fetchUserData = async (authToken: string) => {
    const userId = await AsyncStorage.getItem('@user_id');
    console.log('🔍 TOKEN:', authToken);
    console.log('🔍 USER ID:', userId);

    if (!authToken || !userId) return;

    try {
      setLoadingUser(true);
      const response = await axios.get(`${API_BASE_URL}/me?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log('✅ RESPOSTA /me:', response.data);
      setUser(response.data);
    } catch (error: any) {
      console.error('❌ ERRO ao buscar usuário:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      await logout();
    } finally {
      setLoadingUser(false);
    }
  };

  const refreshUser = () => {
    if (token) fetchUserData(token);
  };

  const login = async (receivedToken: string) => {
    await saveToken(receivedToken);
    setToken(receivedToken);
    await fetchUserData(receivedToken); // ✅ busca usuário logo após login
  };

  const logout = async () => {
    await clearToken();
    await AsyncStorage.removeItem('@user_id');
    setToken(null);
    setUser(null);
  };

  const initializeAuth = async () => {
    const storedToken = await getToken();
    if (storedToken) {
      setToken(storedToken);
      await fetchUserData(storedToken);
    }
    setHasTriedInit(true);
    setLoadingUser(false);
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        loadingUser,
        refreshUser,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);