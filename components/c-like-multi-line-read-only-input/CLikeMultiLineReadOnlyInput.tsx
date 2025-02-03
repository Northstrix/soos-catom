// components/CLikeMultiLineReadOnlyInput.tsx
import React, { forwardRef, Ref } from 'react';
import styles from './CLikeMultiLineReadOnlyInput.module.css';

type CLikeMultiLineReadOnlyInputProps = {
  placeholder?: string;
  value?: string;
  height?: string;
};

const CLikeMultiLineReadOnlyInput = forwardRef<HTMLTextAreaElement, CLikeMultiLineReadOnlyInputProps>(
  ({ placeholder = '', value, height = '400px' }, ref: Ref<HTMLTextAreaElement>) => {
    return (
      <div className={styles.inputContainer}>
        <textarea
          ref={ref}
          placeholder={placeholder}
          className={styles.CLikeMultiLineReadOnlyInput}
          readOnly
          value={value}
          style={{ height }}
        />
      </div>
    );
  }
);

CLikeMultiLineReadOnlyInput.displayName = 'CLikeMultiLineReadOnlyInput';

export default CLikeMultiLineReadOnlyInput;
