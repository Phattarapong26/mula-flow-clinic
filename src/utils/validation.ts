
import { z } from 'zod';
import { security } from './security';

export const loginSchema = z.object({
  username: z.string().min(1, 'กรุณากรอกชื่อผู้ใช้'),
  password: z.string().min(1, 'กรุณากรอกรหัสผ่าน'),
  role: z.string().optional()
});

export const registerSchema = z.object({
  email: z.string().email('กรุณากรอกอีเมลที่ถูกต้อง'),
  password: z.string().min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'),
  confirmPassword: z.string().min(1, 'กรุณายืนยันรหัสผ่าน')
}).refine((data) => data.password === data.confirmPassword, {
  message: "รหัสผ่านไม่ตรงกัน",
  path: ["confirmPassword"],
});

export const revenueSchemas = {
  create: z.object({
    branchId: z.string().min(1, 'กรุณาเลือกสาขา'),
    month: z.string().min(1, 'กรุณาเลือกเดือน'),
    year: z.number().min(2000, 'ปีไม่ถูกต้อง'),
    revenue: z.number().min(0, 'รายได้ต้องไม่ติดลบ'),
    target: z.number().min(0, 'เป้าหมายต้องไม่ติดลบ'),
    services: z.object({
      eyeExam: z.number().min(0, 'รายได้ตรวจสายตาต้องไม่ติดลบ'),
      glasses: z.number().min(0, 'รายได้แว่นตาต้องไม่ติดลบ'),
      contactLens: z.number().min(0, 'รายได้คอนแทคเลนส์ต้องไม่ติดลบ'),
      surgery: z.number().min(0, 'รายได้ผ่าตัดต้องไม่ติดลบ')
    }).strict()
  }).strict(),
  update: z.object({
    branchId: z.string().min(1, 'กรุณาเลือกสาขา').optional(),
    month: z.string().min(1, 'กรุณาเลือกเดือน').optional(),
    year: z.number().min(2000, 'ปีไม่ถูกต้อง').optional(),
    revenue: z.number().min(0, 'รายได้ต้องไม่ติดลบ').optional(),
    target: z.number().min(0, 'เป้าหมายต้องไม่ติดลบ').optional(),
    services: z.object({
      eyeExam: z.number().min(0, 'รายได้ตรวจสายตาต้องไม่ติดลบ'),
      glasses: z.number().min(0, 'รายได้แว่นตาต้องไม่ติดลบ'),
      contactLens: z.number().min(0, 'รายได้คอนแทคเลนส์ต้องไม่ติดลบ'),
      surgery: z.number().min(0, 'รายได้ผ่าตัดต้องไม่ติดลบ')
    }).strict().optional()
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
