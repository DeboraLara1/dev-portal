import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DashboardRemotePage from './pages/DashboardRemotePage'
import UsersRemotePage from './pages/UsersRemotePage'
import ReportsRemotePage from './pages/ReportsRemotePage'

export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardRemotePage />} />
            <Route path="/users" element={<UsersRemotePage />} />
            <Route path="/reports" element={<ReportsRemotePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </GlobalProvider>
  )
}
