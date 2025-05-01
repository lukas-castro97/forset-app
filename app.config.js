export default {
  expo: {
    name: 'Forset',
    slug: 'forset-beta',
    version: '0.1.0',
    orientation: 'portrait',
    icon: './assets/imagens/Icon.png',
    splash: {
      image: './assets/imagens/Splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#0952EC',
    },
    userInterfaceStyle: 'light',
    plugins: ['expo-dev-client'],
    ios: {
      bundleIdentifier: 'com.forset.beta',
      supportsTablet: true,
    },
    android: {
      package: 'com.forset.beta',
    },
    assetBundlePatterns: ['**/*'],
    extra: {
      eas: {
        projectId: '60bab5ea-c7f2-4645-9ce1-b253043a9908', // 👈 ADICIONAR ISSO AQUI
      },
    },
  },
};