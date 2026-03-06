export type Report = {
  id: string
  title: string
  squad: string
  period: string
  sprint: string
  deploysTotal: number
  deploysOk: number
  issuesClosed: number
  avgCycleTime: string
  status: 'healthy' | 'warning' | 'critical'
}

export type StatusFilter = 'all' | 'healthy' | 'warning' | 'critical'
