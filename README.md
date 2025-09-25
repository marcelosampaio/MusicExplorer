# 📌 Definição do Projeto
O **Music Explorer** é uma aplicação web desenvolvida em **ReactJS**, hospedada no **Firebase**, que consome a **API do iTunes Search** para permitir buscas por músicas, artistas e álbuns.  
O sistema conta com **login e registro via Supabase**, além de **gerenciamento de favoritos** e **player de preview**.

# 🎯 Escopo e Objetivos
- **Autenticação de usuários** (registro, login, lembrete de senha, perfil).  
- **Busca de músicas, artistas e álbuns** na iTunes API (por termo).  
- **Player embutido** para previews.  
- **Favoritos persistentes** por usuário.  
- **UI responsiva** para web e mobile.  

# 👤 Histórias de Usuário

## 📊 Priorização
- **Fase 1 (MVP da aplicação):**  
  - HU-05 — Busca de Músicas  
  - HU-07 — Player de Preview  
  - HU-09 — Responsividade Mobile  

- **Fase 2 (Interatividade adicional):**  
  - HU-06 — Favoritos  
  - HU-08 — Tela de Detalhes  
  - HU-10 — Persistência de Favoritos no Supabase  

- **Fase 3 (Autenticação e perfil):**  
  - HU-01 — Registro de Usuário  
  - HU-02 — Login de Usuário  
  - HU-03 — Lembrete de Senha  
  - HU-04 — Perfil de Usuário  

---

## HU-01 — Registro de Usuário  
*Como visitante, quero me registrar no Music Explorer para ter acesso a funcionalidades exclusivas como salvar músicas favoritas.*  

**✅ Critérios de Aceitação:**  
- O formulário deve solicitar e validar nome, e-mail e senha.  
- Após registro bem-sucedido, o usuário deve ser redirecionado para a área autenticada.  

---

## HU-02 — Login de Usuário  
*Como usuário registrado, quero poder fazer login para acessar minhas preferências.*  

**✅ Critérios de Aceitação:**  
- O login deve aceitar e-mail e senha cadastrados.  
- Mensagem de erro exibida em caso de credenciais inválidas.  
- Após login, usuário acessa seu perfil e favoritos.  

---

## HU-03 — Lembrete de Senha  
*Como usuário, quero redefinir minha senha em caso de esquecimento para continuar acessando minha conta.*  

**✅ Critérios de Aceitação:**  
- Link “Esqueci minha senha” disponível na tela de login.  
- Usuário deve receber instruções de redefinição.  

---

## HU-04 — Perfil de Usuário  
*Como usuário autenticado, quero visualizar e editar meu perfil para manter meus dados atualizados.*  

**✅ Critérios de Aceitação:**  
- Exibir nome, e-mail e foto de perfil.  
- Permitir alteração de dados pessoais (nome e senha).  

---

## HU-05 — Busca de Músicas  
*Como usuário, quero buscar músicas, artistas ou álbuns por termos para encontrar rapidamente o que desejo ouvir.*  

**✅ Critérios de Aceitação:**  
- Campo de busca funcional.  
- Resultados exibidos em lista de cartões (`MusicCard`).  
- Feedback visual quando não houver resultados.  

---

## HU-06 — Favoritos  
*Como usuário, quero marcar músicas como favoritas e acessá-las depois para ouvir novamente.*  

**✅ Critérios de Aceitação:**  
- Botão de favoritar em cada música.  
- Lista separada de favoritos disponível no menu.  
- Alterações refletidas na interface imediatamente.  

---

## HU-07 — Player de Preview  
*Como usuário, quero ouvir trechos de músicas dentro da aplicação para decidir se gosto da faixa.*  

**✅ Critérios de Aceitação:**  
- Player integrado em cada cartão de música.  
- Botão de play/pause funcional.  
- Reproduzir preview direto da API do iTunes.  

---

## HU-08 — Tela de Detalhes  
*Como usuário, quero visualizar detalhes de um artista, álbum ou música para conhecer mais informações.*  

**✅ Critérios de Aceitação:**  
- Ao clicar em um item, abrir tela/detalhe.  
- Exibir capa, título, artista e informações adicionais.  

---

## HU-09 — Responsividade e Interatividade Mobile  
*Como usuário em dispositivos móveis, quero ter uma experiência fluida com design responsivo e interações por gestos.*  

**✅ Critérios de Aceitação:**  
- Layout Mobile-First.  
- Componentes adaptáveis a diferentes tamanhos de tela.  
- Menu e botões acessíveis via toque.  

---

## HU-10 — Persistência de Favoritos no Supabase  
*Como usuário autenticado, quero que minhas músicas favoritas sejam salvas no Supabase, para que eu possa acessá-las em qualquer dispositivo.*  

**✅ Critérios de Aceitação:**  
- Apenas usuários autenticados podem salvar/excluir favoritos.  
- Favoritos gravados no banco de dados Supabase.  
- Lista de favoritos carregada automaticamente ao fazer login.  
- Alterações (adicionar/remover) refletidas tanto na interface quanto no Supabase.  
