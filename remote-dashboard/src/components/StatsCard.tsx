import { memo } from 'react'
import type { Stat } from '../types'

export const StatsCard = memo(function StatsCard({ stat }: { stat: Stat }) {
  const borderLClass = stat.positive ? 'border-l-violet-600' : 'border-l-red-500'
  const changeClass = stat.positive
    ? 'bg-green-50 text-green-700 border border-green-200'
    : 'bg-red-50 text-red-600 border border-red-200'

  return (
    <div className={`rounded-2xl p-5 bg-white border border-zinc-100 border-l-[3px] ${borderLClass}`}>
      <div className="flex items-start justify-between mb-4">
        <span className="text-xl">{stat.icon}</span>
        <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${changeClass}`}>
          {stat.change}
        </span>
      </div>
      <p className="font-black tracking-tight leading-none text-[2.2rem] text-[#0c0c0f]">
        {stat.value}
      </p>
      <p className="text-xs font-medium mt-2 text-stone-400">
        {stat.label}
      </p>
    </div>
  )
})
