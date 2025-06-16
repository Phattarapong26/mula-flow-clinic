
import { z } from 'zod';
import { security } from './security';

export const loginSchema = z.object({
  username: z.string().min(1, 'กรุณากรอกชื่อผู้ใช้'),
  password: z.string().min(1, 'กรุณากรอกรหัสผ่าน'),
  role: z.string().optional()
});

export const revenueSchemas = {
  create: z.object({
    branchId: z.string().min(1, 'กรุณาเลือกสาขา'),
    amount: z.number().min(0, 'จำนวนเงินต้องไม่ติดลบ'),
    source: z.string().min(1, 'กรุณาระบุแหล่งรายได้'),
    date: z.string().min(1, 'กรุณาระบุวันที่'),
    description: z.string().optional()
  }),
  update: z.object({
    amount: z.number().min(0, 'จำนวนเงินต้องไม่ติดลบ').optional(),
    source: z.string().min(1, 'กรุณาระบุแหล่งรายได้').optional(),
    date: z.string().min(1, 'กรุณาระบุวันที่').optional(),
    description: z.string().optional()
  })
};

export const expenseSchemas = {
  create: z.object({
    category: z.string().min(1, 'กรุณาเลือกหมวดหมู่'),
    expenseType: z.string().min(1, 'กรุณาระบุประเภทค่าใช้จ่าย'),
    amount: z.number().min(0.01, 'จำนวนเงินต้องมากกว่า 0'),
    description: z.string().min(1, 'กรุณาระบุรายละเอียด'),
    branchId: z.string().min(1, 'กรุณาเลือกสาขา'),
    date: z.string().min(1, 'กรุณาระบุวันที่').optional()
  }),
  update: z.object({
    category: z.string().min(1, 'กรุณาเลือกหมวดหมู่').optional(),
    expenseType: z.string().min(1, 'กรุณาระบุประเภทค่าใช้จ่าย').optional(),
    amount: z.number().min(0.01, 'จำนวนเงินต้องมากกว่า 0').optional(),
    description: z.string().min(1, 'กรุณาระบุรายละเอียด').optional(),
    branchId: z.string().min(1, 'กรุณาเลือกสาขา').optional(),
    date: z.string().min(1, 'กรุณาระบุวันที่').optional()
  })
};

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
