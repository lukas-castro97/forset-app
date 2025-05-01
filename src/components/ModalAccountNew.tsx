import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import sizeSystem from '../theme/sizeSystem';
import PrimaryButton from './PrimaryButton';
import TextField from './TextField';

interface ModalAccountNewProps {
  visible: boolean;
  onClose: () => void;
}

export default function ModalAccountNew({ visible, onClose }: ModalAccountNewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.handler} />
            <Text style={styles.title}>Criar uma conta</Text>
            <Text style={styles.subtitle}>Bem vindo a esse universo do Beach Tennis.</Text>

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
              onChangeText={setEmail}
            />
            <TextField
              label="Senha"
              placeholder="**********"
              required
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextField
              label="Confirme sua senha"
              placeholder="**********"
              required
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <PrimaryButton title="Criar minha conta" onPress={() => {}} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContainer: {
    backgroundColor: colors.background.elevate,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 24,
    gap: 12,
  },
  handler: {
    width: 40,
    height: 3,
    backgroundColor: colors.neutral[400],
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  title: {
    ...typography.title.h4Bold,
    color: colors.text.title,
  },
  subtitle: {
    ...typography.body.p14Regular,
    color: colors.text.caption,
    marginBottom: 8,
  },
});