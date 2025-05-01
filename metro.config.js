// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

const { assetExts, sourceExts } = config.resolver;

config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.transformer.enableBabelRCLookup = true; // garante compatibilidade com reanimated

config.resolver = {
  assetExts: assetExts.filter(ext => ext !== 'svg'),
  sourceExts: [...sourceExts, 'svg'],
};

module.exports = config;