import { ReactNode } from 'react'
import styles from './Card.module.css'

interface CardProps {
  title?: string
  subtitle?: string
  icon?: ReactNode
  value?: string | number
  change?: {
    value: string
    positive: boolean
  }
  children?: ReactNode
  className?: string
}

export default function Card({
  title,
  subtitle,
  icon,
  value,
  change,
  children,
  className = ''
}: CardProps) {
  return (
    <div className={`${styles.card} ${className}`}>
      {(title || icon) && (
        <div className={styles.cardHeader}>
          {icon && <div className={styles.icon}>{icon}</div>}
          <div className={styles.headerText}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>
      )}

      {value !== undefined && (
        <div className={styles.cardBody}>
          <div className={styles.value}>{value}</div>
          {change && (
            <div className={`${styles.change} ${change.positive ? styles.positive : styles.negative}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                {change.positive ? (
                  <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M12 5V19M5 12L12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
              <span>{change.value}</span>
            </div>
          )}
        </div>
      )}

      {children && <div className={styles.cardContent}>{children}</div>}
    </div>
  )
}
