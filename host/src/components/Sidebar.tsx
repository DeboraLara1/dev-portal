import { useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGlobal } from '../context/GlobalContext'

const navItems = [
  { path: '/',          label: 'Início',     icon: '⬡', module: 'home'      },
  { path: '/dashboard', label: 'Plataforma', icon: '◈', module: 'dashboard' },
  { path: '/users',     label: 'Usuários',   icon: '◎', module: 'users'     },
  { path: '/reports',   label: 'Relatórios', icon: '◧', module: 'reports'   },
]

export default function Sidebar() {
  const { state, dispatch } = useGlobal()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const handleNavClick = useCallback(
    (module: string) => dispatch({ type: 'SET_ACTIVE_MODULE', payload: module }),
    [dispatch]
  )

  return (
    <aside
      className={`flex flex-col shrink-0 bg-[#0c0c0f] border-r border-[#1c1c22] transition-all duration-200 ${
        collapsed ? 'w-14' : 'w-56'
      }`}
    >
      <div className={`px-3 pt-5 pb-4 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <div className="font-mono leading-none">
            <span className="text-white font-black text-xl tracking-tight">Portal Dev</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex flex-col gap-[5px] p-1.5 rounded-md hover:bg-[#ffffff08] transition-all"
          title={collapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          <span className="w-4 h-[2px] bg-zinc-500 block rounded-full" />
          <span className="w-4 h-[2px] bg-zinc-500 block rounded-full" />
          <span className="w-4 h-[2px] bg-zinc-500 block rounded-full" />
        </button>
      </div>

      <div className={`mx-2 mb-5 px-3 py-2.5 rounded-xl flex items-center gap-2.5 bg-[#ffffff08] border border-[#1c1c22] ${collapsed ? 'justify-center px-0' : ''}`}>
        <div className="w-8 h-8 rounded-lg text-white flex items-center justify-center text-xs font-black shrink-0 bg-gradient-to-br from-violet-600 to-indigo-600">
          {state.user.avatar}
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate leading-none">
              {state.user.name}
            </p>
            <p className="font-mono mt-0.5 truncate text-zinc-600 text-[9px]">
              {state.user.role}
            </p>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="px-5 mb-1.5">
          <span className="font-mono font-bold tracking-widest text-zinc-700 text-[9px]">
            MÓDULOS
          </span>
        </div>
      )}

      <nav className="flex-1 px-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => handleNavClick(item.module)}
              title={collapsed ? item.label : undefined}
              className={`sidebar-item flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                collapsed ? 'justify-center px-0' : ''
              } ${isActive ? 'sidebar-item-active' : 'text-zinc-600'}`}
            >
              <span className="text-base leading-none opacity-80 shrink-0">{item.icon}</span>
              {!collapsed && (
                <span className="flex-1">{item.label}</span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
