
# 🌟 Automação de Testes com Cypress 🚀

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:  

- 🖥️ [Node.js](https://nodejs.org/) (recomendado LTS)  
- 📦 [npm](https://www.npmjs.com/) (vem com o Node.js)  
- 🛠️ [Git](https://git-scm.com/)  

> **Dica:** Use as versões mais recentes para evitar problemas de compatibilidade! 🚀

---

## ⚙️ Instalação

1️⃣ Clone este repositório:

```bash
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
```

2️⃣ Instale as dependências:

```bash
npm install
```

---

## 🧪 Como Rodar os Testes

### ▶️ Modo Interativo (Cypress Runner)

Execute o seguinte comando para abrir o Cypress Runner:

```bash
npm run cy:open
```

### 🌀 Modo Headless

Execute todos os testes diretamente no terminal:

```bash
npm run cy:run
```

### 📱 Simulando Dispositivo Móvel

#### Modo Interativo:

```bash
npm run cy:open:mobile
```

#### Modo Headless:

```bash
npm run cy:run:mobile
```

---

## 🗂️ Estrutura do Projeto

📁 **cypress/fixtures**: Arquivos de dados usados nos testes  
📁 **cypress/integration**: Arquivos contendo os testes  
📁 **cypress/support**: Comandos customizados e configurações do Cypress  
📁 **videos/**: Vídeos gerados durante a execução dos testes em modo _headless_  

---

## 💡 Dica Extra

🔒 Crie uma cópia do arquivo `cypress.env.example.json` como `cypress.env.json` antes de rodar os testes.  
Isso garante que informações sensíveis, como credenciais, não sejam versionadas!  

---

## ❤️ Apoie Este Projeto

🌟 **Gostou?** Deixe uma estrela neste repositório!  
📢 **Compartilhe!** Mostre para sua rede no LinkedIn.  

Criado com 💚 por [Seu Nome](https://seu-portfolio.dev)
```

Esse é o código completo em um bloco só, pronto para ser copiado no seu `README.md`.