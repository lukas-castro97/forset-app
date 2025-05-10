import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../theme/colors';
import typography from '../theme/typography';
import CategoryBadge from './CategoryBadge';
import { useAuth } from '../context/AuthContext';
import BannerImage from '../../assets/images/banner-nivelamento.svg';

interface HomeHeaderBlockProps {
  onPressBanner?: () => void;
}

export default function HomeHeaderBlock({ onPressBanner }: HomeHeaderBlockProps) {
  const { user } = useAuth();

  const getInitials = (fullName: string) => {
    const names = fullName.split(' ');
    const first = names[0]?.[0] || '';
    const last = names[names.length - 1]?.[0] || '';
    return `${first}${last}`.toUpperCase();
  };

  const badgeType = !user?.category_suggested
    ? 'none'
    : user?.category_edit
    ? 'edited'
    : 'suggested';

  const badgeCategory = !user?.category_suggested
    ? undefined
    : user?.category_edit
    ? user.category_current
    : user.category_suggested;

  return (
    <View style={styles.wrapper}>
      {/* Linha superior */}
      <View style={styles.topRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user ? getInitials(user.name) : '?'}</Text>
        </View>
        <View style={styles.iconWrapper}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="bell" size={18} color={colors.neutral[400]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="menu" size={18} color={colors.neutral[400]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Saudação + Nome + Badge */}
      <View style={styles.bottomRow}>
        <Text style={styles.greeting}>Olá, bora por play? 👋</Text>
        <View style={styles.nameBadgeRow}>
          <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
            {user?.name || 'Usuário'}
          </Text>
          <CategoryBadge type={badgeType} category={badgeCategory} />
        </View>
      </View>

      {/* Banner clicável */}
      {!user?.category_suggested && (
        <TouchableOpacity style={styles.bannerContainer} onPress={onPressBanner}>
          <BannerImage width="100%" height={160} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background.elevate,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 16,
    width: '100%',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 40,
    backgroundColor: colors.brand.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.text.alwaysWhite,
    fontWeight: 'bold',
    fontSize: 14,
  },
  iconWrapper: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: colors.neutral[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'column',
  },
  greeting: {
    ...typography.body.p14Regular,
    color: colors.text.caption,
    marginBottom: 2,
  },
  nameBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    ...typography.title.h4Bold,
    color: colors.text.title,
    flexShrink: 1,
    marginRight: 8,
  },
  bannerContainer: {
    marginTop: 8,
    width: '100%',
  },
});