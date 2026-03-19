# DevPortal — Microfrontend Architecture

Plataforma corporativa construída com **Module Federation** (React + Vite + TypeScript).

---

## Arquitetura da Solução

```
devportal/
├── host/                  → Shell App        (localhost:3000)
├── remote-dashboard/      → Remote Dashboard (localhost:3001)
├── remote-users/          → Remote Users     (localhost:3002)
└── remote-reports/        → Remote Reports   (localhost:3003)
```

```
┌─────────────────────────────────────────────┐
│              HOST (Port 3000)               │
│  ┌──────────┐  ┌────────────────────────┐   │
│  │ Sidebar  │  │   <DashboardRemote />  │ ← │── remoteDashboard/Dashboard
│  │          │  │   <UsersRemote />      │ ← │── remoteUsers/Users
│  └──────────┘  │   <ReportsRemote />   │ ← │── remoteReports/Reports
│                └────────────────────────┘   │
└─────────────────────────────────────────────┘
```

---

## Rotas Disponíveis

| App | Rota | Descrição |
|---|---|---|
| Host | `localhost:3000/` | Home com cards dos módulos |
| Host | `localhost:3000/dashboard` | Carrega Dashboard via Module Federation |
| Host | `localhost:3000/users` | Carrega Users via Module Federation |
| Host | `localhost:3000/reports` | Carrega Reports via Module Federation |
| Remote Dashboard | `localhost:3001/` | Dashboard standalone |
| Remote Dashboard | `localhost:3001/activity` | Log de atividades (lazy loaded) |
| Remote Users | `localhost:3002/` | Usuários standalone |
| Remote Users | `localhost:3002/roles` | Cargos e permissões (lazy loaded) |
| Remote Reports | `localhost:3003/` | Relatórios standalone |

---

## Como Rodar

### Pré-requisitos
- Node.js 18+
- npm 9+

### Passo 1 — Instalar dependências

```bash
# Em terminais separados:
cd host && npm install
cd remote-dashboard && npm install
cd remote-users && npm install
cd remote-reports && npm install
```

### Passo 2 — Subir a API Fake

O projeto usa `json-server` para simular uma API REST a partir do `db.json` na raiz.

```bash
# Terminal 1 — API Fake (qualquer remote com json-server instalado)
cd remote-dashboard
npm run api     # serve em localhost:3100
```

Endpoints disponíveis:

| Endpoint | Descrição |
|---|---|
| `GET localhost:3100/stats` | Cards de estatísticas |
| `GET localhost:3100/activities` | Log de atividades |
| `GET localhost:3100/builds` | Histórico de builds |
| `GET localhost:3100/users` | Lista de usuários |
| `GET localhost:3100/reports` | Relatórios de sprint |

### Passo 3 — Build e Preview dos Remotes

> **Importante:** `@originjs/vite-plugin-federation` exige build antes de servir.

```bash
# Terminal 2 — Remote Dashboard
cd remote-dashboard
npm run build
npm run preview     # serve em localhost:3001

# Terminal 3 — Remote Users
cd remote-users
npm run build
npm run preview     # serve em localhost:3002

# Terminal 4 — Remote Reports
cd remote-reports
npm run build
npm run preview     # serve em localhost:3003
```

### Passo 4 — Rodar o Host

```bash
# Terminal 5 — Host
cd host
npm run dev         # serve em localhost:3000
```

Acesse: **http://localhost:3000**

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18.x | Framework UI |
| Vite | 5.x | Build tool |
| TypeScript | 5.x | Tipagem estática |
| @originjs/vite-plugin-federation | 1.3.x | Module Federation |
| React Router DOM | 6.x | Roteamento |
| Tailwind CSS | 3.x | Estilização |

---

## Conceitos React Demonstrados

### useReducer (GlobalContext.tsx + useUsers.ts)
- Estado global do host gerenciado com `useReducer`
- Filtros de usuários com `useReducer` no remote-users

### useMemo (useDashboard.ts + useUsers.ts)
- Filtragem de stats do dashboard memoizada
- Lista de usuários filtrada memoizada

