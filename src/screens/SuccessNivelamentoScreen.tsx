import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import BgConfetti from '../../assets/images/bg-confeti.svg';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';
import colors from '../theme/colors';
import typography from '../theme/typography';
import PrimaryButton from '../components/PrimaryButton';
import EditCategoriaModal from '../components/EditCategoriaModal';

const { width } = Dimensions.get('window');

type SuccessNivelamentoRouteProp = RouteProp<RootStackParamList, 'SuccessNivelamento'>;
type NavigationProps = StackNavigationProp<RootStackParamList, 'SuccessNivelamento'>;

export default function SuccessNivelamentoScreen() {
  const { user } = useAuth();
  const route = useRoute<SuccessNivelamentoRouteProp>();
  const navigation = useNavigation<NavigationProps>();
  const { categoria, justification } = route.params;
  const firstName = user?.name?.split(' ')[0] || 'Você';

  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.fullscreen}>
      <View style={styles.container}>
        {/* Confetti BG */}
        <View style={styles.confettiContainer}>
          <BgConfetti
            width={width}
            height={360}
            preserveAspectRatio="none"
            style={styles.confettiSVG}
          />
        </View>

        {/* Categoria Box com fundo cinza */}
        <View style={styles.boxCategoria}>
          <Text style={styles.boxTitle}>
            <Text style={styles.highlight}>{firstName}</Text>, você está na:
          </Text>
          <Text style={styles.boxCategoriaText}>Categoria {categoria}</Text>
        </View>

        <View style={styles.scrollArea}>
          <Text style={styles.justification}>{justification}</Text>
        </View>
      </View>

      <View style={styles.fixedButtonWrapper}>
        <View style={styles.buttonContainer}>
          <Text style={styles.tipText}>
            <Text style={styles.highlight}>Acha que está na categoria errada?</Text> Clique em ‘
            <Text style={styles.highlight}>Editar minha categoria</Text>’ para ajustá-la.
          </Text>

          <PrimaryButton
            title="Editar minha categoria"
            variant="flat"
            onPress={() => setShowModal(true)}
          />
          <View style={{ height: 12 }} />
          <PrimaryButton
            title="Concordo com minha categoria"
            onPress={() => navigation.navigate('HomeApp')}
          />
        </View>
      </View>

      {showModal && (
        <View style={styles.modalWrapper}>
          <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={() => setShowModal(false)} />
          <View style={styles.modalContent}>
            <EditCategoriaModal
              visible={showModal}
              onClose={() => setShowModal(false)}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: colors.background.elevate,
  },
  container: {
    flex: 1,
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: 330,
    zIndex: -1,
  },
  confettiSVG: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  boxCategoria: {
    backgroundColor: colors.neutral[100],
    padding: 14,
    marginHorizontal: 24,
    borderRadius: 12,
    marginTop: 310,
  },
  boxTitle: {
    ...typography.body.p14Regular,
    color: colors.text.caption,
  },
  boxCategoriaText: {
    ...typography.title.h4Bold,
    color: colors.text.title,
  },
  highlight: {
    fontWeight: 'bold',
  },
  scrollArea: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  justification: {
    ...typography.body.p14Regular,
    color: colors.text.body,
    marginBottom: 16,
  },
  tipText: {
    ...typography.body.p14Regular,
    color: colors.text.caption,
    marginBottom: 24,
  },
  buttonContainer: {
    paddingHorizontal: 24,
  },
  fixedButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background.elevate,
    paddingBottom: 24,
    paddingTop: 12,
  },
  modalWrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: colors.background.elevate,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 36,
    width: '100%',
    minHeight: 420,
  },
});
