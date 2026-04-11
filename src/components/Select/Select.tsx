import { useState, useRef, useEffect } from 'react'
import styles from './Select.module.css'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label: string
  options: SelectOption[]
  error?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  placeholder?: string
  disabled?: boolean
}

export default function Select({
  label,
  options,
  error,
  value,
  onChange,
  className = '',
  placeholder,
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const hasValue = value !== undefined && value !== ''
  const selectedOption = options.find(o => o.value === value)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement
      item?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex, isOpen])

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(prev => !prev)
      setHighlightedIndex(-1)
    }
  }

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (isOpen && highlightedIndex >= 0) {
          handleSelect(options[highlightedIndex].value)
        } else {
          setIsOpen(true)
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          setHighlightedIndex(prev => (prev < options.length - 1 ? prev + 1 : 0))
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (isOpen) {
          setHighlightedIndex(prev => (prev > 0 ? prev - 1 : options.length - 1))
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
    }
  }

  return (
    <div className={`${styles.wrapper} ${className}`} ref={containerRef}>
      <div
        className={`${styles.control} ${isOpen ? styles.open : ''} ${error ? styles.error : ''} ${hasValue ? styles.hasValue : ''} ${disabled ? styles.disabled : ''}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <label className={`${styles.label} ${(isOpen || hasValue) ? styles.labelFloating : ''}`}>
          {placeholder && !hasValue && !isOpen ? placeholder : label}
        </label>

        {hasValue && (
          <span className={styles.value}>{selectedOption?.label}</span>
        )}

        <div className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <ul className={styles.dropdown} ref={listRef} role="listbox">
          {options.map((option, index) => (
            <li
              key={option.value}
              className={`${styles.option} ${option.value === value ? styles.optionSelected : ''} ${index === highlightedIndex ? styles.optionHighlighted : ''}`}
              onClick={() => handleSelect(option.value)}
              onMouseEnter={() => setHighlightedIndex(index)}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
              {option.value === value && (
                <svg className={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}
