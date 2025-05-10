import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeAppScreen from '../screens/HomeAppScreen';
import TournamentScreen from '../screens/TournamentScreen';
import DataScreen from '../screens/DataScreen';
import ProfileScreen from '../screens/ProfilerScreen';
import FooterBar from '../components/FooterBar';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <FooterBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeAppScreen} />
      <Tab.Screen name="Torneios" component={TournamentScreen} />
      <Tab.Screen name="Dados" component={DataScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}