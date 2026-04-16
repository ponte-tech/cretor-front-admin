import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setEmailError('')
    setPasswordError('')

    let hasError = false

    if (!email) {
      setEmailError('E-mail é obrigatório')
      hasError = true
    } else if (!validateEmail(email)) {
      setEmailError('E-mail inválido')
      hasError = true
    }

    if (!password) {
      setPasswordError('Senha é obrigatória')
      hasError = true
    } else if (password.length < 6) {
      setPasswordError('Senha deve ter no mínimo 6 caracteres')
      hasError = true
    }

    if (hasError) return

    setIsLoading(true)
    try {
      await login(email, password)
      navigate('/leads')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao fazer login'
      if (message.includes('email') || message.includes('password') || message.includes('unauthorized')) {
        setPasswordError('E-mail ou senha inválidos')
      } else {
        setPasswordError(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    console.log('Login com Google - em breve')
  }

  return (
    <div className={styles.container}>
      {/* Theme Toggle */}
      <button
        className={styles.themeToggle}
        onClick={toggleTheme}
        title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
      >
        {theme === 'dark' ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        )}
      </button>

      {/* Left Side - Art Panel */}
      <div className={styles.leftSide}>
        <div className={styles.artOverlay}></div>
        <iframe
          src={theme === 'light' ? '/daniel_krammes_light_panel.html' : '/daniel_krammes_art_panel.html'}
          className={styles.artFrame}
          title="Daniel Krammes Art Panel"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.title}>Bem-vindo de volta</h2>
            <p className={styles.subtitle}>
              Entre com suas credenciais para acessar sua conta
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              type="email"
              label="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError) setEmailError('')
              }}
              error={emailError}
              placeholder="seu@email.com"
              rightIcon={
                email && !emailError ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="#D4AF37"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : undefined
              }
            />

            <Input
              type={showPassword ? 'text' : 'password'}
              label="Senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (passwordError) setPasswordError('')
              }}
              error={passwordError}
              placeholder="••••••••"
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.eyeButton}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        stroke="#D4AF37"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="12" r="3" stroke="#D4AF37" strokeWidth="2" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                        stroke="#B8A898"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line x1="1" y1="1" x2="23" y2="23" stroke="#B8A898" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
              }
            />

            <div className={styles.forgotPassword}>
              <a href="/forgot-password">Esqueceu sua senha?</a>
            </div>

            <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>

            <div className={styles.divider}>
              <span>ou</span>
            </div>

            <button type="button" className={styles.googleButton} onClick={handleGoogleLogin}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continuar com Google</span>
            </button>
          </form>

          <div className={styles.privacyLink}>
            <Link to="/politica-de-privacidade">Política de Privacidade</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
