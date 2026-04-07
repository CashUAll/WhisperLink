import type { InputHTMLAttributes } from 'react'
import { joinClassNames } from '../../../utils'
import './Input.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  prefixLabel?: string
}

export function Input({ prefixLabel, className, ...props }: InputProps) {
  return (
    <div className={joinClassNames('input-shell', prefixLabel && 'input-shell--prefixed')}>
      {prefixLabel ? <span className="input-shell__prefix">{prefixLabel}</span> : null}
      <input className={joinClassNames('input-shell__field', className)} {...props} />
    </div>
  )
}
