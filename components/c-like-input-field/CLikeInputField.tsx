import React, { forwardRef, Ref, useState, useEffect } from 'react';
import styles from './CLikeInputField.module.css';

type CLikeInputFieldProps = {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const CLikeInputField = forwardRef<HTMLInputElement, CLikeInputFieldProps>(
  ({ placeholder = '', onChange, value }, ref: Ref<HTMLInputElement>) => {
    const [inputDir, setInputDir] = useState<'ltr' | 'rtl'>('ltr');

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      if (inputValue) {
        const isRTL = /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(inputValue);
        setInputDir(isRTL ? 'rtl' : 'ltr');
      } else {
        const isPlaceholderRTL = /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(placeholder);
        setInputDir(isPlaceholderRTL ? 'rtl' : 'ltr');
      }
      if (onChange) {
        onChange(event);
      }
    };

    useEffect(() => {
      const isPlaceholderRTL = /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(placeholder);
      setInputDir(isPlaceholderRTL ? 'rtl' : 'ltr');
    }, [placeholder]);

    return (
      <div className={styles.inputContainer}>
        <input
          type="text"
          ref={ref}
          placeholder={placeholder}
          className={styles.CLikeInputField}
          dir={inputDir}
          onInput={handleInput}
          onChange={onChange}
          value={value}
        />
      </div>
    );
  }
);

CLikeInputField.displayName = 'CLikeInputField';

export default CLikeInputField;