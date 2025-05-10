import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import { Feather } from '@expo/vector-icons';

interface NumberAtletaProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

export default function NumberAtleta({ icon, label, value }: NumberAtletaProps) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}><Feather name="bar-chart" size={16} color={colors.text.alwaysWhite} /></View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 140,
    padding: 14,
    borderRadius: 8,
    backgroundColor: colors.background.bg,
  },
  icon: {
    marginBottom: 8,
    color: colors.text.alwaysWhite,
    backgroundColor: colors.brand.primary.main,
    width: 24,
    height: 24,
    borderRadius: 4,
    paddingLeft: 4,
    justifyContent: 'center',
  },
  label: {
    ...typography.title.miniRegular,
    color: colors.text.caption,
    marginBottom: 4,
  },
  value: {
    ...typography.title.h4SemiBold,
    color: colors.text.title,
  },
});