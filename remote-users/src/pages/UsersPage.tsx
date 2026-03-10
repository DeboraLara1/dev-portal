import { useUsers } from '../hooks/useUsers'
import { UserSearch } from '../components/UserSearch'
import type { User } from '../types'

const roleClass: Record<User['role'], string> = {
  Admin:     'bg-purple-50 text-violet-600',
  Developer: 'bg-blue-50 text-blue-600',
  Designer:  'bg-pink-50 text-pink-800',
  QA:        'bg-amber-50 text-amber-700',
}

export default function UsersPage() {
  const {
    paginatedUsers,
    filteredUsers,
    filters,
    totalPages,
    currentPage,
    setSearch,
    setRole,
    setStatus,
    setPage,
    reset,
    loading,
    error,
  } = useUsers()

  return (
    <div className="space-y-6">
      <h2 className="font-black text-4xl tracking-tight leading-none text-[#0c0c0f]">
        Usuários
      </h2>

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

      <UserSearch
        search={filters.search}
        role={filters.role}
        status={filters.status}
        onSearch={setSearch}
        onRole={setRole}
        onStatus={setStatus}
        onReset={reset}
      />

      <div className="rounded-2xl overflow-hidden border border-zinc-100">
        <table className="w-full bg-white">
          <thead>
            <tr className="border-b border-zinc-100 bg-stone-50">
              <th className="text-left px-5 py-3 font-mono text-xs font-semibold text-stone-400">
                USUÁRIO
              </th>
              <th className="text-left px-5 py-3 font-mono text-xs font-semibold text-stone-400">
                SQUAD
              </th>
              <th className="text-left px-5 py-3 font-mono text-xs font-semibold text-stone-400">
                CARGO
              </th>
              <th className="text-left px-5 py-3 font-mono text-xs font-semibold text-stone-400">
                STATUS
              </th>
              <th className="text-left px-5 py-3 font-mono text-xs font-semibold text-stone-400">
                ENTROU EM
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user, index) => {
                const isActive = user.status === 'active'
                const isLast = index === paginatedUsers.length - 1
                return (
                  <tr
                    key={user.id}
                    className={`transition-colors hover:bg-stone-50 ${isLast ? '' : 'border-b border-zinc-100'}`}
                  >
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-bold text-[#0c0c0f]">
                        {user.name}
                      </p>
                      <p className="font-mono mt-0.5 text-[11px] text-stone-400">
                        {user.email}
                      </p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs font-semibold text-stone-500">
                        {user.squad}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg ${roleClass[user.role]}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-zinc-300'}`} />
                        <span className={`font-mono text-xs ${isActive ? 'text-green-700' : 'text-stone-400'}`}>
                          {isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs text-stone-400">
                        {new Date(user.joinedAt).toLocaleDateString('pt-BR')}
                      </span>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center">
                  <p className="font-black text-4xl mb-2 text-zinc-100">0</p>
                  <p className="font-mono text-sm text-stone-400">
                    nenhum usuário encontrado
                  </p>
                </td>
              </tr>
            )}
          </tbody>

          {filteredUsers.length > 0 && (
            <tfoot>
              <tr className="border-t border-zinc-100 bg-stone-50">
                <td colSpan={5} className="px-5 py-2.5">
                  <div className="flex items-center justify-end gap-4">
                    <span className="font-mono text-xs text-stone-400">
                      {(currentPage - 1) * 10 + 1}–{Math.min(currentPage * 10, filteredUsers.length)} de {filteredUsers.length} itens
                    </span>

                    <span className="font-mono text-xs text-stone-400">
                      Página {currentPage}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`w-7 h-7 rounded flex items-center justify-center transition-all ${currentPage === 1 ? 'text-zinc-300 cursor-not-allowed' : 'text-stone-500 cursor-pointer'}`}
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => setPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`w-7 h-7 rounded flex items-center justify-center transition-all ${currentPage === totalPages ? 'text-zinc-300 cursor-not-allowed' : 'text-stone-500 cursor-pointer'}`}
                      >
                        ›
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  )
}
