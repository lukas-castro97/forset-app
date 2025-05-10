import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import PrimaryButton from './PrimaryButton';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/types';

interface ModalNivelamentoProps {
  visible: boolean;
  onClose: () => void;
}

export default function ModalNivelamento({ visible, onClose }: ModalNivelamentoProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleStart = () => {
    onClose();
    navigation.navigate('NivelamentoQuiz');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.container} onPress={() => {}}>
          <View style={styles.dragger} />

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>🎾 Descubra sua categoria em poucos minutos</Text>
            <Text style={styles.text}>
              Quer jogar torneios no seu nível? Responda algumas perguntas rápidas e a gente te mostra onde você se encaixa. Usamos IA pra garantir mais precisão e facilitar sua jornada.
            </Text>

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                <Text style={{ fontWeight: 'bold' }}>Antes de começar, alguns avisos importantes:</Text>
              </Text>
            </View>

            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>-</Text>
              <Text style={styles.bulletText}>O nivelamento é baseado em dados reais de pontuação avaliados por professores e conta com o apoio de uma IA treinada para essa missão, tudo para te colocar na categoria certa com segurança.</Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>-</Text>
              <Text style={styles.bulletText}>
                <Text style={{ fontWeight: 'bold' }}>Seja bem sincero</Text>, suas respostas definem sua categoria.
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>-</Text>
              <Text style={styles.bulletText}>Você pode editar sua categoria, mas ela será visível para os outros atletas.</Text>
            </View>

            <PrimaryButton title="Descobrir minha categoria" onPress={handleStart} />
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  container: {
    backgroundColor: colors.background.elevate,
    padding: 24,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    maxHeight: '90%',
  },
  dragger: {
    alignSelf: 'center',
    width: 60,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.neutral[300],
    marginBottom: 16,
  },
  title: {
    ...typography.title.h5Bold,
    color: colors.text.title,
    marginBottom: 24,
  },
  text: {
    ...typography.body.p14Regular,
    color: colors.text.body,
    marginBottom: 24,
  },
  infoBox: {
    backgroundColor: colors.neutral[100],
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoText: {
    ...typography.body.p14SemiBold,
    color: colors.text.title,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  bullet: {
    fontSize: 14,
    color: colors.text.textPrimaryMain,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  bulletText: {
    flex: 1,
    ...typography.body.p14Regular,
    color: colors.text.body,
    marginBottom: 16,
  },
});