import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../theme/colors';
import typography from '../theme/typography';

type AlertType = 'neutral' | 'primary' | 'error' | 'success';

interface AlertBoxProps {
  type?: AlertType;
  title?: string;
  message: string;
  showIcon?: boolean;
}

export default function AlertBox({
  type = 'neutral',
  title,
  message,
  showIcon = true,
}: AlertBoxProps) {
  const variant = colorVariants[type];
  const iconName = {
    neutral: 'info',
    primary: 'info',
    error: 'alert-circle',
    success: 'check-circle',
  }[type];

  return (
    <View style={[styles.container, { backgroundColor: variant.background }]}>
      <View style={styles.content}>
        {showIcon && (
          <Icon
            name={iconName}
            size={18}
            color={variant.icon}
            style={styles.icon}
          />
        )}
        <View style={{ flex: 1 }}>
          {title && (
            <Text style={[typography.title.h6Bold, { color: variant.text }]}>
              {title}
            </Text>
          )}
          <Text style={[typography.body.p14Regular, { color: variant.text }]}>
            {message}
          </Text>
        </View>
      </View>
    </View>
  );
}

const colorVariants = {
  neutral: {
    background: colors.neutral[200],
    text: colors.text.caption,
    icon: colors.text.caption,
  },
  primary: {
    background: colors.brand.primary.extraLight,
    text: colors.brand.primary.dark,
    icon: colors.brand.primary.dark,
  },
  error: {
    background: colors.feedback.error.extraLight,
    text: colors.feedback.error.dark,
    icon: colors.feedback.error.dark,
  },
  success: {
    background: colors.feedback.success.extraLight,
    text: colors.feedback.success.dark,
    icon: colors.feedback.success.dark,
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderRadius: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  icon: {
    marginTop: 2,
    marginRight: 8,
  },
});