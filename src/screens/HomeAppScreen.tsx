import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import colors from '../theme/colors';
import typography from '../theme/typography';
import PrimaryButton from '../components/PrimaryButton';
import HomeHeader from '../components/HomeHeaderBlock';
import QuickAccess from '../components/QuickAccess';
import RankingCard from '../components/RankingCards';
import NivelamentoModal from '../components/NivelamentoModal';

export default function HomeAppScreen() {
  const { user, loadingUser, refreshUser, logout } = useAuth();
  const hasFetched = useRef(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!hasFetched.current) {
      refreshUser();
      hasFetched.current = true;
    }
  }, []);

  if (loadingUser) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.brand.primary.main} />
        <Text style={styles.loadingText}>Carregando dados do usuário...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <HomeHeader onPressBanner={() => setShowModal(true)} />
      <QuickAccess />
      <RankingCard />

      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionTitle}>Partidas recentes</Text>
        <TouchableOpacity>
          <Text style={styles.sectionLink}>Ver todas partidas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.emptyStateBox}>
        <Text style={styles.emptyStateIcon}>❗</Text>
        <View>
          <Text style={styles.emptyStateTitle}>Sem partidas registradas!</Text>
          <Text style={styles.emptyStateText}>
            Parece que você ainda não jogou nenhuma partida ou participou de campeonatos. Para ser ranqueado com precisão, registre suas partidas e participe de torneios. Isso ajudará o sistema a nivelar você corretamente!
          </Text>
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <PrimaryButton title="Registrar nova partida" onPress={() => {}} />
      </View>

      <View style={styles.buttonWrapper}>
        <PrimaryButton title="Sair da conta" onPress={logout} />
      </View>

      <NivelamentoModal visible={showModal} onClose={() => setShowModal(false)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.bg,
  },
  content: {
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.elevate,
    padding: 24,
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
    marginTop: 24,
    paddingHorizontal: 24,
    marginBottom: 170,
  },
  sectionTitleRow: {
    paddingHorizontal: 24,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    ...typography.title.h6SemiBold,
    color: colors.text.body,
  },
  sectionLink: {
    ...typography.body.p14SemiBold,
    color: colors.brand.primary.main,
  },
  emptyStateBox: {
    backgroundColor: colors.background.elevate,
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  emptyStateIcon: {
    fontSize: 18,
    marginTop: 4,
  },
  emptyStateTitle: {
    ...typography.title.h6SemiBold,
    color: colors.text.title,
    marginBottom: 4,
  },
  emptyStateText: {
    ...typography.body.p14Regular,
    color: colors.text.body,
  },
});