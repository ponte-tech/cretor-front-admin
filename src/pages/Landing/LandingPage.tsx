import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'

export default function LandingPage() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <img src="/HORIZONTAL BRANCO SEM FUNDO.png" alt="Cretor" className={styles.logo} />
        <Link to="/login" className={styles.loginBtn}>Entrar</Link>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          A plataforma completa para <span className={styles.highlight}>corretores de alto padrao</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Gerencie leads, pipeline de vendas, propostas e relacionamento com clientes em um unico lugar. Do primeiro contato ao fechamento do negocio.
        </p>
        <Link to="/login" className={styles.ctaButton}>Acessar plataforma</Link>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21M4 7H20M4 21H20C20.5304 21 21.0391 20.7893 21.4142 20.4142C21.7893 20.0391 22 19.5304 22 19V9C22 8.46957 21.7893 7.96086 21.4142 7.58579C21.0391 7.21071 20.5304 7 20 7H4C3.46957 7 2.96086 7.21071 2.58579 7.58579C2.21071 7.96086 2 8.46957 2 9V19C2 19.5304 2.21071 20.0391 2.58579 20.4142C2.96086 20.7893 3.46957 21 4 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className={styles.featureTitle}>Captacao de Leads</h3>
          <p className={styles.featureDesc}>
            Formularios inteligentes que capturam leads qualificados automaticamente. Cada lead entra no seu pipeline pronto para ser trabalhado.
          </p>
        </div>

        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.27 6.96L12 12.01L20.73 6.96M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className={styles.featureTitle}>Pipeline de Vendas</h3>
          <p className={styles.featureDesc}>
            Visualize todos os seus negocios em um kanban intuitivo. Arraste e solte para mover entre etapas, do primeiro contato ao fechamento.
          </p>
        </div>

        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className={styles.featureTitle}>Propostas e PDF</h3>
          <p className={styles.featureDesc}>
            Gere propostas profissionais com fluxo de caixa, projecao de investimento e envie diretamente por email para o cliente.
          </p>
        </div>

        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className={styles.featureTitle}>Matching Inteligente</h3>
          <p className={styles.featureDesc}>
            Algoritmo que cruza o perfil do comprador com imoveis e empreendimentos disponiveis, encontrando as melhores oportunidades.
          </p>
        </div>

        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className={styles.featureTitle}>Envio de Email</h3>
          <p className={styles.featureDesc}>
            Envie propostas diretamente da plataforma com PDF em anexo. O cliente recebe um email profissional e pode responder diretamente.
          </p>
        </div>

        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className={styles.featureTitle}>Gestao de Clientes</h3>
          <p className={styles.featureDesc}>
            Perfis completos de cada comprador com historico de interacoes, observacoes e preferencias para um atendimento personalizado.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Pronto para transformar suas vendas?</h2>
        <p className={styles.ctaSubtitle}>Entre na plataforma e comece a fechar negocios de alto padrao com mais eficiencia.</p>
        <Link to="/login" className={styles.ctaButton}>Acessar plataforma</Link>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>Cretor - Plataforma de gestao imobiliaria de alto padrao</p>
        <p>Desenvolvido por <a href="https://ponte-tech.com.br" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Ponte Tech</a></p>
      </footer>
    </div>
  )
}
