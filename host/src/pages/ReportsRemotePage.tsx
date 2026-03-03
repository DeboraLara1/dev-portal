import { Suspense, lazy, Component, ReactNode } from 'react'

const Reports = lazy(() => import('remoteReports/Reports'))

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
          <div className="text-center rounded-2xl p-8 max-w-sm bg-red-50 border border-red-200">
            <p className="text-3xl mb-3">⚠️</p>
            <p className="font-bold text-red-600">
              Remote Reports indisponível
            </p>
            <p className="text-sm mt-2 text-red-500">
              Certifique-se de que o remote está rodando em{' '}
              <code className="px-1 rounded font-mono bg-red-100">
                localhost:3003
              </code>
            </p>
            <p className="font-mono text-xs mt-3 text-red-300">
              npm run build &amp;&amp; npm run preview
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
        <div className="w-10 h-10 rounded-full border-2 border-orange-500 border-t-transparent animate-spin mx-auto mb-3" />
        <p className="text-stone-500">Carregando módulo Relatórios...</p>
        <p className="font-mono text-xs mt-1 text-stone-400">
          Remote: localhost:3003
        </p>
      </div>
    </div>
  )
}

export default function ReportsRemotePage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Reports />
      </Suspense>
    </ErrorBoundary>
  )
}
