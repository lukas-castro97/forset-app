// src/screens/TournamentScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function TournamentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tournament Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.bg,
  },
  text: {
    fontSize: 18,
    color: colors.text.title,
  },
});