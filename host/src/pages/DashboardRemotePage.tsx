import { Suspense, lazy, Component, ReactNode } from 'react'

const Dashboard = lazy(() => import('remoteDashboard/Dashboard'))

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center bg-red-50 border border-red-200 rounded-xl p-8 max-w-sm">
            <p className="text-3xl mb-3">⚠️</p>
            <p className="text-red-700 font-semibold">Remote Dashboard indisponível</p>
            <p className="text-red-500 text-sm mt-2">
              Certifique-se de que o remote está rodando em{' '}
              <code className="bg-red-100 px-1 rounded">localhost:3001</code>
            </p>
            <p className="text-xs text-red-400 mt-3">
              Execute: <code>npm run build && npm run preview</code>
            </p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500">Carregando módulo Dashboard...</p>
        <p className="text-xs text-gray-400 mt-1">Remote: localhost:3001</p>
      </div>
    </div>
  )
}

export default function DashboardRemotePage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Dashboard />
      </Suspense>
    </ErrorBoundary>
  )
}
