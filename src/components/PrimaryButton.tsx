import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import sizeSystem from '../theme/sizeSystem';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'default' | 'secondary' | 'ghost' | 'flat';
  loading?: boolean;
  disabled?: boolean;
}

export default function PrimaryButton({
  title,
  onPress,
  variant = 'default',
  loading = false,
  disabled = false,
}: PrimaryButtonProps) {
  const isDisabled = loading || disabled;

  return (
    <TouchableOpacity
      onPress={!isDisabled ? onPress : undefined}
      activeOpacity={0.8}
      disabled={isDisabled}
      style={[
        styles.buttonBase,
        variant === 'secondary' && styles.buttonSecondary,
        variant === 'ghost' && styles.buttonGhost,
        variant === 'flat' && styles.buttonFlat,
        isDisabled && styles.buttonDisabled,
      ]}
    >
      <Text
        style={[
          styles.textBase,
          variant === 'secondary' && styles.textSecondary,
          variant === 'ghost' && styles.textGhost,
          variant === 'flat' && styles.textFlat,
          isDisabled && styles.textDisabled,
        ]}
      >
        {loading ? 'Carregando...' : title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    width: '100%',
    backgroundColor: colors.brand.primary.main,
    paddingVertical: sizeSystem.padding.xs,
    borderRadius: sizeSystem.radius.circle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: colors.text.alwaysWhite,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.text.alwaysWhite,
  },
  buttonFlat: {
    backgroundColor: colors.brand.primary.extraLight,
  },
  buttonDisabled: {
    backgroundColor: colors.neutral[200],
  },
  textBase: {
    color: colors.text.alwaysWhite,
    ...typography.title.h6SemiBold,
  },
  textSecondary: {
    color: colors.brand.primary.main,
  },
  textGhost: {
    color: colors.text.alwaysWhite,
  },
  textFlat: {
    color: colors.text.textPrimaryMain,
  },
  textDisabled: {
    color: colors.neutral[500],
  },
});