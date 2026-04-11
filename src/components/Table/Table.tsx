import { ReactNode } from 'react'
import styles from './Table.module.css'

export interface Column<T> {
  key: string
  header: string
  render?: (item: T) => ReactNode
  width?: string
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (item: T) => void
  isLoading?: boolean
  emptyMessage?: string
}

export default function Table<T extends { id: string }>({
  columns,
  data,
  onRowClick,
  isLoading = false,
  emptyMessage = 'Nenhum registro encontrado'
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Carregando...</p>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="16" r="0.5" fill="currentColor" stroke="currentColor" />
        </svg>
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick?.(item)}
              className={onRowClick ? styles.clickable : ''}
            >
              {columns.map((column) => (
                <td key={`${item.id}-${column.key}`}>
                  {column.render
                    ? column.render(item)
                    : String((item as any)[column.key] ?? '-')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
