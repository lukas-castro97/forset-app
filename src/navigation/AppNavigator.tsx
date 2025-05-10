import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/splashScreen';
import { useAuth } from '../context/AuthContext';
import OnboardingScreen from '../screens/OnboardingScreen';
import WelcomeAuthScreen from '../screens/WelcomeAuth';
import RegisterScreen from '../screens/RegisterScreen';
import VerifyAccountScreen from '../screens/VerifyAccountScreen';
import NivelamentoQuizScreen from '../screens/NivelamentoQuizScreen';
import SuccessNivelamentoScreen from '../screens/SuccessNivelamentoScreen';
import TabNavigator from './TabNavigator';
import type { RootStackParamList } from './types'; // ✅ AQUI

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <SplashScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="HomeApp" component={TabNavigator} />
          <Stack.Screen name="NivelamentoQuiz" component={NivelamentoQuizScreen} />
          <Stack.Screen name="SuccessNivelamento" component={SuccessNivelamentoScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="WelcomeAuth" component={WelcomeAuthScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Verify" component={VerifyAccountScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}