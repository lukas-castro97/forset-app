import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // icon
import colors from '../theme/colors';
import typography from '../theme/typography';

interface TextFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
  required?: boolean;
  error?: boolean;
  caption?: string;
  rightIcon?: string;
  onPressRightIcon?: () => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export default function TextField({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry,
  keyboardType = 'default',
  required,
  error,
  caption,
  rightIcon,
  onPressRightIcon,
  autoCapitalize,
}: TextFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && '*'}
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral[400]}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize ?? 'none'}
          autoCorrect={false}
        />
        {rightIcon && (
          <TouchableOpacity style={styles.iconButton} onPress={onPressRightIcon}>
            <Icon name={rightIcon} size={20} color={colors.brand.primary.main} />
          </TouchableOpacity>
        )}
      </View>

      {caption ? <Text style={[styles.caption, error && styles.captionError]}>{caption}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    ...typography.body.p14SemiBold,
    color: colors.text.body,
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: 8,
    padding: 12,
    paddingRight: 40, // espaço para o ícone
    ...typography.body.p16Regular,
    color: colors.text.body,
  },
  inputError: {
    borderColor: colors.feedback.error.main,
    borderWidth: 2,
  },
  iconButton: {
    position: 'absolute',
    right: 12,
  },
  caption: {
    marginTop: 4,
    fontSize: 12,
    color: colors.text.caption,
  },
  captionError: {
    color: colors.feedback.error.main,
  },
});