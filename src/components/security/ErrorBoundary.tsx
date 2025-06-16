import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundaryClass extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} errorInfo={this.state.errorInfo} />;
    }

    return this.props.children;
  }
}

const ErrorFallback: React.FC<{ error: Error | null; errorInfo: ErrorInfo | null }> = ({ error, errorInfo }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  React.useEffect(() => {
    toast({
      title: "An error occurred",
      description: "Something went wrong. Please try again later.",
      variant: "destructive"
    });
  }, [toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">
            We apologize for the inconvenience. Please try again later.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Reload Page
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go to Home
            </button>
          </div>
        </div>
        {process.env.NODE_ENV === 'development' && error && (
          <div className="mt-8 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Details:</h3>
            <pre className="text-sm text-gray-600 whitespace-pre-wrap">
              {error.toString()}
              {errorInfo?.componentStack}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

const ErrorBoundary: React.FC<Props> = (props) => {
  return <ErrorBoundaryClass {...props} />;
};

export default ErrorBoundary;
