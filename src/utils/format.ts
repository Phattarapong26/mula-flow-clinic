import { config } from '@/config/app';

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: config.currency.code,
    minimumFractionDigits: config.currency.decimals,
    maximumFractionDigits: config.currency.decimals
  }).format(value);
};

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('th-TH', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(d);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('th-TH').format(value);
};

export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('th-TH', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100);
}; 