import { InputHTMLAttributes, useState } from 'react'
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  rightIcon?: React.ReactNode
}

export default function Input({
  label,
  error,
  rightIcon,
  className = '',
  value,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value !== undefined && value !== ''

  return (
    <div className={styles.inputWrapper}>
      <div className={`${styles.inputContainer} ${error ? styles.error : ''}`}>
        {label && (
          <label className={`${styles.floatingLabel} ${(isFocused || hasValue) ? styles.floating : ''}`}>
            {label}
          </label>
        )}
        <input
          className={`${styles.input} ${className}`}
          value={value}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          {...props}
        />
        {rightIcon && (
          <div className={styles.iconWrapper}>
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <span className={styles.errorMessage}>{error}</span>
      )}
    </div>
  )
}
