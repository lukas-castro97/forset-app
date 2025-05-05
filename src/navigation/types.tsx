// src/navigation/types.ts
export type RootStackParamList = {
    Onboarding: undefined;
    WelcomeAuth: undefined;
    HomeApp: undefined;
    Register: undefined;
    Verify: {
        email: string;
        code: string;
      };
  };