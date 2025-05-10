import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import colors from '../theme/colors';
import typography from '../theme/typography';
import PrimaryButton from '../components/PrimaryButton';
import AnswerCard from '../components/AnswerCard';
import { nivelamentoData } from '../data/nivelamentoData';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/types';

const { height } = Dimensions.get('window');

type NavigationProps = StackNavigationProp<RootStackParamList, 'NivelamentoQuiz'>;

export default function NivelamentoQuizScreen() {
  const { user } = useAuth();
  const navigation = useNavigation<NavigationProps>();
  const [currentStep, setCurrentStep] = useState(0);
  const [respostas, setRespostas] = useState<(string | null)[]>(Array(nivelamentoData.length).fill(null));
  const perguntaAtual = nivelamentoData[currentStep];
  const progresso = ((currentStep + 1) / nivelamentoData.length) * 100;

  const setResposta = (resposta: string) => {
    const novas = [...respostas];
    novas[currentStep] = resposta;
    setRespostas(novas);
  };

  const proximo = () => {
    if (currentStep < nivelamentoData.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const anterior = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const finalizar = async () => {
    const payload: Record<string, any> = { user_id: user?.id };
  
    respostas.slice(0, 10).forEach((respostaTexto, index) => {
      payload[`question${String(index + 1).padStart(2, '0')}`] = respostaTexto;
    });
  
    console.log('📦 Payload final enviado:', payload);
  
    try {
      const res = await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/api:pkbVGZBj/analisarNivelamento',
        payload
      );
      const { categoria, justification } = res.data;
      navigation.navigate('SuccessNivelamento', { categoria, justification });
    } catch (error: any) {
      console.error('❌ Erro ao enviar nivelamento:', error.response?.data || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={anterior} disabled={currentStep === 0}>
          <Icon name="arrow-left" size={20} color={colors.text.body} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Icon name="x" size={20} color={colors.text.body} />
        </TouchableOpacity>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${progresso}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.progressText}>
          Questões {String(currentStep + 1).padStart(2, '0')} de {nivelamentoData.length}
        </Text>
        <Text style={styles.question}>{perguntaAtual.texto}</Text>

        {perguntaAtual.opcoes.map((opt) => (
          <AnswerCard
            key={opt.id}
            label={opt.texto}
            selected={respostas[currentStep] === opt.texto}
            onPress={() => setResposta(opt.texto)}
          />
        ))}
      </ScrollView>

      <View style={styles.buttonRow}>
        {currentStep < nivelamentoData.length - 1 ? (
          <PrimaryButton
            title="Próxima pergunta"
            onPress={proximo}
            disabled={!respostas[currentStep]}
          />
        ) : (
          <PrimaryButton
            title="Finalizar nivelamento"
            onPress={finalizar}
            disabled={respostas.includes(null)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    backgroundColor: colors.background.elevate,
    paddingTop: 48,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 24,
    marginTop: 30,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: colors.neutral[200],
    width: '100%',
  },
  progressBarFill: {
    height: 4,
    backgroundColor: colors.brand.primary.main,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  progressText: {
    ...typography.body.p14SemiBold,
    color: colors.text.textPrimaryMain,
    marginTop: 8,
    marginBottom: 14,
  },
  question: {
    ...typography.title.h4Bold,
    color: colors.text.title,
    marginBottom: 16,
  },
  buttonRow: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },
});