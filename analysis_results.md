# 🔍 Análise Completa — Site ONG GARRA Marília

## Visão Geral

O site é composto por **4 páginas HTML** (`index.html`, `animais.html`, `doacao.html`, `contact.html`) com um design bem estruturado, tema claro/escuro, animações AOS, carrossel Swiper e conteúdo dinâmico de animais. O projeto está **~75% completo**, mas há problemas significativos que impedem que ele funcione corretamente como um site profissional e finalizado.

---

## 🔴 Problemas Críticos (Devem ser corrigidos)

### 1. Formulários Sem Backend Real
| Formulário | Página | Status |
|---|---|---|
| Formulário de Contato | `contact.html` | ⚠️ Redireciona para WhatsApp — funcional, mas sem armazenamento |
| Formulário do Voluntário | `index.html` | ❌ `action="#"` — **não faz nada ao enviar** |
| Newsletter (todas as páginas) | Footer | ❌ `method="post"` sem `action` — **não faz nada** |

> [!CAUTION]
> Os formulários de voluntário e newsletter **não funcionam**. O usuário preenche e clica "Enviar" mas nada acontece. Precisa de um backend (EmailJS, Formspree, Google Forms, etc.) ou pelo menos redirecionamento para WhatsApp.

---

### 2. Botões Não Funcionais (Links Mortos)
| Botão | Página | Problema |
|---|---|---|
| "Apadrinhar" (navbar) | Todas as páginas internas | `href="#all-animals"` — seção não existe em `contact.html` e `doacao.html` |
| "Adotar" (navbar) | Todas as páginas internas | Mesmo problema |
| "Voluntariar" (sidebar) | Todas | Sem `href`, não faz nada |
| "Doar" (sidebar) | Todas | Sem `href`, não faz nada |
| Botões "Adotar" e "Apadrinhar" nos cards de animais | `index.html` e `animais.html` | **Sem ação definida** — não abrem WhatsApp nem formulário |
| "Doar Ração" / "Contribuir" / "Doar Materiais" | `index.html` (#needs) | **Sem ação definida** |
| "Ver Relatório Completo" | `index.html` (#transparency) | **Sem ação definida** |
| "Copiar Código Pix" | `doacao.html` | Botão sem `onclick` — **não copia** |
| Links "Ver no Instagram" / "Ver no Facebook" | `index.html` (#impact) | `href="#"` — **links mortos** |

> [!WARNING]
> Mais de **15 botões** no site não fazem absolutamente nada ao clicar. Isso prejudica severamente a experiência do usuário.

---

### 3. Dados Fictícios/Inconsistentes nos Modais
No arquivo [modal.js](file:///c:/Users/DELL/OneDrive/Documentos/garra/src/services/modal.js):

- **Transferência Bancária**: Agência `1234-5`, Conta `12345-6`, CNPJ `12.345.678/0001-90` — são **dados placeholder**, não reais
- **WhatsApp no modal cartão**: `(11) 98765-4321` — número **fictício**, deveria ser `(14) 99827-7874`
- O modal `title` é definido mas **nunca é inserido no HTML** (`.modal-header` fica vazio)

---

### 4. Erros de Conteúdo no HTML

| Arquivo | Linha | Erro |
|---|---|---|
| [index.html](file:///c:/Users/DELL/OneDrive/Documentos/garra/index.html#L611) | 611 | Gabriel é "Macho" mas a tag diz `Cachorra` |
| [index.html](file:///c:/Users/DELL/OneDrive/Documentos/garra/index.html#L613) | 613 | "Maho" deveria ser "Macho" (typo) |
| [index.html](file:///c:/Users/DELL/OneDrive/Documentos/garra/index.html#L557) | 557 | Madonna está como "2 anos" no index, mas "12 anos" no data-animals.js |
| [doacao.html](file:///c:/Users/DELL/OneDrive/Documentos/garra/doacao.html#L310) | 310 | "enviarmoos" → "enviarmos" (typo) |
| [contact.html](file:///c:/Users/DELL/OneDrive/Documentos/garra/contact.html#L222) | 222 | Período "2014 - 2025" — deveria ser atualizado (estamos em 2026) |
| [data-animals.js](file:///c:/Users/DELL/OneDrive/Documentos/garra/src/services/data-animals.js#L269) | 269 | Babinha tem `idade: "Cachorro"` — deveria ser a idade real |

---

### 5. Animais Faltando na Lista
O diretório `src/assets/animais/` contém **43 imagens**, mas [data-animals.js](file:///c:/Users/DELL/OneDrive/Documentos/garra/src/services/data-animals.js) lista apenas **41 animais**. Imagens não listadas:
- `6 - Penny - +10 anos.png`
- `43 - Zimba - 6 anos.png` (existe um Zimba de 10 anos, mas não o de 6)

---

### 6. Inconsistência na Propriedade `classe` (Case-sensitivity)
No [data-animals.js](file:///c:/Users/DELL/OneDrive/Documentos/garra/src/services/data-animals.js), a propriedade `classe` alterna entre:
- `"cachorro"` (minúsculo) → maioria
- `"Cachorro"` (capitalizado) → Piolho, Risquinho, Retalho
- `"gato"` (minúsculo) → Oreo
- `"Gato"` (capitalizado) → Getúlio

Isso **quebra filtros** que comparam strings case-sensitive.

---

## 🟡 Problemas Importantes (Impactam qualidade)

### 7. SEO — Sitemap Incompleto
O [sitemap.xml](file:///c:/Users/DELL/OneDrive/Documentos/garra/sitemap.xml) lista **apenas a homepage**. Faltam:
```xml
<url><loc>https://garramarilia.vercel.app/animais.html</loc></url>
<url><loc>https://garramarilia.vercel.app/doacao.html</loc></url>
<url><loc>https://garramarilia.vercel.app/contact.html</loc></url>
```

### 8. SEO — URL Canônica Errada
- [contact.html](file:///c:/Users/DELL/OneDrive/Documentos/garra/contact.html#L31) define `canonical` como `contato-abrigo.html`, mas o arquivo real é `contact.html`
- O `og:url` também aponta para `contato-abrigo.html`

### 9. OG Image com Path Relativo
Todas as páginas usam `content="src/assets/logo-oficial-garra.jpg"` para `og:image`. Deveria ser uma **URL absoluta**: `https://garramarilia.vercel.app/src/assets/logo-oficial-garra.jpg`

### 10. Imagens Muito Pesadas
Algumas imagens são extremamente grandes para a web:

| Arquivo | Tamanho |
|---|---|
| `13-Matt-3-anos.png` | **12.6 MB** |
| `3-Tobias-4-anos.png` | **13 MB** |
| `31-Babinha.png` | **11.4 MB** |
| `36-Maiki-4-anos.png` | **9.5 MB** |
| `4-Choquito-11-anos.png` | **6.6 MB** |

> [!WARNING]
> O total da pasta de animais é ~**70 MB**. Isso causa carregamento extremamente lento na página de animais. Recomendado: comprimir para WebP, máximo ~200KB cada.

### 11. HTML Semântico — IDs Duplicados
- `id="accordionHeader"` e `id="accordionContent"` são repetidos no sidebar e footer de **todas as páginas**. IDs devem ser únicos por documento.
- O script [accordion.js](file:///c:/Users/DELL/OneDrive/Documentos/garra/src/scripts/accordion.js) provavelmente só funciona para a **primeira ocorrência**.

### 12. Filtro de Animais Comentado/Desativado
Em [animais.html](file:///c:/Users/DELL/OneDrive/Documentos/garra/animais.html#L167-L189), o formulário de filtro por tipo de animal e sexo está **totalmente comentado**. O arquivo [filtro.js](file:///c:/Users/DELL/OneDrive/Documentos/garra/src/scripts/filtro.js) existe mas não pode funcionar sem o HTML.

### 13. Acessibilidade
- Botões dentro de `<a>` tags (ex: `<a href="..."><button>Adotar</button></a>`) — é **HTML inválido**
- Ícones de redes sociais no `contact.html` usam `material-symbols-outlined` genéricos (`chat`, `mail`) ao invés de ícones das redes sociais reais
- Falta `aria-label` em vários botões de ícone

---

## 🟢 Melhorias Sugeridas (Para 100%)

### 14. UX — Feedback ao Usuário
- Substituir `alert()` por toasts/notificações visuais bonitas no envio de formulários e cópia de dados
- Adicionar estados de loading nos botões de formulário
- Adicionar confirmação visual ao copiar chave Pix

### 15. Funcionalidades Faltando
- **Botão WhatsApp flutuante**: comum em sites de ONG, facilita contato rápido
- **Página 404**: não existe — URLs erradas mostram erro genérico
- **Schema.org / JSON-LD**: dados estruturados para SEO (tipo Organization, NGO)
- **Política de Privacidade / Termos**: mencionados indiretamente na newsletter mas não existem

### 16. Performance
- `transition: all 250ms ease-in-out` no seletor `*` em [global.css](file:///c:/Users/DELL/OneDrive/Documentos/garra/src/styles/global.css#L22) — causa lentidão em **toda interação** da página
- Google Material Symbols carrega **todos os ícones** (~2MB) mesmo usando poucos. Considerar ícones SVG inline
- CSS usa `@import` em cascata (17 arquivos) — bloqueia renderização. Considerar concatenar

### 17. Copyright Desatualizado
Todas as páginas mostram `© 2025` no footer — deveria ser `© 2025 - 2026` ou dinâmico com JavaScript.

---

## 📊 Resumo — Checklist para 100%

| # | Tarefa | Prioridade | Complexidade |
|---|---|---|---|
| 1 | Corrigir formulário do voluntário (enviar via WhatsApp ou EmailJS) | 🔴 Alta | Baixa |
| 2 | Corrigir formulário da newsletter (integrar com serviço) | 🔴 Alta | Média |
| 3 | Conectar botões "Adotar"/"Apadrinhar" dos cards ao WhatsApp | 🔴 Alta | Baixa |
| 4 | Corrigir dados fictícios nos modais (banco, WhatsApp) | 🔴 Alta | Baixa |
| 5 | Implementar "Copiar Código Pix" | 🔴 Alta | Baixa |
| 6 | Corrigir links mortos (`href="#"`) nos stories de impacto | 🔴 Alta | Baixa |
| 7 | Corrigir erros de texto (typos, idades, gêneros) | 🔴 Alta | Baixa |
| 8 | Adicionar animais faltantes (Penny, Zimba 6 anos) | 🟡 Média | Baixa |
| 9 | Normalizar `classe` no data-animals.js (tudo minúsculo) | 🟡 Média | Baixa |
| 10 | Comprimir imagens de animais (WebP, <200KB) | 🟡 Média | Média |
| 11 | Completar sitemap.xml com todas as páginas | 🟡 Média | Baixa |
| 12 | Corrigir URL canônica e og:url em contact.html | 🟡 Média | Baixa |
| 13 | Corrigir og:image para URL absoluta | 🟡 Média | Baixa |
| 14 | Corrigir IDs duplicados (accordion) | 🟡 Média | Média |
| 15 | Reativar/implementar filtro de animais | 🟡 Média | Média |
| 16 | Conectar botões do sidebar (Voluntariar, Doar) | 🟡 Média | Baixa |
| 17 | Conectar botões de necessidades (Doar Ração, etc.) | 🟡 Média | Baixa |
| 18 | Remover `transition: all` do seletor `*` | 🟢 Baixa | Baixa |
| 19 | Adicionar botão WhatsApp flutuante | 🟢 Baixa | Baixa |
| 20 | Criar página 404 | 🟢 Baixa | Baixa |
| 21 | Substituir alerts por toasts visuais | 🟢 Baixa | Média |
| 22 | Atualizar copyright para 2026 | 🟢 Baixa | Baixa |
| 23 | Corrigir HTML inválido (button dentro de a) | 🟢 Baixa | Baixa |
| 24 | Adicionar Schema.org JSON-LD | 🟢 Baixa | Média |
| 25 | Inserir título no modal (modal-header vazio) | 🟢 Baixa | Baixa |

---

> [!TIP]
> Se quiser, posso começar a implementar essas correções! Recomendo atacar primeiro os itens **🔴 Alta prioridade** — são os que mais impactam a experiência do usuário e são relativamente simples de resolver.
