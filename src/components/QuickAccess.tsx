import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import QuickAccessCard from './QuickAccessCard';
import Icon from 'react-native-vector-icons/Feather';

export default function QuickAccess() {
  const options = [
    { label: 'Ranking', icon: <Icon name="bar-chart" size={20} color={colors.brand.primary.main} />, onPress: () => {} },
    { label: 'Torneios', icon: <Icon name="calendar" size={20} color={colors.brand.primary.main} />, onPress: () => {} },
    { label: 'Jogos', icon: <Icon name="play" size={20} color={colors.brand.primary.main} />, onPress: () => {} },
    { label: 'Times', icon: <Icon name="users" size={20} color={colors.brand.primary.main} />, onPress: () => {} },
    { label: 'Arena', icon: <Icon name="map-pin" size={20} color={colors.brand.primary.main} />, onPress: () => {} },
  ];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Acesso rápido</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRow}>
        {options.map((item, index) => (
          <QuickAccessCard key={index} label={item.label} icon={item.icon} onPress={item.onPress} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 16,
    paddingLeft: 24,
  },
  title: {
    ...typography.title.smallBold,
    color: colors.text.caption,
    marginBottom: 12,
    marginTop: 12,
  },
  cardRow: {
    gap: 12,
    paddingRight: 24,
  },
});
