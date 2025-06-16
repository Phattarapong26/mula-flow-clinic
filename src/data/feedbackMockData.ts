
export interface FeedbackData {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  serviceType: string;
  date: string;
  branchName: string;
  status: 'pending' | 'reviewed' | 'resolved';
  response?: string;
  respondedBy?: string;
  respondedAt?: string;
  createdAt: string;
}

export const mockFeedbackData: FeedbackData[] = [
  {
    id: 'F001',
    customerName: 'สมชาย รักดี',
    rating: 5,
    comment: 'บริการดีมาก พนักงานใจดี',
    serviceType: 'ตรวจสายตา',
    date: '2024-01-15',
    branchName: 'สาขาหลัก',
    status: 'reviewed',
    response: 'ขอบคุณสำหรับความคิดเห็น เราจะพัฒนาบริการให้ดียิ่งขึ้น',
    respondedBy: 'ผู้จัดการสาขา',
    respondedAt: '2024-01-16',
    createdAt: '2024-01-15'
  }
];

// Export alias for compatibility
export const feedbacks = mockFeedbackData;
