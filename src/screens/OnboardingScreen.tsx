import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import sizeSystem from '../theme/sizeSystem';
import Logo from '../../assets/images/splash/logo-name.svg';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'A revolução do seu Play!',
    text: 'O app que transforma a forma como você joga, organiza e participa de partidas e torneios de Beach Tennis.',
    image: require('../../assets/images/onboarding/onboarding-01.png'),
  },
  {
    id: '2',
    title: 'Escolha o seu perfil.',
    text: 'No Forset, você é um jogador. Conecte-se, desafie amigos e dispute torneios incríveis!',
    image: require('../../assets/images/onboarding/onboarding-02.png'),
  },
  {
    id: '3',
    title: 'Nivelamento inteligente',
    text: 'Nosso sistema ajuda você a encontrar jogos e torneios adequados ao seu nível de jogo.',
    image: require('../../assets/images/onboarding/onboarding-03.png'),
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('WelcomeAuth' as never);
    }
  };

  const handleSkip = () => {
    navigation.navigate('WelcomeAuth' as never);
  };

  const renderItem = ({ item }: { item: typeof slides[0] }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Topo com Logo e Pular */}
      <View style={styles.topBar}>
        <Logo width={100} />
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Pular introdução</Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        ref={flatListRef}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      {/* Botão Próximo */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.8}>
          <Text style={styles.nextButtonText}>
            {currentIndex === slides.length - 1 ? 'Bora pro PLAY!' : 'Próximo'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand.primary.main,
  },
  topBar: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipText: {
    color: colors.text.alwaysWhite,
    ...typography.title.h6SemiBold,
  },

  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  image: {
    width: '100%', 
    height: 380,
    borderRadius: 16,
    marginBottom: 32,
  },

  title: {
    color: colors.text.alwaysWhite,
    textAlign: 'center',
    marginBottom: 24,
    ...typography.title.h4SemiBold,
  },
  text: {
    color: colors.text.alwaysWhite,
    textAlign: 'center',
    ...typography.body.p14Regular,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  nextButton: {
    backgroundColor: colors.text.alwaysWhite,
    borderRadius: sizeSystem.radius.circle,
    paddingVertical: sizeSystem.padding.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: colors.brand.primary.main,
    ...typography.title.h6Bold,
  },
});