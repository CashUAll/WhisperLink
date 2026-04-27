import { useChatStore } from '../store/ChatStore'

export function useMessages() {
  const { activeConversation, currentUser } = useChatStore()
  return { activeConversation, currentUser }
}
