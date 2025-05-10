import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';

interface CategoryBadgeProps {
  type: 'none' | 'suggested' | 'edited';
  category?: string;
}

export default function CategoryBadge({ type, category }: CategoryBadgeProps) {
  if (type === 'none') {
    return (
      <View style={[styles.badgeBase, styles.noneBg]}>
        <Text style={[typography.title.h6SemiBold, styles.noneText]}>Sem categoria</Text>
      </View>
    );
  }

  if (type === 'suggested') {
    return (
      <View style={[styles.badgeBase, styles.suggestedBg]}>
        <Text style={[typography.title.h6SemiBold, styles.badgeText]}>Cat.</Text>
        <View style={styles.letterCircleBlue}>
          <Text style={styles.letterTextBlue}>{category}</Text>
        </View>
      </View>
    );
  }

  if (type === 'edited') {
    return (
      <View style={styles.editedWrapper}>
        <View style={[styles.badgeBase, styles.editedBg]}>
          <Text style={[typography.title.h6SemiBold, styles.badgeText]}>Cat.</Text>
          <View style={styles.letterCircleOrange}>
            <Text style={styles.letterTextOrange}>{category}</Text>
          </View>
        </View>
        <Text style={styles.editedLabel}>Cat.{'\n'}Alterada</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  badgeBase: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 24,
  },
  noneBg: {
    backgroundColor: colors.neutral[200],
    paddingLeft: 8,
    paddingRight: 8,
  },
  noneText: {
    color: colors.text.disabled,
  },
  suggestedBg: {
    backgroundColor: colors.brand.primary.main,
  },
  editedBg: {
    backgroundColor: colors.feedback.warning.dark,
  },
  badgeText: {
    color: colors.text.alwaysWhite,
    marginRight: 4,
    marginLeft: 4,
  },
  letterCircleBlue: {
    width: 25,
    height: 20,
    borderRadius: 12,
    backgroundColor: colors.background.elevate,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterTextBlue: {
    color: colors.text.textPrimaryMain,
    fontWeight: 'bold',
  },
  letterCircleOrange: {
    width: 25,
    height: 20,
    borderRadius: 12,
    backgroundColor: colors.background.elevate,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterTextOrange: {
    color: colors.feedback.warning.dark,
    fontWeight: 'bold',
  },
  editedLabel: {
    color: colors.feedback.warning.dark,
    marginLeft: 4,
    textAlign: 'left',
    ...typography.body.p14Regular,
    lineHeight: 16,
  },
  editedWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
