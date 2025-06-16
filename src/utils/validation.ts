
import { z } from 'zod';
import { security } from './security';

export const loginSchema = z.object({
  username: z.string().min(1, 'กรุณากรอกชื่อผู้ใช้'),
  password: z.string().min(1, 'กรุณากรอกรหัสผ่าน'),
  role: z.string().optional()
});

export const validateForm = <T>(data: T, schema: z.ZodSchema<T>) => {
  try {
    const sanitizedData = security.sanitizeSensitiveData(data);
    const validatedData = schema.parse(sanitizedData);
    return {
      isValid: true,
      data: validatedData,
      errors: {}
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach(err => {
        const field = err.path.join('.');
        errors[field] = err.message;
      });
      return {
        isValid: false,
        data: null,
        errors
      };
    }
    return {
      isValid: false,
      data: null,
      errors: { general: 'เกิดข้อผิดพลาดในการตรวจสอบข้อมูล' }
    };
  }
};
