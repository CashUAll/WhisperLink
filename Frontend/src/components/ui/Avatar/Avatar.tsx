import type { CSSProperties } from 'react'
import type { PresenceState } from '../../../types'
import { joinClassNames } from '../../../utils'
import './Avatar.css'

interface AvatarProps {
  name: string
  label?: string
  accent?: string
  status?: PresenceState
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({
  name,
  label,
  accent,
  status,
  size = 'md',
}: AvatarProps) {
  const style = accent
    ? ({
        backgroundImage: accent,
      } as CSSProperties)
    : undefined

  return (
    <div
      className={joinClassNames('avatar', `avatar--${size}`)}
      style={style}
      aria-label={label ?? name}
    >
      <span className="avatar__text">{name}</span>
      {status ? <span className={joinClassNames('avatar__status', `avatar__status--${status}`)} /> : null}
    </div>
  )
}
