import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useContext,
} from 'react';

const INITIAL_CONTEXT_VALUE = {
  toasts: [],
  addToast: () => {},
  dismissToast: () => {},
};

const ToastContext = createContext(INITIAL_CONTEXT_VALUE);

const createToast = ({ message, variant }) => ({
  id: crypto.randomUUID(),
  message,
  variant,
});

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    (toast) => {
      const newToast = createToast(toast);
      const nextToasts = [...toasts, newToast];

      setToasts(nextToasts);
    },
    [toasts]
  );

  const dismissToast = useCallback(
    (toastId) => {
      const updatedToasts = toasts.filter(({ id }) => id !== toastId);

      setToasts(updatedToasts);
    },
    [toasts]
  );

  const value = useMemo(
    () => ({
      toasts,
      addToast,
      dismissToast,
    }),
    [addToast, dismissToast, toasts]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export const useToasts = () => {
  return useContext(ToastContext);
};

export default ToastProvider;
