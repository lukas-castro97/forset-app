import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ForsetIcon from '../../assets/images/icons/forset-icon.svg';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../theme/colors';
import typography from '../theme/typography';
import PrimaryButton from '../components/PrimaryButton';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

export default function VerifyAccountScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Verify'>>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const expectedCode = route.params.code;

  const { login } = useAuth();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputs = useRef<(TextInput | null)[]>([]);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = (text: string, index: number) => {
    if (/\d/.test(text) || text === '') {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text !== '' && index < 5) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6 || fullCode !== String(expectedCode)) {
      setError('Erro: Código de verificação inválido');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('@token');
      if (!token) {
        setError('Token não encontrado. Tente novamente.');
        return;
      }

      await login(token);

      if (isMounted.current) {
        setTimeout(() => {
          navigation.navigate('HomeApp');
        }, 0);
      }
    } catch (err) {
      console.error('Erro no login:', err);
      setError('Erro ao autenticar. Verifique o código e tente novamente.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <ForsetIcon width={32} height={32} />
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="x" size={24} color={colors.feedback.error.main} />
        </Pressable>
      </View>

      <Text style={styles.title}>Verifique seu e-mail</Text>
      <Text style={styles.subtitle}>
        Enviamos um código de 6 dígitos para o seu e-mail. Digite o código abaixo para confirmar sua conta e começar a usar o app.
      </Text>

      <Text style={styles.tempCode}>Código temporário: {expectedCode}</Text>

      <Text style={styles.label}>
        Código de verificação: <Text style={{ color: colors.feedback.error.main }}>*</Text>
      </Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            style={[styles.input, error && styles.inputError]}
          />
        ))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.footer}>
        <PrimaryButton title="Verificar minha conta" onPress={handleVerify} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.elevate,
    padding: 24,
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
    marginBottom: 4,
  },
  subtitle: {
    ...typography.body.p14Regular,
    color: colors.text.caption,
    marginBottom: 12,
  },
  tempCode: {
    textAlign: 'center',
    marginBottom: 12,
    color: colors.feedback.error.main,
    ...typography.body.p14Regular,
  },
  label: {
    ...typography.body.p14SemiBold,
    color: colors.text.body,
    marginBottom: 12,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    width: 48,
    height: 58,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.neutral[300],
    textAlign: 'center',
    ...typography.title.h5Regular,
    color: colors.text.title,
  },
  inputError: {
    borderColor: colors.feedback.error.main,
    borderWidth: 2,
  },
  errorText: {
    color: colors.feedback.error.main,
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  footer: {
    marginTop: 24,
  },
});