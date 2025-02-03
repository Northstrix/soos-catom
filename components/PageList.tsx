import React, { useEffect } from 'react';
import ChronicleButton from '@/components/chronicle-button/ChronicleButton';
import { IconTrash } from '@tabler/icons-react';
import styles from './Home.module.css';

interface PageListProps {
  pages: Array<{ name: string; id: string; icon: string }>;
  setPages: React.Dispatch<React.SetStateAction<Array<{ name: string; id: string; icon: string }>>>;
  currentPage: string | null;
  setCurrentPage: React.Dispatch<React.SetStateAction<string | null>>;
  setPageElements: React.Dispatch<React.SetStateAction<{ [pageId: string]: Array<{ id: string; content: string }> }>>;
}

export const PageList: React.FC<PageListProps> = ({
  pages,
  setPages,
  currentPage,
  setCurrentPage,
  setPageElements
}) => {
  
  // Effect to load Tabler Icons stylesheet
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css';
    document.head.appendChild(link);

    // Cleanup function to remove the link when the component unmounts
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const removePage = (id: string) => {
    setPages(pages.filter(page => page.id !== id));
    if (currentPage === id) {
      setCurrentPage(null);
      setPageElements(prevElements => {
        const { [id]: removed, ...rest } = prevElements;
        return rest;
      });
    }
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Pages</h2>
      <div className={styles.pageList}>
        {pages.map((page) => (
          <div key={page.id} className={styles.pageItem}>
            <div className={styles.pageItemContent}>
              {/* Displaying icon using Tabler Icons webfont */}
              <i className={`ti ti-${page.icon} ${styles.icon}`} aria-hidden="true"></i>
              <ChronicleButton
                text={page.name}
                onClick={() => setCurrentPage(page.id)}
                isActive={currentPage === page.id}
                name="pageSelection"
                value={page.id}
                isRadio={true}
              />
            </div>
            <button
              className={styles.removeButton}
              onClick={() => removePage(page.id)}
              aria-label={`Remove ${page.name}`}
            >
              <IconTrash size={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
