export type RootStackParamList = {
  Onboarding: undefined;
  WelcomeAuth: undefined;
  HomeApp: undefined;
  Menu: undefined; // ← adicione isso se ainda não existir
  Register: undefined;
  Verify: {
    email: string;
    code: string;
  };
  NivelamentoQuiz: undefined;
  SuccessNivelamento: {
    categoria: string;
    justification: string;
  };
};