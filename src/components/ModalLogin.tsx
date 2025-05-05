import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../context/AuthContext';
import colors from '../theme/colors';
import typography from '../theme/typography';
import TextField from './TextField';
import PrimaryButton from './PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ModalLoginProps {
  visible: boolean;
  onClose: () => void;
}

export default function ModalLogin({ visible, onClose }: ModalLoginProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login: authLogin } = useAuth();

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Digite um e-mail válido');
    } else {
      setEmailError('');
    }
  };

  const handleLogin = async () => {
    if (!email || emailError || !password || loading) return;

    setLoading(true);
    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:W6SexkSR/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('🔐 Resposta login Xano:', data);

      const token = data?.authToken || data?.token;
      const userId = data?.id;

      if (response.ok && token && userId) {
        await AsyncStorage.setItem('@user_id', String(userId));
        await AsyncStorage.setItem('@token', token);
        await authLogin(token);
        onClose();

        // Limpa campos após sucesso
        setEmail('');
        setPassword('');
        setEmailError('');
      } else {
        setEmailError(`Erro: ${data?.message || 'Login inválido'}`);
      }
    } catch (error) {
      console.error('❌ Erro no login:', error);
      setEmailError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <Pressable style={styles.overlay} onPress={onClose}>
          <Pressable style={styles.container} onPress={() => {}}>
            <View style={styles.dragger} />

            <Text style={styles.title}>Boas-vindas de volta!</Text>
            <Text style={styles.subtitle}>
              Prepare sua raquete e bora pro play! Faça login para continuar melhorando no seu jogo.
            </Text>

            <View style={styles.fields}>
              <TextField
                label="E-mail"
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
                required
                value={email}
                onChangeText={(text) => setEmail(text)}
                onBlur={() => validateEmail(email)}
                error={!!emailError}
                caption={emailError}
                autoCapitalize="none"
              />
              <TextField
                label="Senha"
                placeholder="********"
                secureTextEntry={!passwordVisible}
                required
                value={password}
                onChangeText={setPassword}
                rightIcon={passwordVisible ? 'eye-off' : 'eye'}
                onPressRightIcon={() => setPasswordVisible((prev) => !prev)}
              />
            </View>

            <PrimaryButton
              title="Acessar minha conta"
              onPress={handleLogin}
              loading={loading}
              disabled={!email || !password || !!emailError}
            />

            <Pressable>
              <Text style={styles.link}>Esqueci minha senha</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.linkAlt}>Novo por aqui? / Vem criar sua conta</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  container: {
    backgroundColor: colors.background.elevate,
    padding: 24,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  dragger: {
    alignSelf: 'center',
    width: 48,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.neutral[500],
    marginBottom: 12,
  },
  title: {
    ...typography.title.h4Bold,
    color: colors.text.title,
    marginBottom: 4,
  },
  subtitle: {
    ...typography.body.p14Regular,
    color: colors.text.caption,
    marginBottom: 24,
  },
  fields: {
    gap: 4,
    marginBottom: 24,
  },
  link: {
    ...typography.body.p14SemiBold,
    color: colors.brand.primary.main,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  linkAlt: {
    ...typography.body.p14SemiBold,
    color: colors.brand.primary.main,
    textAlign: 'center',
    marginTop: 8,
  },
});