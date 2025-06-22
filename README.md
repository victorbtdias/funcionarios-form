# Cadastro de Colaboradores

Este projeto é um formulário de cadastro de funcionários com múltiplas etapas (multi-step form), desenvolvido com React, TypeScript e Material UI, com Firebase para persistência dos dados.

A aplicação está hospedada em:
🔗 https://funcionarios-form.vercel.app/

## Tecnologias Utilizadas

- [ReactJS](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [Firebase](https://firebase.google.com/)
- [React Router Dom](https://reactrouter.com/)

## Funcionalidades

- Lista de colaboradores cadastrados
- Formulário multi-etapas com navegação entre passos
- Validação de todos os campos (required)
- Feedback visual de sucesso e erro com Snackbar
- Persistência de dados em tempo real via Firebase

## Instalação e Execução Local

### 1. Clone o repositório

# HTTPS

git clone https://github.com/victorbtdias/funcionarios-form.git

# ou via SSH

git clone git@github.com:victorbtdias/funcionarios-form.git

cd funcionarios-form

### 2. Instale as dependências

npm install

### 3. Configure as variáveis de ambiente

Crie um arquivo .env na raiz do projeto com suas credenciais do Firebase.

REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=

### 4. Execute a aplicação

npm run start

Acesse em http://localhost:3000
