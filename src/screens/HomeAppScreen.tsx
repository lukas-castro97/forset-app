import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import typography from '../theme/typography';
import colors from '../theme/colors';

export default function HomeAppScreen() {
  const { logout } = useAuth();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await AsyncStorage.getItem('@user');
        if (userData) {
          const user = JSON.parse(userData);
          setUserName(user.name || '');
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
    }

    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {userName}!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Sair" onPress={logout} color={colors.brand.primary.main} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    ...typography.title.h4SemiBold,
    color: colors.text.title,
    marginBottom: 24,
  },
  buttonContainer: {
    width: '60%',
  },
});