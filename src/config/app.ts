// Application configuration
export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 30000,
    retryAttempts: 3,
  },

  // Security Configuration
  security: {
    cspEnabled: process.env.NEXT_PUBLIC_CSP_ENABLED === 'true',
    hstsEnabled: process.env.NEXT_PUBLIC_HSTS_ENABLED === 'true',
    xssProtection: process.env.NEXT_PUBLIC_XSS_PROTECTION === 'true',
    sensitiveDataCacheDuration: parseInt(process.env.NEXT_PUBLIC_SENSITIVE_DATA_CACHE_DURATION || '300', 10),
  },

  // Feature Flags
  features: {
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    errorTracking: process.env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING === 'true',
  },

  // Cache Configuration
  cache: {
    duration: parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || '300', 10),
  },

  // Rate Limiting
  rateLimit: {
    requests: parseInt(process.env.NEXT_PUBLIC_RATE_LIMIT_REQUESTS || '100', 10),
    window: parseInt(process.env.NEXT_PUBLIC_RATE_LIMIT_WINDOW || '60', 10),
  },

  // Error Messages
  errors: {
    default: 'An error occurred. Please try again later.',
    network: 'Network error. Please check your connection.',
    unauthorized: 'You are not authorized to perform this action.',
    forbidden: 'You do not have permission to access this resource.',
    notFound: 'The requested resource was not found.',
    validation: 'Please check your input and try again.',
  },

  // Success Messages
  success: {
    default: 'Operation completed successfully.',
    created: 'Record created successfully.',
    updated: 'Record updated successfully.',
    deleted: 'Record deleted successfully.',
  },

  // Loading States
  loading: {
    default: 'Loading...',
    saving: 'Saving...',
    deleting: 'Deleting...',
    exporting: 'Exporting...',
  },

  // Pagination
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
  },

  // Date Formats
  dateFormats: {
    display: 'DD/MM/YYYY',
    api: 'YYYY-MM-DD',
    datetime: 'DD/MM/YYYY HH:mm',
    time: 'HH:mm',
  },

  // Currency
  currency: {
    code: 'THB',
    symbol: '฿',
    decimals: 2,
  },
};

export default config; 