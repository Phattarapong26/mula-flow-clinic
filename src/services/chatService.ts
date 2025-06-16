import api from './api';
import { z } from 'zod';
import DOMPurify from 'dompurify';

// Validation schemas
const chatMessageSchema = z.object({
  id: z.string(),
  sender: z.string(),
  message: z.string(),
  platform: z.enum(['line', 'facebook', 'website']),
  received_at: z.string(),
  is_bot: z.boolean(),
  response_time_secs: z.number().optional()
});

const chatStatsSchema = z.object({
  totalChats: z.number(),
  botResponses: z.number(),
  avgResponseTime: z.number(),
  botRate: z.number()
});

// Types
export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatStats = z.infer<typeof chatStatsSchema>;

// API functions
export const chatService = {
  // Get chat messages
  getMessages: async (chatId: string): Promise<ChatMessage[]> => {
    try {
      const response = await api.get(`/chats/${chatId}/messages`);
      const messages = response.data as any[];
      
      // Validate and sanitize each message
      return messages.map((msg) => {
        const validated = chatMessageSchema.parse(msg);
        return {
          ...validated,
          message: DOMPurify.sanitize(validated.message)
        };
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new Error('ไม่สามารถโหลดข้อความได้');
    }
  },

  // Send message
  sendMessage: async (chatId: string, message: string): Promise<ChatMessage> => {
    try {
      // Sanitize message before sending
      const sanitizedMessage = DOMPurify.sanitize(message);
      
      const response = await api.post(`/chats/${chatId}/messages`, {
        message: sanitizedMessage
      });
      
      return chatMessageSchema.parse(response.data);
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('ไม่สามารถส่งข้อความได้');
    }
  },

  // Get chat history
  getChatHistory: async (params: {
    platform?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ messages: ChatMessage[]; total: number }> => {
    try {
      const response = await api.get('/chats/history', { params });
      const data = response.data as { messages: any[]; total: number };
      
      const messages = data.messages.map((msg) => {
        const validated = chatMessageSchema.parse(msg);
        return {
          ...validated,
          message: DOMPurify.sanitize(validated.message)
        };
      });
      
      return {
        messages,
        total: data.total
      };
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw new Error('ไม่สามารถโหลดประวัติแชทได้');
    }
  },

  // Get chat statistics
  getChatStats: async (): Promise<ChatStats> => {
    try {
      const response = await api.get('/chats/stats');
      return chatStatsSchema.parse(response.data);
    } catch (error) {
      console.error('Error fetching chat stats:', error);
      throw new Error('ไม่สามารถโหลดสถิติแชทได้');
    }
  },

  // Get chat settings
  getChatSettings: async () => {
    try {
      const response = await api.get('/chats/settings');
      return response.data;
    } catch (error) {
      console.error('Error fetching chat settings:', error);
      throw new Error('ไม่สามารถโหลดการตั้งค่าแชทได้');
    }
  },

  // Update chat settings
  updateChatSettings: async (settings: any) => {
    try {
      const response = await api.put('/chats/settings', settings);
      return response.data;
    } catch (error) {
      console.error('Error updating chat settings:', error);
      throw new Error('ไม่สามารถอัปเดตการตั้งค่าแชทได้');
    }
  }
}; 