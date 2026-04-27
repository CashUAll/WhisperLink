import { useChatContext } from './useChatContext'

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
