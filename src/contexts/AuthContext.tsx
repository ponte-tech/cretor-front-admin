import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authApi, UsuarioResponse } from '../services/api'

interface AuthContextType {
  usuario: UsuarioResponse | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, senha: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('usuario')
    const token = localStorage.getItem('access_token')

    if (storedUser && token) {
      setUsuario(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, senha: string) => {
    const response = await authApi.login(email, senha)

    localStorage.setItem('access_token', response.access_token)
    localStorage.setItem('refresh_token', response.refresh_token)
    localStorage.setItem('usuario', JSON.stringify(response.usuario))

    setUsuario(response.usuario)
  }

  const logout = () => {
    authApi.logout().catch(() => {})

    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('usuario')

    setUsuario(null)
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isAuthenticated: !!usuario,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
