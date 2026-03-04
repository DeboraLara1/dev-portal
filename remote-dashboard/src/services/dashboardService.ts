import type { Stat, Activity, Build } from '../types'

const BASE = 'http://localhost:3100'

export async function fetchStats(): Promise<Stat[]> {
  const res = await fetch(`${BASE}/stats`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function fetchActivities(): Promise<Activity[]> {
  const res = await fetch(`${BASE}/activities`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function fetchBuilds(): Promise<Build[]> {
  const res = await fetch(`${BASE}/builds`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
