# SPY WHATSAPP

Réplica visual e interativa de um app de mensagens para desktop (tema escuro), feita só com HTML, CSS e JavaScript puro.
**Interface front-end:** não se conecta a um serviço de mensagens e não possui backend nem login. Os contatos e as
conversas são fictícios e ficam armazenados neste navegador.

## Como iniciar

**Opção 1:** dê dois cliques em `index.html` (abre direto no navegador, sem instalar nada).

**Opção 2:** sirva a pasta localmente:

```powershell
python -m http.server 8080
```

Depois abra http://localhost:8080.

## Suas imagens

As imagens não vêm no projeto: há espaços prontos que carregam os seus arquivos `.jpg`. Se um arquivo não existir,
o espaço fica vazio (fotos) ou mostra a silhueta padrão (perfis).

**Fotos de perfil** — pasta `avatars/`:

| Contato | Arquivo |
| --- | --- |
| Riley | `sophie.jpg` |
| The Weekend Crew | `crew.jpg` |
| Jordan | `ethan.jpg` |
| Morgan | `olivia.jpg` |
| Parker | `noah.jpg` |
| Mom | `grace.jpg` |
| Dad | `dad.jpg` |
| Drew | `daniel.jpg` |
| Casey | `mia.jpg` |
| Book Club 📚 | `bookclub.jpg` |
| Maple Street Neighbors | `neighbors.jpg` |
| Logan | `lucas.jpg` |
| Avery | `ava.jpg` |
| Seu perfil (barra lateral) | `me.jpg` |

**Fotos nas conversas** — pasta `img/` (aparecem com desfoque):

| Conversa | Arquivos |
| --- | --- |
| Riley | `sunset.jpg` |
| The Weekend Crew | `cabin.jpg`, `lake.jpg` |
| Jordan | `game.jpg`, `meme.jpg` |
| Morgan | `chart.jpg` |
| Parker | `latte.jpg` |
| Mom | `cookies.jpg` |

## Estrutura

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Esqueleto da página |
| `css/styles.css` | Tema, layout e responsividade |
| `js/data.js` | Contatos e conversas fictícias (separados da interface) |
| `js/components.js` | Componentes reutilizáveis (item da lista, balões, áudio, cabeçalho, etc.) |
| `js/app.js` | Estado, renderização e interações |
| `js/icons.js` | Ícones SVG |
| `js/assets.js` | Ilustrações SVG antigas (não usadas atualmente) |

## O que funciona

- Abrir conversas: destaca o contato, marca como lida e mostra o divisor de mensagens não lidas.
- Pesquisar por nome e filtrar por **All / Unread / Favorites / Groups**, com estados vazios.
- Menu de cada conversa (seta ao passar o mouse, botão direito ou Shift+F10): marcar como lida/não lida, favoritar, fixar, silenciar.
- Mensagens de texto, fotos, fotos de visualização única e áudios com forma de onda.
- Teclado: ↑/↓ navegam pela lista, Esc fecha a conversa ou limpa a busca, menus navegáveis por setas.
- Em telas pequenas (< 760px) a navegação vai para a barra inferior e a conversa abre em tela cheia com botão de voltar.

## O que está bloqueado

Estes elementos mostram o cursor de bloqueado e não fazem nada ao clicar:

- Barra de mensagem (não é possível digitar nem enviar), anexos, emoji e microfone.
- Fotos, fotos de visualização única e áudios (não abrem nem tocam).
- Itens da barra lateral, exceto Chats (ligações, status, canais, comunidades, configurações, etc.).
- Botões "+" e ⋮ do topo da lista, seta de mais filtros e botões da tela inicial.
- Cabeçalho da conversa: vídeo, ligação, busca, menu e dados do contato.

Recarregar a página restaura os dados originais.
