import { useMemo } from 'react'
import { useUsers } from '../hooks/useUsers'
import { Link } from 'react-router-dom'
import type { User } from '../types'

const roleColors: Record<User['role'], string> = {
  Admin:     'bg-purple-100 text-purple-700',
  Developer: 'bg-blue-100 text-blue-700',
  Designer:  'bg-pink-100 text-pink-700',
  QA:        'bg-yellow-100 text-yellow-700',
}

export default function RolesPage() {
  const { users, loading, error } = useUsers()

  const rolesSummary = useMemo(() => {
    const roles: Record<string, User[]> = {}
    users.forEach((u) => {
      if (!roles[u.role]) roles[u.role] = []
      roles[u.role].push(u)
    })
    return roles
  }, [users])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0c0c0f]">Cargos & Permissões</h2>
          <p className="text-stone-500 text-sm mt-1">
            Distribuição de usuários por cargo
          </p>
        </div>
        <Link
          to="/"
          className="font-mono text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80 bg-zinc-100 text-stone-500"
        >
          ← Usuários
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(rolesSummary).map(([role, members]) => (
          <div
            key={role}
            className="bg-white rounded-xl border border-zinc-100 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${roleColors[role as User['role']]}`}>
                {role}
              </span>
              <span className="text-2xl font-bold text-[#0c0c0f]">
                {members.length}
              </span>
            </div>
            <div className="space-y-1">
              {members.map((u) => (
                <p key={u.id} className="text-sm text-stone-500">
                  {u.name}{' '}
                  <span className={`text-xs ${u.status === 'active' ? 'text-green-500' : 'text-stone-400'}`}>
                    ({u.status === 'active' ? 'ativo' : 'inativo'})
                  </span>
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
