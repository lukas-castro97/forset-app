const brand = {
    primary: {
      extraLight: '#EDF7FF',
      light: '#D7EBFF',
      main: '#0952EC',
      dark: '#133C95',
      alwaysLight: '#D7EBFF',
      alwaysMain: '#0952EC',
    },
    second: {
      extraLight: '#F0FDE8',
      light: '#DFF9CE',
      main: '#90E75E',
      dark: '#2B5D17',
      alwaysLight: '#DFF9CE',
      alwaysMain: '#76DB40',
    },
  };
  
  const feedback = {
    success: {
      extraLight: '#E0F2EC',
      light: '#88C9B3',
      main: '#238662',
      dark: '#1B6648',
      alwaysLight: '#E0F2EC',
      alwaysMain: '#1B6648',
    },
    error: {
      extraLight: '#FCE5EA',
      light: '#F8BECB',
      main: '#D33958',
      dark: '#A92D4F',
      alwaysLight: '#FCE5EA',
      alwaysMain: '#A92D4F',
    },
    warning: {
      extraLight: '#FFEDB8',
      light: '#FFD85D',
      main: '#FDA628',
      dark: '#FA7921',
      alwaysLight: '#FFEDB8',
      alwaysMain: '#FC9626',
    },
    info: {
      extraLight: '#E3F2FF',
      light: '#BBDEFF',
      main: '#2471FC',
      dark: '#3239C9',
      alwaysLight: '#BBDEFF',
      alwaysMain: '#2B5DE9',
    },
  };
  
  const neutral = {
    0: '#FFFFFF',
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
    alwaysWhite: '#FFFFFF',
    alwaysBlack: '#0F172A',
  };
  
  const colors = {
    brand,
    feedback,
    neutral,
    background: {
      bg: '#F5F7F9',         // Fundo padrão (pode alterar futuramente)
      elevate: neutral[0],   // Fundo elevado (cards, etc.)
    },
    text: {
      title: neutral[900],
      body: neutral[900],
      caption: neutral[600],
      disabled: neutral[500],
      alwaysWhite: neutral[0],
      alwaysBlack: neutral[950],
      textPrimaryExtraLight: brand.primary.extraLight,
      textPrimaryLight: brand.primary.light,
      textPrimaryMain: brand.primary.main,
      textPrimaryDark: brand.primary.dark,
      textSecondExtraLight: brand.second.extraLight,
      textSecondLight: brand.second.light,
      textSecondMain: brand.second.main,
      textSecondDark: brand.second.dark,
      textFeedbackSuccess0: feedback.success.dark,
      textFeedbackSuccessAlways: feedback.success.alwaysMain,
      textFeedbackError0: feedback.error.main,
      textFeedbackErrorAlways: feedback.error.alwaysMain,
      textFeedbackInfo0: feedback.info.main,
      textFeedbackInfoAlways: feedback.info.alwaysMain,
    },
  };
  
  export default colors;