import { useMemo, useCallback, useState, useEffect } from 'react'
import { fetchReports } from '../services/reportsService'
import type { Report, StatusFilter } from '../types'

const PAGE_SIZE = 10

export function useReports() {
  const [data, setData] = useState<Report[] | undefined>(undefined)
  const [loadError, setLoadError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    fetchReports()
      .then((reports) => {
        if (!cancelled) {
          setData(reports)
          setLoadError(null)
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setLoadError(e instanceof Error ? e : new Error(String(e)))
          setData(undefined)
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const reports = data ?? []

  const [statusFilter, setFilter] = useState<StatusFilter>('all')
  const [page, setPage] = useState(1)

  const filteredReports = useMemo(() => {
    if (statusFilter === 'all') return reports
    return reports.filter((r) => r.status === statusFilter)
  }, [reports, statusFilter])

  const totalPages = Math.ceil(filteredReports.length / PAGE_SIZE)

  const paginatedReports = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredReports.slice(start, start + PAGE_SIZE)
  }, [filteredReports, page])

  const handleStatusFilter = useCallback((filter: StatusFilter) => {
    setFilter(filter)
    setPage(1)
  }, [])

  return {
    reports,
    paginatedReports,
    filteredReports,
    loading: isLoading,
    error: loadError
      ? 'Não foi possível carregar os relatórios. Verifique se a API está rodando em :3100'
      : null,
    statusFilter,
    handleStatusFilter,
    totalPages,
    currentPage: page,
    setPage,
  }
}
