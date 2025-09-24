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
- **HU-01 - Registro de Usuário**  
  Como visitante, quero me registrar no Music Explorer para ter acesso a funcionalidades exclusivas como salvar músicas favoritas.

- **HU-02 - Login de Usuário**  
  Como usuário registrado, quero poder fazer login para acessar minhas preferências.

- **HU-03 - Lembrete de Senha**  
  Como usuário, quero poder redefinir minha senha em caso de esquecimento.

- **HU-04 - Perfil de Usuário**  
  Como usuário autenticado, quero visualizar e editar meu perfil.

- **HU-05 - Busca de Músicas**  
  Como usuário, quero buscar músicas, artistas ou álbuns por termos e ver resultados relevantes.

- **HU-06 - Favoritos**  
  Como usuário, quero marcar músicas como favoritas e acessá-las depois.

- **HU-07 - Player de Preview**  
  Como usuário, quero ouvir trechos de músicas dentro da aplicação.

- **HU-08 - Tela de Detalhes**  
  Como usuário, quero visualizar detalhes de um artista, álbum ou música.

- **HU-09 - Responsividade e Interatividade Mobile**  
  Como usuário em dispositivos móveis, quero ter uma experiência fluida com design responsivo e interações por gestos.

# 📌 Backlog Inicial

## Sprint 1 — Setup e Autenticação
- Configurar repositório GitHub.  
- Configurar Firebase Hosting.  
- Configurar Supabase (Auth + tabelas).  
- Implementar **HU-01 (Registro)**.  
- Implementar **HU-02 (Login)**.  
- Implementar **HU-03 (Lembrete de senha)**.  
- Implementar **HU-04 (Perfil)**.  

## Sprint 2 — Busca e Resultados
- Implementar **HU-05 (Busca por termo)**.  
- Criar listagem de resultados com UI responsiva.  
- Implementar **HU-08 (Tela de Detalhes)**.  

## Sprint 3 — Favoritos e Player
- Implementar **HU-06 (Favoritos)**.  
- Implementar **HU-07 (Player de preview)**.  
- Sincronizar favoritos com usuário logado.  
- Swipe para remover favorito (**HU-09**).  

## Sprint 4 — UX, Responsividade e Deploy
- Implementar **HU-09 (Responsividade)**.  
- Ajustes de UX/UI.  
- Deploy final.  
- Preparar apresentação final.
