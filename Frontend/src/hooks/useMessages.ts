import { useChatContext } from '../context/ChatContext'

export const useMessages = () => {
  const { activeConversation, currentUser } = useChatContext()

  return {
    currentUser,
    activeConversation,
    messages: activeConversation.messages,
  }
}
