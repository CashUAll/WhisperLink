import { useChatContext } from '../context/ChatContext'

export const useConversations = () => {
  const {
    brandName,
    brandCaption,
    currentUser,
    sideStats,
    actionButtons,
    conversations,
  } = useChatContext()

  return {
    brandName,
    brandCaption,
    currentUser,
    sideStats,
    actionButtons,
    conversations,
  }
}
