
export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderRole: 'staff' | 'manager' | 'admin' | 'customer';
  message: string;
  messageType: 'text' | 'image' | 'file' | 'voice';
  timestamp: string;
  isRead: boolean;
  isEdited: boolean;
  replyToId?: string;
}

export interface Chat {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'support';
  participants: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isArchived: boolean;
  isPinned: boolean;
  branchId?: string;
  createdAt: string;
}

export interface ChatGroup {
  id: string;
  name: string;
  description: string;
  members: ChatMember[];
  adminIds: string[];
  createdBy: string;
  createdAt: string;
  isPrivate: boolean;
  branchId?: string;
}

export interface ChatMember {
  id: string;
  name: string;
  role: 'staff' | 'manager' | 'admin';
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastSeen: string;
}

export interface ChatNotification {
  id: string;
  type: 'mention' | 'new_message' | 'group_invite' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export const chats: Chat[] = [
  {
    id: 'CH001',
    name: 'ทีมสาขาสยาม',
    type: 'group',
    participants: ['U001', 'U002', 'U003', 'U004'],
    lastMessage: 'ประชุมเช้านี้ 9:00 น. ห้องประชุมใหญ่',
    lastMessageTime: '2024-06-14T08:30:00Z',
    unreadCount: 3,
    isArchived: false,
    isPinned: true,
    branchId: 'BR001',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'CH002',
    name: 'แชทกับ คุณสมใจ ใจดี',
    type: 'support',
    participants: ['U001', 'C001'],
    lastMessage: 'ขอบคุณสำหรับการบริการดีๆ ครับ',
    lastMessageTime: '2024-06-14T07:45:00Z',
    unreadCount: 0,
    isArchived: false,
    isPinned: false,
    createdAt: '2024-06-10T00:00:00Z'
  },
  {
    id: 'CH003',
    name: 'ผู้จัดการทุกสาขา',
    type: 'group',
    participants: ['U001', 'U005', 'U006', 'U007'],
    lastMessage: 'รายงานยอดขายเดือนนี้ส่งครับ',
    lastMessageTime: '2024-06-13T18:20:00Z',
    unreadCount: 1,
    isArchived: false,
    isPinned: true,
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const chatMessages: ChatMessage[] = [
  {
    id: 'MSG001',
    chatId: 'CH001',
    senderId: 'U001',
    senderName: 'คุณสมชาย จันทร์เพ็ญ',
    senderRole: 'manager',
    message: 'ประชุมเช้านี้ 9:00 น. ห้องประชุมใหญ่',
    messageType: 'text',
    timestamp: '2024-06-14T08:30:00Z',
    isRead: false,
    isEdited: false
  },
  {
    id: 'MSG002',
    chatId: 'CH001',
    senderId: 'U002',
    senderName: 'นางสาวอนันต์ ใจดี',
    senderRole: 'staff',
    message: 'รับทราบครับ',
    messageType: 'text',
    timestamp: '2024-06-14T08:32:00Z',
    isRead: true,
    isEdited: false
  },
  {
    id: 'MSG003',
    chatId: 'CH002',
    senderId: 'C001',
    senderName: 'คุณสมใจ ใจดี',
    senderRole: 'customer',
    message: 'ขอบคุณสำหรับการบริการดีๆ ครับ',
    messageType: 'text',
    timestamp: '2024-06-14T07:45:00Z',
    isRead: true,
    isEdited: false
  }
];

export const chatGroups: ChatGroup[] = [
  {
    id: 'GR001',
    name: 'ทีมสาขาสยาม',
    description: 'กลุ่มสำหรับพนักงานสาขาสยาม',
    members: [
      {
        id: 'U001',
        name: 'คุณสมชาย จันทร์เพ็ญ',
        role: 'manager',
        status: 'online',
        lastSeen: '2024-06-14T08:35:00Z'
      },
      {
        id: 'U002',
        name: 'นางสาวอนันต์ ใจดี',
        role: 'staff',
        status: 'online',
        lastSeen: '2024-06-14T08:32:00Z'
      }
    ],
    adminIds: ['U001'],
    createdBy: 'U001',
    createdAt: '2024-01-15T00:00:00Z',
    isPrivate: false,
    branchId: 'BR001'
  }
];

export const chatNotifications: ChatNotification[] = [
  {
    id: 'NT001',
    type: 'mention',
    title: 'มีคนแมนชั่นคุณ',
    message: 'คุณสมชาย จันทร์เพ็ญ แมนชั่นคุณในกลุ่ม "ทีมสาขาสยาม"',
    timestamp: '2024-06-14T08:30:00Z',
    isRead: false,
    actionUrl: '/alerts/all'
  },
  {
    id: 'NT002',
    type: 'new_message',
    title: 'ข้อความใหม่',
    message: 'มีข้อความใหม่ใน "ผู้จัดการทุกสาขา"',
    timestamp: '2024-06-13T18:20:00Z',
    isRead: false,
    actionUrl: '/alerts/all'
  }
];
