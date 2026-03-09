export type User = {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Developer' | 'Designer' | 'QA'
  status: 'active' | 'inactive'
  squad: string
  avatar: string
  joinedAt: string
}

export type UserSearchProps = {
  search: string
  role: string
  status: string
  onSearch: (v: string) => void
  onRole: (v: string) => void
  onStatus: (v: string) => void
  onReset: () => void
}

export type FilterState = {
  search: string
  role: string
  status: string
  page: number
}

export type FilterAction =
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_ROLE'; payload: string }
  | { type: 'SET_STATUS'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'RESET' }
