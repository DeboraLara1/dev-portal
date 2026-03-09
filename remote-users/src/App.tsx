import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import './index.css'

const UsersPage = lazy(() => import('./pages/UsersPage'))
const RolesPage = lazy(() => import('./pages/RolesPage'))

function Nav() {
  const location = useLocation()
  const links = [
    { to: '/', label: 'Usuários' },
    { to: '/roles', label: 'Cargos' },
  ]
  return (
    <nav className="px-6 py-3 flex gap-1 border-b border-zinc-100">
      {links.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
            location.pathname === l.to
              ? 'bg-green-50 text-emerald-600'
              : 'text-stone-400'
          }`}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f8f7ff]">
        <div className="px-6 py-4 flex items-center justify-between bg-[#0c0c0f] border-b border-[#1c1c22]">
          <div className="font-mono">
            <span className="text-zinc-600 text-[11px]">dev//</span>
            <span className="text-white font-black text-lg tracking-tight">portal</span>
            <span className="ml-2 text-xs text-zinc-600">· users</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50/10 border border-emerald-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs text-emerald-400">standalone :3002</span>
          </div>
        </div>
        <Nav />
        <div className="p-6 max-w-3xl mx-auto">
          <Suspense
            fallback={
              <div className="flex justify-center py-16">
                <div className="w-8 h-8 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<UsersPage />} />
              <Route path="/roles" element={<RolesPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  )
}
