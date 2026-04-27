import { useChatContext } from './useChatContext'

export const useMessages = () => {
  const { activeConversation, currentUser } = useChatContext()

  return {
    currentUser,
    activeConversation,
    messages: activeConversation.messages,
  }
}
