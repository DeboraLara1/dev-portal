import { memo } from 'react'
import type { UserSearchProps } from '../types'

export const UserSearch = memo(function UserSearch({
  search,
  role,
  status,
  onSearch,
  onRole,
  onStatus,
  onReset,
}: UserSearchProps) {
  const hasActiveFilters = role !== 'all' || status !== 'all' || search !== ''

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar nome ou email..."
            className="rounded-xl pl-3 pr-9 py-2 font-mono transition-all bg-white border border-stone-200 text-stone-900 text-[13px] outline-none focus:border-violet-600 w-72"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-xs text-stone-400">Filtrar:</span>

        {role !== 'all' ? (
          <span className="flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full border border-violet-300 bg-violet-50 font-mono text-xs text-violet-700">
            {role}
            <button
              onClick={() => onRole('all')}
              className="flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-violet-200 transition-colors text-violet-500"
            >
              ×
            </button>
          </span>
        ) : (
          <div className="relative">
            <select
              value={role}
              onChange={(e) => onRole(e.target.value)}
              className="appearance-none pl-3 pr-7 py-1 rounded-full border border-stone-200 font-mono text-xs text-stone-600 bg-white outline-none cursor-pointer hover:border-stone-300 transition-colors"
            >
              <option value="all">Cargo</option>
              <option value="Admin">Admin</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="QA">QA</option>
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 text-[10px]">
              ▼
            </span>
          </div>
        )}

        {status !== 'all' ? (
          <span className="flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full border border-violet-300 bg-violet-50 font-mono text-xs text-violet-700">
            {status === 'active' ? 'Ativo' : 'Inativo'}
            <button
              onClick={() => onStatus('all')}
              className="flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-violet-200 transition-colors text-violet-500"
            >
              ×
            </button>
          </span>
        ) : (
          <div className="relative">
            <select
              value={status}
              onChange={(e) => onStatus(e.target.value)}
              className="appearance-none pl-3 pr-7 py-1 rounded-full border border-stone-200 font-mono text-xs text-stone-600 bg-white outline-none cursor-pointer hover:border-stone-300 transition-colors"
            >
              <option value="all">Status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 text-[10px]">
              ▼
            </span>
          </div>
        )}

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="font-mono text-xs text-violet-600 hover:underline ml-1"
          >
            Limpar filtro
          </button>
        )}
      </div>
    </div>
  )
})
