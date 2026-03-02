import { createContext, useContext, useReducer, ReactNode } from 'react'
import type { State, Action, GlobalContextType } from '../types'

export type { User, State, Action, GlobalContextType } from '../types'

const initialState: State = {
  user: {
    name: 'Debora Lara',
    role: 'Frontend Developer',
    avatar: 'DL',
  },
  notifications: 3,
  activeModule: 'home',
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_ACTIVE_MODULE':
      return { ...state, activeModule: action.payload }
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: state.notifications + 1 }
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: 0 }
    default:
      return state
  }
}

const GlobalContext = createContext<GlobalContextType | null>(null)

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobal() {
  const context = useContext(GlobalContext)
  if (!context) throw new Error('useGlobal must be used within GlobalProvider')
  return context
}
