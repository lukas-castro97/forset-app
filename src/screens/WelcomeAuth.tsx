import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import PrimaryButton from '../components/PrimaryButton';
import AuthHome from '../../assets/images/AuthHome.svg';
import Logo from '../../assets/images/splash/logo-name.svg';
import Constants from 'expo-constants';
import ModalLogin from '../components/ModalLogin';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/types';

const { width } = Dimensions.get('window');

export default function WelcomeAuthScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <AuthHome width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.subtitle}>Seja bem vindo ao</Text>
        <Logo width={190} />
      </View>

      <View style={styles.buttonsContainer}>
        <PrimaryButton title="Acessar minha conta" variant="secondary" onPress={() => setShowLogin(true)} />

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>Ou entre usando:</Text>
          <View style={styles.line} />
        </View>

        <PrimaryButton
          title="Criar minha conta"
          variant="ghost"
          onPress={() => navigation.navigate('Register')}
        />
      </View>

      <Text style={styles.version}>Versão {Constants.expoConfig?.version}</Text>

      <ModalLogin visible={showLogin} onClose={() => setShowLogin(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand.primary.main,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  imageWrapper: {
    width: width,
    height: width * 1.1,
    overflow: 'hidden',
    marginBottom: -110,
  },
  titleContainer: {
    alignItems: 'center',
  },
  subtitle: {
    color: colors.text.alwaysWhite,
    marginBottom: 2,
    ...typography.title.h6Regular,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    rowGap: 4,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.text.alwaysWhite,
  },
  dividerText: {
    marginHorizontal: 12,
    color: colors.text.alwaysWhite,
    ...typography.title.smallSemiBold,
  },
  version: {
    color: colors.text.alwaysWhite,
    ...typography.body.p12Regular,
    textAlign: 'center',
    marginTop: 16,
  },
});