import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import LandingPage from './pages/Landing/LandingPage'
import LoginPage from './pages/Login/LoginPage'
import MainLayout from './layouts/MainLayout'
import ClientesPage from './pages/Clientes/ClientesPage'
import ImoveisPage from './pages/Imoveis/ImoveisPage'
import ProjetosPage from './pages/Projetos/ProjetosPage'
import MatchingPage from './pages/Matching/MatchingPage'
import PipelinePage from './pages/Pipeline/PipelinePage'
import WhatsAppPage from './pages/WhatsApp/WhatsAppPage'
import AutoAtendimentoPage from './pages/AutoAtendimento/AutoAtendimentoPage'
import CadastroSucessoPage from './pages/AutoAtendimento/CadastroSucessoPage'
import PoliticaPrivacidadePage from './pages/PoliticaPrivacidade/PoliticaPrivacidadePage'
import LeadsPage from './pages/Leads/LeadsPage'

const LeadCapturePage = lazy(() => import('./pages/LeadCapture/LeadCapturePage'))

function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/imovel/alto-padrao" element={<Suspense fallback={null}><LeadCapturePage /></Suspense>} />

        <Route path="/politica-de-privacidade" element={<PoliticaPrivacidadePage />} />

        {/* Public Auto-Attendance Routes */}
        <Route path="/cadastro/:token" element={<AutoAtendimentoPage />} />
        <Route path="/cadastro/sucesso" element={<CadastroSucessoPage />} />

        {/* Protected Routes with Layout */}
        <Route element={<MainLayout />}>
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/imoveis" element={<ImoveisPage />} />
          <Route path="/projetos" element={<ProjetosPage />} />
          <Route path="/pipeline" element={<PipelinePage />} />
          <Route path="/matching" element={<MatchingPage />} />
          <Route path="/whatsapp" element={<WhatsAppPage />} />
          <Route path="/configuracoes" element={<div style={{ padding: '32px', color: '#fff' }}>Configurações (Em breve)</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  )
}

export default App
