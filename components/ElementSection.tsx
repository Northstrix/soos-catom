import React, { useState } from 'react';
import CLikeInputField from '@/components/c-like-input-field/CLikeInputField';
import ChronicleButton from '@/components/chronicle-button/ChronicleButton';
import styles from './Home.module.css';

interface ElementSectionProps {
  currentPage: string;
  pages: Array<{ name: string; id: string; icon: string }>;
  pageElements: Array<{ id: string; content: string }>;
  setPageElements: (elements: Array<{ id: string; content: string }>) => void;
}

export const ElementSection: React.FC<ElementSectionProps> = ({ currentPage, pages, pageElements, setPageElements }) => {
  const [newElementContent, setNewElementContent] = useState('');

  const addElement = () => {
    if (newElementContent) {
      const match = newElementContent.match(/page_section_(\d+)/);
      if (match) {
        const id = match[1];
        setPageElements([...pageElements, { id, content: newElementContent }]);
        setNewElementContent('');
      }
    }
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Add Element to {pages.find(p => p.id === currentPage)?.name}</h2>
      <CLikeInputField
        placeholder="<div class='page-section' data-name='example'>..."
        onChange={(e) => setNewElementContent(e.target.value)}
        value={newElementContent}
      />
      <ChronicleButton 
        text="Add Element" 
        onClick={addElement} 
        width="100%" 
        name="addElement"
        value="addElement"
      />
    </div>
  );
};
