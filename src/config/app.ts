
export const config = {
  api: {
    baseURL: process.env.REACT_APP_API_URL || '/api',
    timeout: 10000,
  },
  security: {
    sanitizeResponses: true,
    enableCSP: true,
    jwtExpiration: 3600000, // 1 hour
  },
  errors: {
    default: 'เกิดข้อผิดพลาดที่ไม่คาดคิด',
    network: 'เกิดข้อผิดพลาดในการเชื่อมต่อ',
    unauthorized: 'ไม่มีสิทธิ์เข้าถึง',
    server: 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์',
    validation: 'ข้อมูลไม่ถูกต้อง',
  },
} as const;

export default config;
