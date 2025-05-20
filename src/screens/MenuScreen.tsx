import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/types';
import colors from '../theme/colors';
import typography from '../theme/typography';

type MenuItem = {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  screen: keyof RootStackParamList | null;
};

const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Home',
    icon: 'home',
    screen: 'HomeApp',
  },
  {
    label: 'Torneios',
    icon: 'home',
    screen: null, // tela ainda não criada
  },
  {
    label: 'DayUse',
    icon: 'credit-card',
    screen: null, // tela ainda não criada
  },
  {
    label: 'Ranking',
    icon: 'bar-chart-2',
    screen: null, // tela ainda não criada
  },
  {
    label: 'Jogadores',
    icon: 'users',
    screen: null, // tela ainda não criada
  },
];

type NavigationProps = StackNavigationProp<RootStackParamList>;

function isScreenName(
  screen: keyof RootStackParamList | null
): screen is keyof RootStackParamList {
  return screen !== null;
}

export default function MenuScreen() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Menu</Text>

      <View style={styles.menuWrapper}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.menuItem}
            onPress={() => {
                if (isScreenName(item.screen)) {
                navigation.navigate(item.screen as any);
                }
            }}
            disabled={!item.screen}
          >
            <Feather
              name={item.icon as any}
              size={20}
              color={item.screen ? colors.text.body : colors.text.disabled}
              style={styles.menuIcon}
            />
            <Text
              style={[
                styles.menuText,
                !item.screen && { color: colors.text.disabled },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: colors.background.bg,
  },
  title: {
    ...typography.title.h4Bold,
    color: colors.text.title,
    marginBottom: 24,
  },
  menuWrapper: {
    flexDirection: 'column',
    gap: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    ...typography.body.p16Regular,
    color: colors.text.body,
  },
});
