import { createContext } from 'react'
import { chatService } from '../services'
import type { ChatWorkspaceModel } from '../types'

const chatWorkspace = chatService.getChatWorkspace()

export const ChatContext = createContext<ChatWorkspaceModel | null>(null)

export const chatContextValue = chatWorkspace
