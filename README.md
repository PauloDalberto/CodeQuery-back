# Backend - Sistema de Conversas com IA e Integração com Repositórios do GitHub

Este repositório contém a API REST do sistema de conversas com IA, permitindo que usuários interajam com inteligência artificial sobre seus repositórios públicos do GitHub. A aplicação conta com autenticação via JWT, controle de conversas, integração com APIs externas (Gemini e GitHub) e uso de banco de dados relacional com PostgreSQL via TypeORM.

---

##  Funcionalidades

-  **Autenticação segura com JWT**
-  **Cadastro e login de usuários**
-  **Criação e gerenciamento de conversas com IA**
-  **Associação de repositórios e arquivos a cada conversa**
-  **Interação com IA para aprendizado e desafios técnicos**
-  **Integração com API Gemini (IA)**
-  **Integração com GitHub para leitura de repositórios públicos**

---

##  Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript no backend
- **Express.js** – Framework para criação de APIs REST
- **TypeORM** – ORM para gerenciamento do banco de dados relacional
- **PostgreSQL** – Banco de dados relacional robusto e escalável
- **JWT (JSON Web Token)** – Sistema de autenticação baseado em tokens
- **Gemini API** – Plataforma de IA para geração de conteúdo
- **GitHub API** – Integração com repositórios públicos do usuário

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-backend.git
cd seu-backend
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure o ambiente

```bash
# Variáveis do banco de dados
DB_NAME=nome_do_banco
DB_USER=usuario_do_banco
DB_PASS=senha_do_banco
DB_HOST=localhost
DB_PORT=porta_do_banco

# Autenticação
JWT_PASS=sua_chave_secreta

# APIs externas
GEMINI_API_KEY=sua_chave_da_gemini
GITHUB_TOKEN=seu_token_do_github
```

### 4. Rode o projeto

```bash
npm run dev
# ou
yarn dev
```

Veja a parte Front End da aplicação aqui: [https://github.com/PauloDalberto/CodeQuery-front.git](https://github.com/PauloDalberto/CodeQuery-front)
