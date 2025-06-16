
const config = {
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',
    timeout: 30000
  },
  errors: {
    default: 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ',
    validation: 'ข้อมูลไม่ถูกต้อง',
    network: 'เกิดข้อผิดพลาดในการเชื่อมต่อ',
    unauthorized: 'ไม่มีสิทธิ์เข้าถึง',
    forbidden: 'ไม่อนุญาตให้เข้าถึง',
    notFound: 'ไม่พบข้อมูลที่ต้องการ'
  },
  ui: {
    itemsPerPage: 10,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
  }
};

export default config;
