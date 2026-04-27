import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { joinClassNames } from '../../../utils'
import './Button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  note?: string
  variant?: 'primary' | 'surface' | 'ghost'
  block?: boolean
}

export function Button({
  children,
  note,
  variant = 'surface',
  block = false,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={joinClassNames(
        'ui-button',
        `ui-button--${variant}`,
        block && 'ui-button--block',
        className,
      )}
      {...props}
    >
      <span className="ui-button__label">{children}</span>
      {note ? <span className="ui-button__note">{note}</span> : null}
    </button>
  )
}
