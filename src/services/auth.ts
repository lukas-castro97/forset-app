import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:W6SexkSR/auth/login';

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(API_URL, { email, password });

    const { token, name, idAuth, cat } = response.data;

    if (token) {
      await AsyncStorage.setItem('@token', token);
    }
    
    const user = { name, idAuth, cat };
    await AsyncStorage.setItem('@user', JSON.stringify(user));

    return { success: true };
  } catch (error: any) {
    console.error('Erro no login:', error.response?.data?.message || error.message);
    return { success: false, message: error.response?.data?.message || 'Erro desconhecido' };
  }
}