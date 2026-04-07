import type { ConversationPreview, PresenceState } from '../types'

export const joinClassNames = (
  ...classNames: Array<string | false | null | undefined>
) => classNames.filter(Boolean).join(' ')

export const getInitials = (label: string) =>
  label
    .split(' ')
    .map((item) => item[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export const formatUnreadCount = (count: number) => (count > 9 ? '9+' : `${count}`)

export const getPresenceLabel = (presence: PresenceState) => {
  if (presence === 'focus') return 'Focus mode'
  if (presence === 'away') return 'Away now'
  if (presence === 'offline') return 'Offline'
  return 'Online'
}

export const groupConversations = (conversations: ConversationPreview[]) =>
  conversations.reduce<Record<string, ConversationPreview[]>>((groups, conversation) => {
    if (!groups[conversation.section]) {
      groups[conversation.section] = []
    }

    groups[conversation.section].push(conversation)
    return groups
  }, {})
