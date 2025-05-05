import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import colors from '../theme/colors';
import typography from '../theme/typography';

export default function HomeAppScreen() {
  const { user, loadingUser, refreshUser } = useAuth();
  const hasFetched = useRef(false); // 👈 flag persistente

  useEffect(() => {
    if (!hasFetched.current) {
      refreshUser();
      hasFetched.current = true;
    }
  }, []);

  if (loadingUser) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.brand.primary.main} />
        <Text style={styles.loadingText}>Carregando dados do usuário...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro ao carregar os dados do usuário.</Text>
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
  },
});