
import { useState } from 'react';
import { httpClient } from '@/utils/httpClient';
import { useToast } from '@/hooks/use-toast';

interface UseApiOptions {
  showToast?: boolean;
  sanitizeResponse?: boolean;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const get = async (url: string, options: UseApiOptions = {}, params?: any) => {
    try {
      setLoading(true);
      setError(null);
      const response = await httpClient.get<T>(url, { params });
      setData(response.data || response);
      
      if (options.onSuccess) {
        options.onSuccess();
      }
      
      if (options.showToast) {
        toast({
          title: 'Success',
          description: 'Data loaded successfully'
        });
      }
      
      return response;
    } catch (err) {
      const error = err as Error;
      setError(error);
      
      if (options.onError) {
        options.onError(error);
      } else {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive'
        });
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const post = async (url: string, data: any, options: UseApiOptions = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await httpClient.post<T>(url, data);
      
      if (options.onSuccess) {
        options.onSuccess();
      }
      
      if (options.showToast) {
        toast({
          title: 'Success',
          description: 'Operation completed successfully'
        });
      }
      
      return response;
    } catch (err) {
      const error = err as Error;
      setError(error);
      
      if (options.onError) {
        options.onError(error);
      } else {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive'
        });
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    get,
    post
  };
}

export default useApi;
