import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import colors from '../theme/colors';
import typography from '../theme/typography';
import Icon from 'react-native-vector-icons/Feather';
import MenuPrincipalIcon from '../../assets/images/icons/icon-menu-principal.svg';

export default function FooterBar({ state, navigation }: BottomTabBarProps) {
  const tabs = [
    { name: 'Home', label: 'Home', icon: 'home' },
    { name: 'Torneios', label: 'Torneio', icon: 'bar-chart-2' },
    { name: 'NovaPartida', label: '', icon: 'custom' },
    { name: 'Dados', label: 'Dados', icon: 'pie-chart' },
    { name: 'Perfil', label: 'Perfil', icon: 'user-plus' },
  ];

  return (
    <View style={styles.wrapper}>
      {tabs.map((tab, index) => {
        const isFocused = state.routes[state.index].name === tab.name;

        const handlePress = () => {
          if (!isFocused) {
            navigation.navigate(tab.name as never);
          }
        };

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={handlePress}
            style={[styles.tabItem, index === 2 && styles.centralTab]}
          >
            {tab.icon === 'custom' ? (
              <View style={styles.centralIcon}>
                <MenuPrincipalIcon width={60} height={60} />
              </View>
            ) : (
              <Icon
                name={tab.icon}
                size={20}
                color={isFocused ? colors.brand.primary.main : colors.text.body}
              />
            )}
            {tab.label !== '' && (
              <Text
                style={[
                  styles.label,
                  isFocused && { color: colors.brand.primary.main },
                ]}
              >
                {tab.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    backgroundColor: colors.background.elevate,
    borderTopWidth: 1,
    borderColor: colors.neutral[200],
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  tabItem: {
    alignItems: 'center',
  },
  centralTab: {
    marginTop: -15,
  },
  centralIcon: {
    width: 74,
    height: 74,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...typography.title.smallRegular,
    marginTop: 8,
    color: colors.text.body,
  },
});