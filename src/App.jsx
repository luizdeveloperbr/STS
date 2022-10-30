import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import LoginPage from './pages/login'
import UserPasswordChange from './pages/password-change'
import Dashboard from './pages/dashboard'
import ProtectedRoute from './contexts/ProtectedRoute'
import Report from './pages/report'
import AdminPage from './pages/admin'
import './css/style.css'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        } />
        <Route path="/trocar-senha" element={<UserPasswordChange />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/relatorio" element={
          <ProtectedRoute>
            <Report />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App
