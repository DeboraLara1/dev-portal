import { useMemo, useCallback, useReducer, useState, useEffect } from 'react'
import { fetchUsers } from '../services/usersService'
import type { User, FilterState, FilterAction } from '../types'

const PAGE_SIZE = 10

const initialState: FilterState = {
  search: '',
  role: 'all',
  status: 'all',
  page: 1,
}

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.payload, page: 1 }
    case 'SET_ROLE':
      return { ...state, role: action.payload, page: 1 }
    case 'SET_STATUS':
      return { ...state, status: action.payload, page: 1 }
    case 'SET_PAGE':
      return { ...state, page: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [filters, dispatch] = useReducer(filterReducer, initialState)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    fetchUsers()
      .then((data) => {
        if (!cancelled) {
          setUsers(data)
          setLoadError(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError(true)
          setUsers([])
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const filteredUsers = useMemo(() => {
    return users.filter((user: User) => {
      const matchSearch =
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase())
      const matchRole = filters.role === 'all' || user.role === filters.role
      const matchStatus = filters.status === 'all' || user.status === filters.status
      return matchSearch && matchRole && matchStatus
    })
  }, [users, filters.search, filters.role, filters.status])

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE)

  const paginatedUsers = useMemo(() => {
    const start = (filters.page - 1) * PAGE_SIZE
    return filteredUsers.slice(start, start + PAGE_SIZE)
  }, [filteredUsers, filters.page])

  const activeCount = useMemo(
    () => users.filter((u: User) => u.status === 'active').length,
    [users]
  )

  const setSearch = useCallback((value: string) => {
    dispatch({ type: 'SET_SEARCH', payload: value })
  }, [])

  const setRole = useCallback((value: string) => {
    dispatch({ type: 'SET_ROLE', payload: value })
  }, [])

  const setStatus = useCallback((value: string) => {
    dispatch({ type: 'SET_STATUS', payload: value })
  }, [])

  const setPage = useCallback((page: number) => {
    dispatch({ type: 'SET_PAGE', payload: page })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  return {
    users,
    paginatedUsers,
    filteredUsers,
    activeCount,
    totalCount: users.length,
    filters,
    totalPages,
    currentPage: filters.page,
    setSearch,
    setRole,
    setStatus,
    setPage,
    reset,
    loading: isLoading,
    error: loadError
      ? 'Não foi possível carregar os usuários. Verifique se a API está rodando em :3100'
      : null,
  }
}
