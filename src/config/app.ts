
export const config = {
  api: {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 30000,
  },
  security: {
    enableCSP: true,
    sanitizeResponses: true,
    requireAuth: true,
  },
  errors: {
    default: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
    network: 'เชื่อมต่อเครือข่ายไม่ได้ กรุณาตรวจสอบการเชื่อมต่อ',
    unauthorized: 'คุณไม่มีสิทธิ์เข้าถึงข้อมูลนี้',
    validation: 'ข้อมูลที่กรอกไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง',
    server: 'เซิร์ฟเวอร์ขัดข้อง กรุณาติดต่อผู้ดูแลระบบ',
  },
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },
};

export default config;
