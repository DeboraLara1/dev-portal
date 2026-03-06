import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReportsPage from './pages/ReportsPage'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f8f7ff]">
        <div className="px-6 py-4 flex items-center justify-between bg-[#0c0c0f] border-b border-[#1c1c22]">
          <div className="font-mono">
            <span className="text-zinc-600 text-[11px]">dev//</span>
            <span className="text-white font-black text-lg tracking-tight">portal</span>
            <span className="ml-2 text-xs text-zinc-600">· reports</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50/10 border border-orange-400/25">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span className="font-mono text-xs text-orange-400">standalone :3003</span>
          </div>
        </div>
        <div className="p-6 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<ReportsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
