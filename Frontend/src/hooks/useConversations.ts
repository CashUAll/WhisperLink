import { useChatStore } from '../store/ChatStore'

export function useConversations() {
  const { brandName, currentUser, conversations } = useChatStore()
  return { brandName, currentUser, conversations }
}
