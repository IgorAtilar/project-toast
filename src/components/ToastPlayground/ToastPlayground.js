import React, { useState } from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

const createToast = ({ message, variant }) => ({
  id: crypto.randomUUID(),
  message,
  variant,
});

function ToastPlayground() {
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState(VARIANT_OPTIONS[0]);
  const [toasts, setToasts] = useState([]);

  const handleMessageChange = (event) => {
    const { value } = event.target;

    setMessage(value);
  };

  const handleVariantChange = (event) => {
    const { value } = event.target;

    setVariant(value);
  };

  const resetForm = () => {
    setMessage('');
    setVariant(VARIANT_OPTIONS[0]);
  };

  const addToast = (newToast) => {
    const nextToasts = [...toasts, newToast];

    setToasts(nextToasts);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newToast = createToast({ message, variant });

    addToast(newToast);

    resetForm();
  };

  const handleRemoveToast = (toastId) => {
    const updatedToasts = toasts.filter(({ id }) => id !== toastId);

    setToasts(updatedToasts);
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt='Cute toast mascot' src='/toast.png' />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf toasts={toasts} onRemoveToast={handleRemoveToast} />
      <form onSubmit={handleSubmit} className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor='message'
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              value={message}
              id='message'
              className={styles.messageInput}
              onChange={handleMessageChange}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => (
              <label key={option} htmlFor={`variant-${option}`}>
                <input
                  id={`variant-${option}`}
                  type='radio'
                  name='variant'
                  value={option}
                  checked={variant === option}
                  onChange={handleVariantChange}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type='submit'>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
