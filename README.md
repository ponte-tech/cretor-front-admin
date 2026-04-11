# Cretor Front

Aplicação moderna de login desenvolvida com React, TypeScript e Vite.

## Características

- **Design Moderno e Inovador**: Layout split-screen com arte interativa e formulário elegante
- **Componentes Reutilizáveis**: Sistema de componentes modulares (Button, Input)
- **Identidade Visual**: Inspirado no Magus CRM com cores vibrantes (#3E54FF, #17F8C7)
- **Responsivo**: Otimizado para desktop, tablet e mobile
- **Animações Suaves**: Transições e efeitos visuais modernos
- **TypeScript**: Type-safety em toda aplicação

## Stack Tecnológico

- React 18
- TypeScript
- Vite
- React Router DOM
- CSS Modules

## Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## Estrutura do Projeto

```
cretor-front/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.module.css
│   │   └── Input/
│   │       ├── Input.tsx
│   │       └── Input.module.css
│   ├── pages/
│   │   └── Login/
│   │       ├── LoginPage.tsx
│   │       └── LoginPage.module.css
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── daniel_krammes_art_panel.html
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Funcionalidades da Página de Login

### Layout
- **Lado Esquerdo**: Arte interativa (daniel_krammes_art_panel.html) com overlay gradiente
- **Lado Direito**: Formulário de login moderno com validação

### Recursos
- Validação de e-mail e senha em tempo real
- Toggle de visualização de senha
- Indicador visual de campo válido
- Botões de login social (Google, Facebook, GitHub)
- Link para recuperação de senha
- Link para cadastro
- Animações e transições suaves
- Responsivo para todos os dispositivos

## Paleta de Cores

- **Primary**: #3E54FF (Azul vibrante)
- **Secondary**: #17F8C7 (Cyan/Turquesa)
- **Background**: #080716 (Escuro profundo)
- **Success**: #0CD531
- **Error**: #ED2E31
- **Warning**: #F4B740

## Desenvolvimento

O projeto usa Vite para desenvolvimento rápido com Hot Module Replacement (HMR).

```bash
# Servidor de desenvolvimento roda na porta 3001
npm run dev
```

## Build

```bash
# Cria build otimizada para produção
npm run build

# Output em /dist
```

## Licença

Projeto privado - Ponte Tech
