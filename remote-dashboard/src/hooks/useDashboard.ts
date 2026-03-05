import { useMemo, useCallback, useState, useEffect } from 'react'
import { fetchStats, fetchActivities, fetchBuilds } from '../services/dashboardService'
import type { Stat, Filter, Activity, Build } from '../types'

const ERROR_MSG = 'Não foi possível carregar os dados. Verifique se a API está rodando em :3100'

export function useDashboard() {
  const [filter, setFilter] = useState<Filter>('all')
  const [stats, setStats] = useState<Stat[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [builds, setBuilds] = useState<Build[]>([])
  const [loading, setLoading] = useState(true)
  const [statsOrActivitiesError, setStatsOrActivitiesError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setStatsOrActivitiesError(false)

    let pending = 2
    const done = () => {
      pending -= 1
      if (pending === 0 && !cancelled) setLoading(false)
    }

    Promise.allSettled([fetchStats(), fetchActivities()])
      .then(([statsRes, actRes]) => {
        if (cancelled) return
        if (statsRes.status === 'fulfilled') setStats(statsRes.value)
        else setStats([])
        if (actRes.status === 'fulfilled') setActivities(actRes.value)
        else setActivities([])
        const err =
          statsRes.status === 'rejected' || actRes.status === 'rejected'
        setStatsOrActivitiesError(err)
      })
      .finally(done)

    fetchBuilds()
      .then((b) => {
        if (!cancelled) setBuilds(b)
      })
      .catch(() => {
        if (!cancelled) setBuilds([])
      })
      .finally(done)

    return () => {
      cancelled = true
    }
  }, [])

  const filteredStats = useMemo(() => {
    if (filter === 'all') return stats
    if (filter === 'positive') return stats.filter((s: Stat) => s.positive)
    return stats.filter((s: Stat) => !s.positive)
  }, [stats, filter])

  const totalPositive = useMemo(
    () => stats.filter((s: Stat) => s.positive).length,
    [stats]
  )

  const handleFilterChange = useCallback((newFilter: Filter) => {
    setFilter(newFilter)
  }, [])

  return {
    filteredStats,
    activities,
    builds,
    totalPositive,
    filter,
    handleFilterChange,
    loading,
    error: statsOrActivitiesError ? ERROR_MSG : null,
  }
}
