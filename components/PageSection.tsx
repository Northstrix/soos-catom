import React, { useState } from 'react';
import CLikeInputField from '@/components/c-like-input-field/CLikeInputField';
import ChronicleButton from '@/components/chronicle-button/ChronicleButton';
import styles from './Home.module.css';

function generateId(name: string, pageCount: number): string {
  const sanitizedName = name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `soos-catom-${sanitizedName}-${pageCount + 1}`;
}

interface PageSectionProps {
  pages: Array<{ name: string; id: string; icon: string }>;
  setPages: React.Dispatch<React.SetStateAction<Array<{ name: string; id: string; icon: string }>>>;
}

export const PageSection: React.FC<PageSectionProps> = ({ pages, setPages }) => {
  const [newPageName, setNewPageName] = useState('');
  const [newPageIcon, setNewPageIcon] = useState('');

  const addPage = () => {
    if (newPageName && newPageIcon) {
      const newId = generateId(newPageName, pages.length);
      setPages([...pages, { name: newPageName, id: newId, icon: newPageIcon }]);
      setNewPageName('');
      setNewPageIcon('');
    }
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Add Page</h2>
      <CLikeInputField
        placeholder="Page Name"
        onChange={(e) => setNewPageName(e.target.value)}
        value={newPageName}
      />
      <CLikeInputField
        placeholder="Tabler Icon Name (e.g., home)"
        onChange={(e) => setNewPageIcon(e.target.value)}
        value={newPageIcon}
      />
      <ChronicleButton 
        text="Add Page" 
        onClick={addPage} 
        width="100%" 
        name="addPage"
        value="addPage"
      />
    </div>
  );
};
