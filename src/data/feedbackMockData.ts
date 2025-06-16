
export interface FeedbackData {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  serviceType: string;
  date: string;
  branchName: string;
}

export const mockFeedbackData: FeedbackData[] = [
  {
    id: 'F001',
    customerName: 'สมชาย รักดี',
    rating: 5,
    comment: 'บริการดีมาก พนักงานใจดี',
    serviceType: 'ตรวจสายตา',
    date: '2024-01-15',
    branchName: 'สาขาหลัก'
  }
];
