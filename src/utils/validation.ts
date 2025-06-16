import Joi from 'joi';
import { sanitizeObject } from './security';
import { z } from 'zod';
import DOMPurify from 'dompurify';

// Login validation
export const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.empty': 'Username is required',
    'any.required': 'Username is required'
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'any.required': 'Password is required'
  }),
  role: Joi.string().required().messages({
    'any.required': 'Role is required'
  })
});

// Patient creation validation
export const patientSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'First name is required',
      'string.min': 'First name must be at least 2 characters',
      'string.max': 'First name must be less than 50 characters'
    }),
  lastName: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Last name is required',
      'string.min': 'Last name must be at least 2 characters',
      'string.max': 'Last name must be less than 50 characters'
    }),
  dateOfBirth: Joi.date()
    .max('now')
    .required()
    .messages({
      'date.base': 'Invalid date of birth',
      'date.max': 'Date of birth cannot be in the future'
    }),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .required()
    .messages({
      'any.only': 'Invalid gender selected'
    }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be 10 digits'
    }),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().pattern(/^[0-9]{5}$/).required()
  }).required()
});

// Appointment validation
export const appointmentSchema = Joi.object({
  patientId: Joi.string().required(),
  doctorId: Joi.string().required(),
  date: Joi.date().min('now').required(),
  time: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
  type: Joi.string().valid('checkup', 'consultation', 'follow-up').required(),
  notes: Joi.string().max(500).allow('')
});

export const prescriptionSchema = Joi.object({
  patientId: Joi.string().required(),
  doctorId: Joi.string().required(),
  medications: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      dosage: Joi.string().required(),
      frequency: Joi.string().required(),
      duration: Joi.string().required()
    })
  ).min(1).required(),
  notes: Joi.string().max(500).allow('')
});

// Custom validation messages
export const validationMessages = {
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  invalidPhone: 'Please enter a valid phone number',
  invalidDate: 'Please enter a valid date',
  invalidTime: 'Please enter a valid time',
  minLength: (field: string, length: number) => `${field} must be at least ${length} characters`,
  maxLength: (field: string, length: number) => `${field} must be less than ${length} characters`,
  passwordRequirements: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
};

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'any.required': 'Password is required'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Please confirm your password'
  })
});

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  data: any;
}

export const validateForm = (data: any, schema: Joi.ObjectSchema): ValidationResult => {
  const { error, value } = schema.validate(data, { abortEarly: false });
  
  if (error) {
    const errors: Record<string, string> = {};
    error.details.forEach(detail => {
      const path = detail.path[0] as string;
      errors[path] = detail.message;
    });
    return { isValid: false, errors, data: null };
  }
  
  return { isValid: true, errors: {}, data: value };
};

// Common validation schemas
export const commonSchemas = {
  id: z.string().uuid(),
  name: z.string().min(1).max(100).transform(val => DOMPurify.sanitize(val)),
  email: z.string().email().transform(val => DOMPurify.sanitize(val)),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/),
  date: z.string().datetime(),
  amount: z.number().min(0),
  percentage: z.number().min(0).max(100),
  status: z.enum(['active', 'inactive', 'deleted']),
};

// Branch schemas
export const branchSchemas = {
  create: z.object({
    name: commonSchemas.name,
    address: z.string().min(1).max(200).transform(val => DOMPurify.sanitize(val)),
    province: z.string().min(1).max(100).transform(val => DOMPurify.sanitize(val)),
    status: commonSchemas.status,
  }),
  update: z.object({
    name: commonSchemas.name.optional(),
    address: z.string().min(1).max(200).transform(val => DOMPurify.sanitize(val)).optional(),
    province: z.string().min(1).max(100).transform(val => DOMPurify.sanitize(val)).optional(),
    status: commonSchemas.status.optional(),
  }),
};

// Revenue schemas
export const revenueSchemas = {
  create: z.object({
    branchId: commonSchemas.id,
    month: z.string().min(1),
    year: z.number().min(2000),
    revenue: commonSchemas.amount,
    target: commonSchemas.amount,
    services: z.object({
      eyeExam: commonSchemas.amount,
      glasses: commonSchemas.amount,
      contactLens: commonSchemas.amount,
      surgery: commonSchemas.amount,
    }),
  }),
};

// Expense schemas
export const expenseSchemas = {
  create: z.object({
    branchId: commonSchemas.id,
    category: z.string().min(1),
    amount: commonSchemas.amount,
    description: z.string().max(500).transform(val => DOMPurify.sanitize(val)),
    date: commonSchemas.date,
  }),
};

// Staff schemas
export const staffSchemas = {
  create: z.object({
    name: commonSchemas.name,
    email: commonSchemas.email,
    phone: commonSchemas.phone,
    position: z.string().min(1),
    branchId: commonSchemas.id,
  }),
};

// Validation helper functions
export const validate = {
  // Generic validation function
  async validate<T>(schema: z.ZodSchema<T>, data: unknown): Promise<T> {
    try {
      return await schema.parseAsync(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(error.errors.map(e => e.message).join(', '));
      }
      throw error;
    }
  },

  // Sanitize input
  sanitizeInput(input: string): string {
    return DOMPurify.sanitize(input);
  },

  // Validate and sanitize object
  sanitizeObject<T extends Record<string, any>>(obj: T): T {
    const sanitized: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        sanitized[key] = DOMPurify.sanitize(value);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized as T;
  },
};

export default validate;
