import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import LoginPage from './pages/login'
import UserPasswordChange from './pages/password-change'
import Dashboard from './pages/dashboard'
import ProtectedRoute from './contexts/ProtectedRoute'
import Report from './pages/Report'
import AdminPage from './pages/admin'
import VendaUser from './pages/vendaUser'
import './css/style.css'
import moment from 'moment'
moment.locale("pt-br", {
  months:
    "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split(
      "_"
    ),
    monthsShort: 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_')
});
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
        <Route path="/venda-por-usuario" element={
          <ProtectedRoute>
            <VendaUser />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App
