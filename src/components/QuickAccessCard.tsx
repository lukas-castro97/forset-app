import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';

interface QuickAccessCardProps {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
}

export default function QuickAccessCard({ label, icon, onPress }: QuickAccessCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} disabled={!onPress}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
card: {
    width: 95,
    height: 100,
    backgroundColor: colors.background.elevate,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 12,
    },
  icon: {
    marginBottom: 8,
  },
  label: {
    ...typography.body.p14Regular,
    color: colors.text.title,
    textAlign: 'left',
  },
});