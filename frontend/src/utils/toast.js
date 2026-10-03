import { toast } from 'sonner';

/**
 * Toast notification utility with SlingShot theme
 * Provides consistent toast notifications across the application
 */

// Toast configuration defaults
const defaultOptions = {
  duration: 3500,
  position: 'top-right',
  closeButton: true,
  style: {
    background: '#ffffff',
    border: '1px solid #f97316',
    borderRadius: '0.75rem',
    padding: '1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#1e293b',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
  }
};

/**
 * Success toast notification
 * @param {string} message - Success message to display
 * @param {object} options - Additional toast options
 */
export const showToastSuccess = (message, options = {}) => {
  return toast.success(message, { ...defaultOptions, ...options });
};

/**
 * Error toast notification
 * @param {string} message - Error message to display
 * @param {object} options - Additional toast options
 */
export const showToastError = (message, options = {}) => {
  return toast.error(message, {
    ...defaultOptions,
    duration: 5000,
    style: {
      ...defaultOptions.style,
      border: '1px solid #ef4444'
    },
    ...options
  });
};

/**
 * Warning toast notification
 * @param {string} message - Warning message to display
 * @param {object} options - Additional toast options
 */
export const showToastWarning = (message, options = {}) => {
  return toast.warning(message, {
    ...defaultOptions,
    style: {
      ...defaultOptions.style,
      border: '1px solid #f59e0b'
    },
    ...options
  });
};

/**
 * Info toast notification
 * @param {string} message - Info message to display
 * @param {object} options - Additional toast options
 */
export const showToastInfo = (message, options = {}) => {
  return toast.info(message, {
    ...defaultOptions,
    style: {
      ...defaultOptions.style,
      border: '1px solid #3b82f6'
    },
    ...options
  });
};

/**
 * Loading toast notification
 * @param {string} message - Loading message to display
 * @param {object} options - Additional toast options
 */
export const showToastLoading = (message, options = {}) => {
  return toast.loading(message, {
    ...defaultOptions,
    duration: Infinity,
    ...options
  });
};

/**
 * Promise toast - automatically handles success/error for async operations
 * @param {Promise} promise - The promise to track
 * @param {object} messages - Object with success and error messages
 * @param {object} options - Additional toast options
 */
export const showToastPromise = (promise, messages, options = {}) => {
  return toast.promise(promise, {
    loading: messages.loading || 'Processing...',
    success: messages.success || 'Success!',
    error: messages.error || 'Something went wrong',
    ...defaultOptions,
    ...options
  });
};

// Export the default toast instance for direct usage if needed
export default toast;
