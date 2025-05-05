import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
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
  error?: boolean | string;
  caption?: string;
  rightIcon?: string;
  onPressRightIcon?: () => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  inputRef?: React.RefObject<TextInput>;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  onSubmitEditing?: () => void;
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
  inputRef,
  returnKeyType,
  onSubmitEditing,
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const showError = Boolean(error && typeof error === 'string' && error.trim().length > 0);
  const errorText = typeof error === 'string' ? error : caption;

  const inputStyles = [
    styles.input,
    isFocused && styles.inputFocused,
    showError && styles.inputError,
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={inputStyles}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral[400]}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize ?? 'none'}
          autoCorrect={false}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
        />
        {rightIcon && (
          <TouchableOpacity style={styles.iconButton} onPress={onPressRightIcon}>
            <Icon name={rightIcon} size={20} color={colors.brand.primary.main} />
          </TouchableOpacity>
        )}
      </View>

      {errorText ? <Text style={[styles.caption, styles.captionError]}>{errorText}</Text> : null}
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
  required: {
    color: colors.feedback.error.main,
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
    paddingRight: 40,
    ...typography.body.p16Regular,
    color: colors.text.body,
  },
  inputFocused: {
    borderColor: colors.brand.primary.main,
    borderWidth: 1.5,
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