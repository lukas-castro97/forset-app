// Base Config
const fontFamily = {
    title: 'Archivo',
    body: 'Titillium Web',
  };
  
  const fontWeight = {
    regular: '400',
    semiBold: '600',
    bold: '700',
  } as const;
  
  const fontSize = {
    h1: 48,
    h2: 40,
    h3: 38,
    h4: 24,
    h5: 16,
    h6: 14,
    body16: 16,
    body14: 14,
    body12: 12,
    body10: 10,
  };
  
  const lineHeight = {
    xl: 48,
    lg: 40,
    md: 32,
    sm: 24,
    xs: 22,
    xxs: 16,
    xxxs: 14,
  };
  
  const letterSpacing = {
    small: 0.2,
  };
  
  // Typography Styles
  const typography = {
    title: {
      h1Regular: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.regular,
        fontSize: fontSize.h1,
        lineHeight: lineHeight.xl,
        letterSpacing: letterSpacing.small,
      },
      h1SemiBold: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.semiBold,
        fontSize: fontSize.h1,
        lineHeight: lineHeight.xl,
        letterSpacing: letterSpacing.small,
      },
      h1Bold: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.bold,
        fontSize: fontSize.h1,
        lineHeight: lineHeight.xl,
        letterSpacing: letterSpacing.small,
      },
      h2Regular: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.regular,
        fontSize: fontSize.h2,
        lineHeight: lineHeight.lg,
        letterSpacing: letterSpacing.small,
      },
      h2SemiBold: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.semiBold,
        fontSize: fontSize.h2,
        lineHeight: lineHeight.lg,
        letterSpacing: letterSpacing.small,
      },
      h2Bold: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.bold,
        fontSize: fontSize.h2,
        lineHeight: lineHeight.lg,
        letterSpacing: letterSpacing.small,
      },
      h3Regular: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.regular,
        fontSize: fontSize.h3,
        lineHeight: lineHeight.md,
        letterSpacing: letterSpacing.small,
      },
      h3SemiBold: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.semiBold,
        fontSize: fontSize.h3,
        lineHeight: lineHeight.md,
        letterSpacing: letterSpacing.small,
      },
      h3Bold: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.bold,
        fontSize: fontSize.h3,
        lineHeight: lineHeight.md,
        letterSpacing: letterSpacing.small,
      },
      h4Regular: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.regular,
        fontSize: fontSize.h4,
        lineHeight: lineHeight.md,
        letterSpacing: letterSpacing.small,
      },
      h4SemiBold: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.semiBold,
        fontSize: fontSize.h4,
        lineHeight: lineHeight.md,
        letterSpacing: letterSpacing.small,
      },
      h4Bold: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.bold,
        fontSize: fontSize.h4,
        lineHeight: lineHeight.md,
        letterSpacing: letterSpacing.small,
      },
      h5Regular: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.regular,
        fontSize: fontSize.h5,
        lineHeight: lineHeight.sm,
        letterSpacing: letterSpacing.small,
      },
      h5SemiBold: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.semiBold,
        fontSize: fontSize.h5,
        lineHeight: lineHeight.sm,
        letterSpacing: letterSpacing.small,
      },
      h5Bold: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.bold,
        fontSize: fontSize.h5,
        lineHeight: lineHeight.sm,
        letterSpacing: letterSpacing.small,
      },
      h6Regular: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.regular,
        fontSize: fontSize.h6,
        lineHeight: lineHeight.xs,
        letterSpacing: letterSpacing.small,
      },
      h6SemiBold: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.semiBold,
        fontSize: fontSize.h6,
        lineHeight: lineHeight.xs,
        letterSpacing: letterSpacing.small,
      },
      h6Bold: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.bold,
        fontSize: fontSize.h6,
        lineHeight: lineHeight.xs,
        letterSpacing: letterSpacing.small,
      },
      smallRegular: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.regular,
        fontSize: fontSize.body12,
        lineHeight: lineHeight.xxs,
        letterSpacing: letterSpacing.small,
      },
      smallSemiBold: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.semiBold,
        fontSize: fontSize.body12,
        lineHeight: lineHeight.xxs,
        letterSpacing: letterSpacing.small,
      },
      smallBold: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.bold,
        fontSize: fontSize.body12,
        lineHeight: lineHeight.xxs,
        letterSpacing: letterSpacing.small,
      },
      miniRegular: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.regular,
        fontSize: fontSize.body10,
        lineHeight: lineHeight.xxxs,
        letterSpacing: letterSpacing.small,
      },
      miniSemiBold: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.semiBold,
        fontSize: fontSize.body10,
        lineHeight: lineHeight.xxxs,
        letterSpacing: letterSpacing.small,
      },
      miniBold: {
        fontFamily: fontFamily.title,
        fontWeight: fontWeight.bold,
        fontSize: fontSize.body10,
        lineHeight: lineHeight.xxxs,
        letterSpacing: letterSpacing.small,
      },
    },
    body: {
      p16Regular: {
        fontFamily: fontFamily.body,
        fontWeight: fontWeight.regular,
        fontSize: fontSize.body16,
        lineHeight: lineHeight.sm,
        letterSpacing: letterSpacing.small,
      },
      p16SemiBold: {
        fontFamily: fontFamily.body,
        fontWeight: fontWeight.semiBold,
        fontSize: fontSize.body16,
        lineHeight: lineHeight.sm,
        letterSpacing: letterSpacing.small,
      },
      p16Bold: {
        fontFamily: fontFamily.body,
        fontWeight: fontWeight.bold,
        fontSize: fontSize.body16,
        lineHeight: lineHeight.sm,
        letterSpacing: letterSpacing.small,
      },
      p14Regular: {
        fontFamily: fontFamily.body,
        fontWeight: fontWeight.regular,
        fontSize: fontSize.body14,
        lineHeight: lineHeight.xs,
        letterSpacing: letterSpacing.small,
      },
      p14SemiBold: {
        fontFamily: fontFamily.body,
        fontWeight: fontWeight.semiBold,
        fontSize: fontSize.body14,
        lineHeight: lineHeight.xs,
        letterSpacing: letterSpacing.small,
      },
      p14Bold: {
        fontFamily: fontFamily.body,
        fontWeight: fontWeight.bold,
        fontSize: fontSize.body14,
        lineHeight: lineHeight.xs,
        letterSpacing: letterSpacing.small,
      },
      p12Regular: {
        fontFamily: fontFamily.body,
        fontWeight: fontWeight.regular,
        fontSize: fontSize.body12,
        lineHeight: lineHeight.xxs,
        letterSpacing: letterSpacing.small,
      },
      p12SemiBold: {
        fontFamily: fontFamily.body,
        fontWeight: fontWeight.semiBold,
        fontSize: fontSize.body12,
        lineHeight: lineHeight.xxs,
        letterSpacing: letterSpacing.small,
      },
      p12Bold: {
        fontFamily: fontFamily.body,
        fontWeight: fontWeight.bold,
        fontSize: fontSize.body12,
        lineHeight: lineHeight.xxs,
        letterSpacing: letterSpacing.small,
      },
      p10Regular: {
        fontFamily: fontFamily.body,
        fontWeight: fontWeight.regular,
        fontSize: fontSize.body10,
        lineHeight: lineHeight.xxxs,
        letterSpacing: letterSpacing.small,
      },
      p10SemiBold: {
        fontFamily: fontFamily.body,
        fontWeight: fontWeight.semiBold,
        fontSize: fontSize.body10,
        lineHeight: lineHeight.xxxs,
        letterSpacing: letterSpacing.small,
      },
      p10Bold: {
        fontFamily: fontFamily.body,
        fontWeight: fontWeight.bold,
        fontSize: fontSize.body10,
        lineHeight: lineHeight.xxxs,
        letterSpacing: letterSpacing.small,
      },
    },
  };
  
  export { fontFamily, fontWeight, fontSize, lineHeight, letterSpacing };
  export default typography;