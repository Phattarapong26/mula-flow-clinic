import { useState, useCallback } from 'react';
import { z } from 'zod';
import { FormState, FormError, formUtils } from '@/utils/form';

interface UseFormOptions<T> {
  initialValues: T;
  validationSchema: z.ZodSchema<T>;
  onSubmit: (values: T) => Promise<void>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormOptions<T>) {
  const [formState, setFormState] = useState<FormState<T>>(() =>
    formUtils.createInitialState(initialValues)
  );

  const handleChange = useCallback((field: keyof T, value: any) => {
    setFormState(prev => formUtils.handleChange(prev, field, value));
  }, []);

  const handleBlur = useCallback((field: keyof T) => {
    setFormState(prev => formUtils.handleBlur(prev, field));
  }, []);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const { success, errors } = await formUtils.handleSubmit(
        formState.values,
        validationSchema,
        onSubmit
      );

      setFormState(prev => ({
        ...prev,
        errors,
        isValid: success,
        isSubmitting: false,
      }));

      return success;
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        errors: [{ field: '', message: error instanceof Error ? error.message : 'An error occurred' }],
        isValid: false,
        isSubmitting: false,
      }));
      return false;
    }
  }, [formState.values, validationSchema, onSubmit]);

  const resetForm = useCallback(() => {
    setFormState(formUtils.resetForm(initialValues));
  }, [initialValues]);

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setFormState(prev => formUtils.handleChange(prev, field, value));
  }, []);

  const setFieldError = useCallback((field: string, message: string) => {
    setFormState(prev => ({
      ...prev,
      errors: [
        ...prev.errors.filter(err => err.field !== field),
        { field, message },
      ],
    }));
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setFormState(prev => ({
      ...prev,
      errors: prev.errors.filter(err => err.field !== field),
    }));
  }, []);

  const validateField = useCallback(async (field: keyof T) => {
    try {
      await validationSchema.parseAsync({
        ...formState.values,
        [field]: formState.values[field],
      });
      clearFieldError(field as string);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find(err => err.path[0] === field);
        if (fieldError) {
          setFieldError(field as string, fieldError.message);
        }
      }
      return false;
    }
  }, [formState.values, validationSchema, clearFieldError, setFieldError]);

  const getFieldError = useCallback((field: string) => {
    return formUtils.getFieldError(formState.errors, field);
  }, [formState.errors]);

  const isFieldTouched = useCallback((field: string) => {
    return formUtils.isFieldTouched(formState.touched, field);
  }, [formState.touched]);

  const hasFieldError = useCallback((field: string) => {
    return formUtils.hasFieldError(formState.errors, field);
  }, [formState.errors]);

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    clearFieldError,
    validateField,
    getFieldError,
    isFieldTouched,
    hasFieldError,
  };
}

export default useForm; 