import React from 'react';
import PageElement from '@/components/page-element/PageElement';
import { IconTrash } from '@tabler/icons-react';
import styles from './Home.module.css';

interface ElementListProps {
  pageElements: Array<{ id: string; content: string }>;
  setPageElements: (elements: Array<{ id: string; content: string }>) => void;
}

export const ElementList: React.FC<ElementListProps> = ({ pageElements, setPageElements }) => {
  const removeElement = (id: string) => {
    setPageElements(pageElements.filter(element => element.id !== id));
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Elements</h2>
      <div className={styles.elementList}>
        {pageElements.map((element) => (
          <div key={element.id} className={styles.elementItem}>
            <PageElement content={element.content} />
            <button 
              className={styles.removeButton}
              onClick={() => removeElement(element.id)}
              aria-label="Remove element"
            >
              <IconTrash size={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
