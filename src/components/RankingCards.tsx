import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import PrimaryButton from './PrimaryButton';
import NumberAtleta from './NumberAtleta';
import Icon from 'react-native-vector-icons/Feather';
import IconRanking from '../../assets/images/icons/icon-ranking.svg'; // ajuste o caminho se necessário

export default function RankingCard() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.rankingInfo}>
        <IconRanking width={40} height={40} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.headerCaption}>Meu ranking</Text>
            <Text style={styles.headerTitle}>Sem dados</Text>
          </View>
        </View>
            <View style={{ width: 125}}>
                <PrimaryButton
                    title="Ver ranking"
                    onPress={() => {}}
                    variant="flat"
                />
            </View>      
        </View>

      <View style={styles.divider} />

      <View style={styles.numbersGrid}>
        <NumberAtleta icon={<Icon name="bar-chart" size={20} color={colors.brand.primary.main} />} label="Vitórias/partidas" value="0/0" />
        <NumberAtleta icon={<Icon name="bar-chart" size={20} color={colors.brand.primary.main} />} label="Porcentagem de vitória" value="0%" />
        <NumberAtleta icon={<Icon name="bar-chart" size={20} color={colors.brand.primary.main} />} label="Torneios disputados" value="0" />
        <NumberAtleta icon={<Icon name="bar-chart" size={20} color={colors.brand.primary.main} />} label="Títulos garantidos" value="0" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
    backgroundColor: colors.background.elevate,
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rankingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCaption: {
    ...typography.title.smallRegular,
    color: colors.text.caption,
  },
  headerTitle: {
    ...typography.title.h5Bold,
    fontSize: 22,
    color: colors.text.title,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral[200],
    marginVertical: 16,
  },
  numbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
});