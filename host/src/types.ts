import type { Dispatch } from 'react'

export type User = {
  name: string
  role: string
  avatar: string
}

export type State = {
  user: User
  notifications: number
  activeModule: string
}

export type Action =
  | { type: 'SET_ACTIVE_MODULE'; payload: string }
  | { type: 'ADD_NOTIFICATION' }
  | { type: 'CLEAR_NOTIFICATIONS' }

export type GlobalContextType = {
  state: State
  dispatch: Dispatch<Action>
}
