import { ActivityItem } from '../components/RecentActivity'
import { useDashboard } from '../hooks/useDashboard'
import { Link } from 'react-router-dom'

export default function ActivityPage() {
  const { activities, loading, error } = useDashboard()

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-xs mb-1 text-stone-400">— histórico</p>
          <h2 className="font-black text-4xl tracking-tight leading-none text-[#0c0c0f]">
            Atividades
          </h2>
        </div>
        <Link
          to="/"
          className="font-mono text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80 bg-zinc-100 text-stone-500"
        >
          ← dashboard
        </Link>
      </div>

      {loading && (
        <div className="flex items-center gap-3 py-4">
          <div className="w-4 h-4 rounded-full border-2 border-violet-600 border-t-transparent animate-spin" />
          <span className="font-mono text-sm text-stone-400">Carregando da API...</span>
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3">
          <p className="font-mono text-sm text-red-600">{error}</p>
          <p className="font-mono text-xs text-red-400 mt-1">
            Inicie com: <code className="bg-red-100 px-1 rounded">npm run api</code>
          </p>
        </div>
      )}

      {!loading && !error && (
        <div className="rounded-2xl bg-white overflow-hidden border border-zinc-100">
          <div className="px-5 py-4 border-b border-zinc-100 bg-stone-50">
            <p className="font-mono text-xs font-semibold text-stone-400">
              {activities.length} registros encontrados
            </p>
          </div>
          <div className="px-5">
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
