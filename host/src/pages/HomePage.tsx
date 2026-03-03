import { Link } from 'react-router-dom'
import { useGlobal } from '../context/GlobalContext'

const modules = [
  {
    path: '/dashboard',
    title: 'Métricas da Plataforma',
    icon: '📊',
    iconBgClass: 'bg-gradient-to-br from-violet-600 to-indigo-600',
    linkClass: 'text-violet-600',
    stats: [
      { label: 'Deploys hoje:', value: '12', bold: false },
      { label: 'Build time médio:', value: '1m32s', bold: true },
      { label: 'Falhas:', value: '2', bold: false },
    ],
  },
  {
    path: '/users',
    title: 'Membros do Time',
    icon: '👥',
    iconBgClass: 'bg-gradient-to-br from-emerald-600 to-emerald-700',
    linkClass: 'text-emerald-600',
    stats: [
      { label: '42 usuários ativos', value: '', bold: false },
      { label: 'Novo hoje:', value: '7', bold: false },
      { label: 'Atualização:', value: '3m atrás', bold: false },
    ],
  },
  {
    path: '/reports',
    title: 'Relatórios de Engenharia',
    icon: '📋',
    iconBgClass: 'bg-gradient-to-br from-amber-600 to-amber-700',
    linkClass: 'text-amber-600',
    stats: [
      { label: 'Relatórios de squads', value: '', bold: false },
      { label: 'Issues abertas:', value: '8', bold: false },
      { label: 'Cycle time médio:', value: '3d 5h', bold: false },
    ],
  },
]

const recentActivity = [
  { id: 1, type: 'success', text: 'Deploy concluído na',    highlight: 'dashboard-app', time: 'há 2 min'  },
  { id: 2, type: 'user',    text: 'Roberta Almeida adicionada', highlight: '',          time: 'há 15 min' },
  { id: 3, type: 'error',   text: 'Erro detectado na',     highlight: 'reports-app',   time: 'há 35 min' },
]

const remotes = [
  { name: 'dashboard-app', port: ':3001', status: 'Online',   dotClass: 'bg-green-500',  textClass: 'text-green-500'  },
  { name: 'users-app',     port: ':3002', status: 'Online',   dotClass: 'bg-green-500',  textClass: 'text-green-500'  },
  { name: 'reports-app',   port: ':3003', status: 'Instável', dotClass: 'bg-amber-500',  textClass: 'text-amber-500'  },
  { name: 'alerts-app',    port: ':3004', status: 'Offline',  dotClass: 'bg-red-500',    textClass: 'text-red-500'    },
]

const activityIcon = {
  success: { symbol: '✓', containerClass: 'bg-green-50 text-green-700'   },
  user:    { symbol: '👤', containerClass: 'bg-zinc-100 text-stone-500'   },
  error:   { symbol: '⚠', containerClass: 'bg-red-50 text-red-600'       },
}

export default function HomePage() {
  const { state } = useGlobal()
  const firstName = state.user.name.split(' ')[0]

  return (
    <div className="max-w-4xl mx-auto py-2 space-y-6">
      <div>
        <p className="text-sm mb-1 text-stone-500">
          Bem-vinda de volta, {firstName} 👋
        </p>
        <h1 className="font-black text-3xl tracking-tight text-[#0c0c0f]">
          Portal de Engenharia
        </h1>
        <p className="text-sm mt-1 text-stone-400">
          Dashboard de módulos e métricas da plataforma
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modules.map((mod) => (
          <div
            key={mod.path}
            className="rounded-2xl p-5 bg-white border border-stone-200"
          >
            <div className="mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${mod.iconBgClass}`}>
                {mod.icon}
              </div>
            </div>

            <h3 className="font-black text-base mb-3 text-[#0c0c0f]">
              {mod.title}
            </h3>

            <div className="space-y-1.5 mb-4">
              {mod.stats.map((s, i) => (
                <p key={i} className="text-sm text-stone-500">
                  {s.label}{' '}
                  {s.value && (
                    <span className={`text-[#0c0c0f] ${s.bold ? 'font-black' : 'font-semibold'}`}>
                      {s.value}
                    </span>
                  )}
                </p>
              ))}
            </div>

            <Link to={mod.path} className={`text-sm font-semibold ${mod.linkClass}`}>
              Acessar →
            </Link>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-5 bg-[#0c0c0f] border border-[#1c1c22]">
          <h3 className="text-white font-bold text-sm mb-4">Atividade Recente</h3>
          <div className="space-y-3">
            {recentActivity.map((item) => {
              const icon = activityIcon[item.type as keyof typeof activityIcon]
              return (
                <div key={item.id} className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 ${icon.containerClass}`}>
                    {icon.symbol}
                  </span>
                  <p className="flex-1 text-sm text-stone-400">
                    {item.text}{' '}
                    {item.highlight && (
                      <span className="font-bold text-white">{item.highlight}</span>
                    )}
                  </p>
                  <span className="font-mono text-xs shrink-0 text-zinc-700">
                    {item.time}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl p-5 bg-[#0c0c0f] border border-[#1c1c22]">
          <h3 className="text-white font-bold text-sm mb-1">Arquitetura do Portal</h3>
          <p className="font-mono text-xs mb-4 text-zinc-700">
            Remotes ativos:
          </p>
          <div className="space-y-3">
            {remotes.map((r) => (
              <div key={r.name} className="flex items-center gap-3">
                <span className="font-mono text-xs flex-1 text-stone-400">
                  {r.name}
                </span>
                <span className="font-mono text-xs text-zinc-700">
                  {r.port}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${r.dotClass}`} />
                  <span className={`font-mono text-xs font-semibold ${r.textClass}`}>
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
