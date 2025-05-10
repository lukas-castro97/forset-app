import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import Icon from 'react-native-vector-icons/Feather';

interface AnswerCardProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function AnswerCard({ label, selected, onPress }: AnswerCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Icon
          name={selected ? 'check-circle' : 'circle'}
          size={20}
          color={selected ? colors.text.alwaysWhite : colors.neutral[400]}
          style={styles.icon}
        />
        <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.elevate,
    borderColor: colors.neutral[300],
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardSelected: {
    backgroundColor: colors.brand.primary.extraLight,
    borderColor: colors.brand.primary.main,
    borderWidth: 1.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
    color: colors.text.textPrimaryMain
  },
  label: {
    ...typography.body.p14Regular,
    color: colors.text.body,
    flexShrink: 1,
  },
  labelSelected: {
    color: colors.text.textPrimaryMain,
    ...typography.title.h6SemiBold,
  },
});