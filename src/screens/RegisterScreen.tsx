import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/types';
import colors from '../theme/colors';
import typography from '../theme/typography';
import TextField from '../components/TextField';
import PrimaryButton from '../components/PrimaryButton';
import Icon from 'react-native-vector-icons/Feather';
import ForsetIcon from '../../assets/images/icons/forset-icon.svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(email) ? '' : 'Erro: E-mail inválido');
  };

  const validateCPF = () => {
    const cleanCpf = cpf.replace(/\D/g, '');
    setCpfError(cleanCpf.length === 11 ? '' : 'Erro: CPF inválido');
  };

  const validatePasswordMatch = () => {
    setConfirmPasswordError(
      confirmPassword === password ? '' : 'Erro: As senhas não são iguais'
    );
  };

  const handleRegister = async () => {
    if (loading) return;

    validateEmail();
    validateCPF();
    validatePasswordMatch();

    if (!name || !email || !cpf || !password || !confirmPassword) {
      Alert.alert('Preenchimento obrigatório', 'Preencha todos os campos.');
      return;
    }

    if (emailError || cpfError || confirmPasswordError) return;

    try {
      setLoading(true);
      const response = await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/api:W6SexkSR/auth/signup',
        { name, email, password, cpf }
      );

      const { token, code, id } = response.data;

      if (token && code && id) {
        await AsyncStorage.setItem('@token', token);
        await AsyncStorage.setItem('@user_id', String(id)); // 👈 ESSENCIAL
        navigation.navigate('Verify', { email, code: String(code) });
      } else {
        Alert.alert('Erro', 'Não foi possível concluir o cadastro. Tente novamente.');
      }
    } catch (err) {
      console.error('❌ Erro no cadastro:', err);
      Alert.alert('Erro', 'Falha ao criar conta. Verifique os dados ou tente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.header}>
          <ForsetIcon width={32} height={32} />
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="x" size={24} color={colors.feedback.error.main} />
          </Pressable>
        </View>

        <Text style={styles.title}>Crie sua conta!</Text>
        <Text style={styles.subtitle}>
          Entre para o mundo do Beach Tennis com o Forset. Seu próximo jogo começa aqui, rápido,
          leve e do seu jeito!
        </Text>

        <TextField
          label="Nome completo"
          placeholder="Digite seu nome"
          required
          value={name}
          onChangeText={setName}
        />
        <TextField
          label="E-mail"
          placeholder="Digite seu e-mail"
          required
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
          onBlur={validateEmail}
          error={emailError}
        />
        <TextField
          label="CPF"
          placeholder="Digite o seu CPF"
          required
          keyboardType="numeric"
          value={cpf}
          onChangeText={(text) => {
            const clean = text.replace(/\D/g, '').slice(0, 11);
            const masked = clean
              .replace(/(\d{3})(\d)/, '$1.$2')
              .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
              .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/, '$1.$2.$3-$4');
            setCpf(masked);
            setCpfError('');
          }}
          onBlur={validateCPF}
          error={cpfError}
        />
        <TextField
          label="Senha"
          placeholder="**********"
          secureTextEntry
          required
          value={password}
          onChangeText={setPassword}
        />
        <TextField
          label="Confirme sua senha"
          placeholder="**********"
          secureTextEntry
          required
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setConfirmPasswordError('');
          }}
          onBlur={validatePasswordMatch}
          error={confirmPasswordError}
        />

        <View style={styles.footer}>
          <PrimaryButton
            title="Criar minha conta"
            onPress={handleRegister}
            loading={loading}
            disabled={
              !name ||
              !email ||
              !cpf ||
              !password ||
              !confirmPassword ||
              !!emailError ||
              !!cpfError ||
              !!confirmPasswordError
            }
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background.elevate,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 60,
  },
  title: {
    ...typography.title.h4Bold,
    color: colors.text.title,
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body.p14Regular,
    color: colors.text.caption,
    marginBottom: 24,
  },
  footer: {
    marginTop: 24,
  },
});