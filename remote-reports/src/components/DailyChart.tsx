import { useState } from 'react'

const PERIODS = ['Diário', 'Semanal', 'Mensal', 'Anual']

type Bar = { label: string; value: number }

function seeded(n: number) {
  const x = Math.sin(n + 1) * 10000
  return x - Math.floor(x)
}

function getDailyData(): Bar[] {
  return Array.from({ length: 24 }, (_, i) => ({
    label: `${i}h`,
    value: Math.round(seeded(i * 3 + 10) * 80 + 5),
  }))
}

function getWeeklyData(): Bar[] {
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
  return days.map((d, i) => ({
    label: d,
    value: Math.round(seeded(i * 7 + 100) * 350 + 50),
  }))
}

function getMonthlyData(): Bar[] {
  return Array.from({ length: 31 }, (_, i) => ({
    label: String(i + 1),
    value: Math.round(seeded(i * 5 + 200) * 420 + 40),
  }))
}

function getAnnualData(): Bar[] {
  const months = ['Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar']
  return months.map((m, i) => ({
    label: m,
    value: Math.round(seeded(i + 300) * 5000 + 1000),
  }))
}

function niceScale(maxVal: number): { niceMax: number; ticks: number[] } {
  const rawStep = maxVal / 5
  const mag = Math.pow(10, Math.floor(Math.log10(rawStep)))
  const normalized = rawStep / mag
  const niceNorm = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10
  const niceStep = niceNorm * mag
  const niceMax = niceStep * 5
  return {
    niceMax,
    ticks: [5, 4, 3, 2, 1, 0].map((i) => i * niceStep),
  }
}

function formatTick(n: number): string {
  if (n >= 10000) return `${(n / 1000).toFixed(0)}k`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

const TITLES: Record<string, string> = {
  'Diário':  'Deploys — Hoje',
  'Semanal': 'Deploys — Semana Atual',
  'Mensal':  'Deploys — Mês Atual',
  'Anual':   'Deploys — Últimos 12 Meses',
}

export function DailyChart() {
  const [period, setPeriod] = useState('Anual')

  const data: Bar[] =
    period === 'Diário'  ? getDailyData() :
    period === 'Semanal' ? getWeeklyData() :
    period === 'Mensal'  ? getMonthlyData() :
    getAnnualData()

  const { niceMax, ticks } = niceScale(Math.max(...data.map((d) => d.value)))

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-5">
      <div className="flex items-center justify-between mb-5">
        <p className="font-bold text-sm text-[#0c0c0f]">{TITLES[period]}</p>
        <div className="relative">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="appearance-none pl-2.5 pr-6 py-1 rounded-lg border border-stone-200 font-mono text-xs text-stone-600 bg-white outline-none cursor-pointer"
          >
            {PERIODS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 text-[9px]">▼</span>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <div className="relative" style={{ height: 160 }}>
            {ticks.map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-t border-zinc-100 pointer-events-none"
                style={{ top: `${(i / (ticks.length - 1)) * 100}%` }}
              />
            ))}
            <div className="absolute inset-0 flex items-end gap-px">
              {data.map((bar, i) => (
                <div
                  key={i}
                  className="flex-1 bg-violet-500 rounded-sm hover:bg-violet-700 transition-colors"
                  style={{ height: `${(bar.value / niceMax) * 100}%` }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-px mt-1.5">
            {data.map((bar, i) => (
              <div key={i} className="flex-1 text-center">
                <span className="font-mono text-[8px] text-stone-400">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between" style={{ height: 160 }}>
          {ticks.map((t) => (
            <span key={t} className="font-mono text-[9px] text-stone-400 leading-none">{formatTick(t)}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