### useCallback (Sidebar.tsx + useUsers.ts)
- Handlers de navegação memoizados
- Setters de filtro memoizados no hook de usuários

### memo (StatsCard, ActivityItem, UserSearch)
- Componentes de lista com `React.memo` para evitar re-renders

### Lazy + Suspense (DashboardRemotePage, UsersRemotePage, ReportsRemotePage)
- Carregamento dinâmico dos remotes com fallback de loading

### Error Boundary (DashboardRemotePage, UsersRemotePage, ReportsRemotePage)
- Tratamento gracioso quando remote está offline

---

## Decisões Técnicas

### Por que Vite + `@originjs/vite-plugin-federation`?
- Vite oferece HMR rápido e build otimizado
- O plugin implementa a spec do Webpack Module Federation para Vite
- Configuração simples com suporte a `shared` modules

### Por que React 18 + Context API em vez de Redux?
- Para esta escala, Context + useReducer é suficiente
- Evita dependência extra (redux, zustand)
- Demonstra uso correto de hooks avançados

### Por que dados mockados em arquivos `.ts`?
- Isolamento total do frontend
- Tipagem TypeScript completa nos dados
- Fácil substituição por chamadas de API reais

### Por que `bootstrap.tsx` + `main.tsx` separados?
- Padrão obrigatório para Module Federation funcionar
- Evita eager loading que quebra o carregamento dinâmico de módulos

---

## Benefícios da Arquitetura MFE

1. **Autonomia por squad** — cada time faz build e deploy independente
2. **Isolamento de falhas** — se um remote cair, o host continua funcionando
3. **Tecnologia agnóstica** — cada remote poderia usar um framework diferente
4. **Lazy loading nativo** — módulos são carregados sob demanda
5. **Escalabilidade** — novos módulos são adicionados sem alterar o host

---

## Estrutura de Arquivos Detalhada

```
host/src/
├── App.tsx                    # Router + GlobalProvider
├── bootstrap.tsx              # Entry point (padrão MFE)
├── main.tsx                   # Dynamic import do bootstrap
├── index.css                  # Tailwind base
├── types.ts                   # Tipos globais do host
├── context/
│   └── GlobalContext.tsx      # useReducer global state
├── components/
│   ├── Layout.tsx             # Shell layout
│   └── Sidebar.tsx            # Navegação com useCallback
├── pages/
│   ├── HomePage.tsx           # Landing com cards de módulos
│   ├── DashboardRemotePage.tsx  # Lazy + Suspense + ErrorBoundary
│   ├── UsersRemotePage.tsx      # Lazy + Suspense + ErrorBoundary
│   └── ReportsRemotePage.tsx    # Lazy + Suspense + ErrorBoundary
└── types/
    └── remotes.d.ts           # Type declarations dos remotes

remote-dashboard/src/
├── types.ts                   # Tipos do remote-dashboard
├── services/dashboardService.ts  # Serviço de dados
├── hooks/useDashboard.ts      # useMemo + useCallback
├── components/
│   ├── StatsCard.tsx          # memo component
│   └── RecentActivity.tsx     # memo component
└── pages/
    ├── DashboardPage.tsx      # Página exposta via MFE
    └── ActivityPage.tsx       # Log de atividades (lazy)

remote-users/src/
├── types.ts                   # Tipos do remote-users
├── services/usersService.ts   # Serviço de dados
├── data/usersData.ts          # Mock de 15 usuários
├── hooks/useUsers.ts          # useReducer + useMemo + useCallback
├── components/
│   └── UserSearch.tsx         # memo component
└── pages/
    ├── UsersPage.tsx          # Página exposta via MFE
    └── RolesPage.tsx          # Cargos e permissões (lazy)

remote-reports/src/
├── types.ts                   # Tipos do remote-reports
├── services/reportsService.ts # Serviço de dados
├── data/reportsData.ts        # Mock de 15 relatórios
├── hooks/useReports.ts        # Filtragem e paginação
├── components/
│   └── DailyChart.tsx         # Gráfico de barras com filtros
└── pages/
    └── ReportsPage.tsx        # Página exposta via MFE
```
