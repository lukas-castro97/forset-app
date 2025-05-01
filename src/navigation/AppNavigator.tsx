import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import SplashScreen from '../screens/splashScreen';
import { useAuth } from '../context/AuthContext';
import OnboardingScreen from '../screens/OnboardingScreen';
import WelcomeAuthScreen from '../screens/WelcomeAuth';
import HomeAppScreen from '../screens/HomeAppScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Enquanto carrega, mostra o SplashScreen personalizado
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="HomeApp" component={HomeAppScreen} />
      ) : (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="WelcomeAuth" component={WelcomeAuthScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
