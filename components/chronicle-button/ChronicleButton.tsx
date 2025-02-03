import React from 'react';
import styles from './ChronicleButton.module.css';

interface ChronicleButtonProps {
  text: string;
  onClick?: () => void;
  width?: string;
  outlined?: boolean;
  outlinePaddingAdjustment?: string;
  borderRadius?: string;
  fontFamily?: string;
  customForeground?: string;
  isActive?: boolean;
  name?: string;
  value?: string;
  isRadio?: boolean;
}

const ChronicleButton: React.FC<ChronicleButtonProps> = ({ 
  text, 
  onClick, 
  width = 'auto',
  outlined = false,
  outlinePaddingAdjustment = '2px',
  borderRadius = '8px',
  fontFamily,
  customForeground = "var(--theme-black)",
  isActive = false,
  name,
  value,
  isRadio = false
}) => {
  const buttonStyle = {
    '--text-color': outlined ? 'var(--theme-white)' : customForeground,
    '--outline-padding-adjustment': outlinePaddingAdjustment,
    width: isRadio ? 'auto' : width,
    borderRadius: borderRadius,
    fontFamily: fontFamily,
  } as React.CSSProperties;

  const displayText = text;

  return (
    <button 
      className={`${styles.chronicleButton} ${outlined ? styles.outlined : ''} ${isActive ? styles.active : ''} ${isRadio ? styles.radio : ''}`}
      onClick={onClick}
      style={buttonStyle}
      name={name}
      value={value}
      title={text} // Add full text as title for hover effect
    >
      <span><em>{displayText}</em></span>
      <span><em>{displayText}</em></span>
    </button>
  );
};

export default ChronicleButton;
