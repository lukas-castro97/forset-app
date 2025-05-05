import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import colors from '../theme/colors';
import typography from '../theme/typography';
import PrimaryButton from '../components/PrimaryButton';

export default function HomeAppScreen() {
  const { user, loadingUser, refreshUser, logout } = useAuth();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      refreshUser();
      hasFetched.current = true;
    }
  }, []);

  if (loadingUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando dados do usuário...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro ao carregar os dados do usuário.</Text>
        <View style={styles.buttonWrapper}>
          <PrimaryButton title="Tentar novamente" onPress={refreshUser} />
        </View>
        <View style={styles.buttonWrapper}>
          <PrimaryButton title="Sair da conta" onPress={logout} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo, {user.name}!</Text>
      <Text style={styles.categoryText}>Categoria atual: {user.category_current}</Text>
      <Text style={styles.categoryText}>Categoria sugerida: {user.category_suggested}</Text>
      <Text style={styles.categoryText}>
        Categoria editável: {user.category_edit ? 'Sim' : 'Não'}
      </Text>
      <View style={styles.buttonWrapper}>
        <PrimaryButton title="Sair da conta" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.elevate,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    ...typography.title.h4Bold,
    color: colors.text.title,
    marginBottom: 12,
  },
  categoryText: {
    ...typography.body.p14Regular,
    color: colors.text.body,
    marginBottom: 8,
  },
  loadingText: {
    ...typography.body.p14Regular,
    color: colors.text.caption,
    marginTop: 12,
  },
  errorText: {
    ...typography.body.p14Regular,
    color: colors.feedback.error.main,
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonWrapper: {
    marginTop: 12,
    width: '100%',
  },
});