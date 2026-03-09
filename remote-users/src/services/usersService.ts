import type { User } from '../types'

const BASE = 'http://localhost:3100'

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE}/users`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
