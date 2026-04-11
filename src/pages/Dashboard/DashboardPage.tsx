import Card from '../../components/Card/Card'
import styles from './DashboardPage.module.css'

export default function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Bem-vindo de volta! Aqui está o resumo do seu dia.</p>
        </div>
        <button className={styles.primaryButton}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Novo Projeto
        </button>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <Card
          title="Projetos Ativos"
          value="12"
          change={{ value: "+3 este mês", positive: true }}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />

        <Card
          title="Membros da Equipe"
          value="48"
          change={{ value: "+5 este mês", positive: true }}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />

        <Card
          title="Taxa de Conclusão"
          value="87%"
          change={{ value: "+2.5% vs. anterior", positive: true }}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />

        <Card
          title="Receita Mensal"
          value="R$ 45.2K"
          change={{ value: "+12.5% vs. anterior", positive: true }}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
      </div>

      {/* Charts & Activity */}
      <div className={styles.contentGrid}>
        {/* Recent Activity */}
        <Card title="Atividades Recentes" className={styles.activityCard}>
          <div className={styles.activityList}>
            {[
              { user: 'João Silva', action: 'criou o projeto', target: 'Website Redesign', time: 'há 2 horas', color: '#D4AF37' },
              { user: 'Maria Santos', action: 'completou a tarefa', target: 'UI Design', time: 'há 3 horas', color: '#F5C563' },
              { user: 'Pedro Costa', action: 'comentou em', target: 'Sprint Planning', time: 'há 5 horas', color: '#B8860B' },
              { user: 'Ana Oliveira', action: 'adicionou um membro em', target: 'Marketing Team', time: 'há 1 dia', color: '#DAA520' }
            ].map((activity, index) => (
              <div key={index} className={styles.activityItem}>
                <div className={styles.activityAvatar} style={{ background: activity.color }}>
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </div>
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>
                    <strong>{activity.user}</strong> {activity.action} <span>{activity.target}</span>
                  </p>
                  <span className={styles.activityTime}>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card title="Ações Rápidas" className={styles.actionsCard}>
          <div className={styles.actionsList}>
            <button className={styles.actionButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <span className={styles.actionTitle}>Criar Documento</span>
                <span className={styles.actionDesc}>Novo relatório ou especificação</span>
              </div>
            </button>

            <button className={styles.actionButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
              </svg>
              <div>
                <span className={styles.actionTitle}>Agendar Reunião</span>
                <span className={styles.actionDesc}>Com a equipe ou cliente</span>
              </div>
            </button>

            <button className={styles.actionButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21M4 7H20M6 10H18M6 14H18M6 18H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <span className={styles.actionTitle}>Convidar Membro</span>
                <span className={styles.actionDesc}>Adicionar à equipe</span>
              </div>
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
