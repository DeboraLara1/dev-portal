export type Stat = {
  id: string
  label: string
  value: string
  change: string
  positive: boolean
  icon: string
}

export type Activity = {
  id: string
  user: string
  avatar: string
  action: string
  target: string
  time: string
  type: 'deploy' | 'issue' | 'pr' | 'alert' | 'update'
}

export type Build = {
  id: string
  module: string
  branch: string
  status: 'success' | 'failed' | 'running'
  duration: string
  time: string
}

export type Filter = 'all' | 'positive' | 'negative'
