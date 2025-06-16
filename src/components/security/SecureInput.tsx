import React, { forwardRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { sanitizeInput } from '@/utils/security';
import DOMPurify from 'dompurify';

interface SecureInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
  };
  onValidationChange?: (isValid: boolean) => void;
}

const SecureInput = forwardRef<HTMLInputElement, SecureInputProps>(
  ({ className, label, error, validation, onValidationChange, onChange, value, ...props }, ref) => {
    const [isValid, setIsValid] = useState(true);
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
      if (validation) {
        const validate = () => {
          let valid = true;
          const strValue = String(localValue || '');

          if (validation.required && !strValue) {
            valid = false;
          }

          if (validation.pattern && strValue && !validation.pattern.test(strValue)) {
            valid = false;
          }

          if (validation.minLength && strValue.length < validation.minLength) {
            valid = false;
          }

          if (validation.maxLength && strValue.length > validation.maxLength) {
            valid = false;
          }

          setIsValid(valid);
          onValidationChange?.(valid);
        };

        validate();
      }
    }, [localValue, validation, onValidationChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Sanitize input
      const sanitizedValue = sanitizeInput(e.target.value);
      
      // Update local state
      setLocalValue(sanitizedValue);
      
      // Create synthetic event with sanitized value
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: sanitizedValue
        }
      };

      // Call original onChange if provided
      onChange?.(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {DOMPurify.sanitize(label)}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            !isValid && "border-red-500 focus-visible:ring-red-500",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          value={localValue}
          onChange={handleChange}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{DOMPurify.sanitize(error)}</p>
        )}
        {!isValid && !error && validation && (
          <p className="text-sm text-red-500">
            {validation.required && !localValue && "This field is required"}
            {validation.pattern && localValue && !validation.pattern.test(String(localValue)) && "Invalid format"}
            {validation.minLength && localValue && String(localValue).length < validation.minLength && `Minimum length is ${validation.minLength}`}
            {validation.maxLength && localValue && String(localValue).length > validation.maxLength && `Maximum length is ${validation.maxLength}`}
          </p>
        )}
      </div>
    );
  }
);

SecureInput.displayName = 'SecureInput';

export default SecureInput;
