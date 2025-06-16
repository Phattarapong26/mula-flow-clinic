import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/services/api';
import { security } from '@/utils/security';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  showToast?: boolean;
  sanitizeResponse?: boolean;
}

export function useApi<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const execute = useCallback(async <R = T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    options: UseApiOptions<R> = {},
    params?: any
  ) => {
    const {
      onSuccess,
      onError,
      showToast = true,
      sanitizeResponse = true
    } = options;

    try {
      setLoading(true);
      setError(null);

      let response: R;
      switch (method) {
        case 'get':
          response = await apiService.get<R>(url, params);
          break;
        case 'post':
          response = await apiService.post<R>(url, params);
          break;
        case 'put':
          response = await apiService.put<R>(url, params);
          break;
        case 'delete':
          response = await apiService.delete<R>(url);
          break;
        default:
          throw new Error('Invalid method');
      }

      // Sanitize response if needed
      const sanitizedResponse = sanitizeResponse ? security.sanitizeSensitiveData(response) : response;
      
      // Type assertion to unknown first to avoid type mismatch
      setData(sanitizedResponse as unknown as T);
      onSuccess?.(sanitizedResponse);

      if (showToast) {
        toast({
          title: 'Success',
          description: 'Operation completed successfully',
        });
      }

      return sanitizedResponse;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      onError?.(error);

      if (showToast) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }

      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const get = useCallback(<R = T>(url: string, options?: UseApiOptions<R>, params?: any) => {
    return execute<R>('get', url, options, params);
  }, [execute]);

  const post = useCallback(<R = T>(url: string, data: any, options?: UseApiOptions<R>) => {
    return execute<R>('post', url, options, data);
  }, [execute]);

  const put = useCallback(<R = T>(url: string, data: any, options?: UseApiOptions<R>) => {
    return execute<R>('put', url, options, data);
  }, [execute]);

  const del = useCallback(<R = T>(url: string, options?: UseApiOptions<R>) => {
    return execute<R>('delete', url, options);
  }, [execute]);

  return {
    data,
    loading,
    error,
    get,
    post,
    put,
    delete: del,
    setData,
    setError,
  };
}

export default useApi; 