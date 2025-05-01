# 🏖️ Forset App

Aplicativo mobile focado em **Beach Tennis Amador**, desenvolvido com **React Native + Expo**.  
Criado para entregar uma experiência completa ao atleta, desde organização de jogos até tornei­­os.

---

## 🚀 Tecnologias Utilizadas

- React Native + Expo
- TypeScript
- React Navigation
- Async Storage
- Axios
- Xano (Backend)
- SVG & PNG assets
- Design System próprio

---

## 📱 Executando o App

### 1. Clone o projeto

git clone https://github.com/lukas-castro97/forset-app.git
cd forset-app

## 2. Instale as dependências

npm install

## 3. Inicie o projeto no simulador ou dispositivo

npx expo start

---

## 📁 Estrutura de Pastas

src/
├── components/         # Componentes reutilizáveis (botões, text fields, etc.)
├── screens/            # Telas principais (Login, Onboarding, Home...)
├── context/            # Contexto global de autenticação
├── navigation/         # Navegação do app (stack)
├── services/           # Serviços e chamadas de API
├── theme/              # Design System: cores, tipografia, tamanhos

---

## 🌿 Git Flow (Fluxo de Branches)

- main: sempre pronta para produção
- develop: ambiente de integração
- feature/nome: novas funcionalidades
- fix/nome: correções de bugs
- hotfix/nome: correção crítica em produção

### Exemplo

git checkout -b feature/onboarding
- desenvolve...
git add .
git commit -m "feat: cria onboarding"
git push origin feature/onboarding

--- 

### Arquivos ignorados

- node_modules/
- .expo/
- .expo-shared/
- ios/build/
- android/app/build/
- *.log
- .env
- .vscode/
- .DS_Store


---

# Autor

Lukas Castro
💼 Product Designer | 💻 React Native Developer
🔗 linkedin.com/in/lukas-castro

---

### 📜 Licença

Este projeto está licenciado sob a Licença MIT.

```bash