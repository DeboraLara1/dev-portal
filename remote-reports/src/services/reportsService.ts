import type { Report } from '../types'

const BASE = 'http://localhost:3100'

export async function fetchReports(): Promise<Report[]> {
  const res = await fetch(`${BASE}/reports`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
