import styles from './CadastroSucessoPage.module.css'

export default function CadastroSucessoPage() {
  return (
    <div className={styles.container}>
      <div className={styles.background} />

      <div className={styles.content}>
        <div className={styles.logo}>
          <img src="/HORIZONTAL BRANCO SEM FUNDO.png" alt="Cretor" />
        </div>

        <div className={styles.card}>
          <div className={styles.iconSuccess}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#D4AF37" strokeWidth="2" />
              <path
                d="M8 12L11 15L16 9"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className={styles.title}>Cadastro Realizado com Sucesso!</h1>

          <p className={styles.description}>
            Muito obrigado por compartilhar suas preferências conosco! Nossa equipe está analisando seu perfil e em breve entraremos em contato com sugestões personalizadas de imóveis que atendem exatamente ao que você procura.
          </p>

          <div className={styles.infoBox}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div>
              <strong>O que acontece agora?</strong>
              <p>
                Em até 24 horas, um de nossos consultores entrará em contato por email ou telefone com uma seleção exclusiva de imóveis baseada no seu perfil.
              </p>
            </div>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 11L12 14L22 4"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3>Análise Personalizada</h3>
              <p>Nosso time analisa seu perfil detalhadamente</p>
            </div>

            <div className={styles.feature}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3>Imóveis Selecionados</h3>
              <p>Receba opções que combinam com você</p>
            </div>

            <div className={styles.feature}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3>Atendimento Exclusivo</h3>
              <p>Suporte completo em todo o processo</p>
            </div>
          </div>
        </div>

        <p className={styles.footer}>
          Fique atento ao seu email e telefone. Nossa equipe entrará em contato em breve!
        </p>
      </div>
    </div>
  )
}
