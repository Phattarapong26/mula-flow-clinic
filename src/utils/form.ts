import { z } from 'zod';
import { security } from './security';
import config from '@/config/app';

export interface FormError {
  field: string;
  message: string;
}

export interface FormState<T> {
  values: T;
  errors: FormError[];
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

export const formUtils = {
  // Initialize form state
  createInitialState<T>(initialValues: T): FormState<T> {
    return {
      values: initialValues,
      errors: [],
      touched: {},
      isSubmitting: false,
      isValid: false,
    };
  },

  // Validate form values against schema
  async validateForm<T>(values: T, schema: z.ZodSchema<T>): Promise<FormError[]> {
    try {
      await schema.parseAsync(values);
      return [];
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));
      }
      return [{ field: '', message: config.errors.validation }];
    }
  },

  // Sanitize form values
  sanitizeFormValues<T extends Record<string, any>>(values: T): T {
    return security.sanitizeSensitiveData(values);
  },

  // Handle form submission
  async handleSubmit<T>(
    values: T,
    schema: z.ZodSchema<T>,
    onSubmit: (sanitizedValues: T) => Promise<void>
  ): Promise<{ success: boolean; errors: FormError[] }> {
    try {
      // Validate form
      const errors = await this.validateForm(values, schema);
      if (errors.length > 0) {
        return { success: false, errors };
      }

      // Sanitize values
      const sanitizedValues = this.sanitizeFormValues(values);

      // Submit form
      await onSubmit(sanitizedValues);

      return { success: true, errors: [] };
    } catch (error) {
      return {
        success: false,
        errors: [{ field: '', message: error instanceof Error ? error.message : config.errors.default }],
      };
    }
  },

  // Handle field change
  handleChange<T>(
    state: FormState<T>,
    field: keyof T,
    value: any
  ): FormState<T> {
    return {
      ...state,
      values: {
        ...state.values,
        [field]: value,
      },
      touched: {
        ...state.touched,
        [field]: true,
      },
    };
  },

  // Handle field blur
  handleBlur<T>(
    state: FormState<T>,
    field: keyof T
  ): FormState<T> {
    return {
      ...state,
      touched: {
        ...state.touched,
        [field]: true,
      },
    };
  },

  // Reset form
  resetForm<T>(initialValues: T): FormState<T> {
    return this.createInitialState(initialValues);
  },

  // Check if form is valid
  async checkFormValidity<T>(
    values: T,
    schema: z.ZodSchema<T>
  ): Promise<boolean> {
    try {
      await schema.parseAsync(values);
      return true;
    } catch {
      return false;
    }
  },

  // Get field error
  getFieldError(errors: FormError[], field: string): string | undefined {
    return errors.find(err => err.field === field)?.message;
  },

  // Check if field is touched
  isFieldTouched(touched: Record<string, boolean>, field: string): boolean {
    return touched[field] || false;
  },

  // Check if field has error
  hasFieldError(errors: FormError[], field: string): boolean {
    return errors.some(err => err.field === field);
  },
};

export default formUtils; 