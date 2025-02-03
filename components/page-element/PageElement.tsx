import React from 'react';
import styles from './PageElement.module.css';

interface PageElementProps {
  content: string;
}

const PageElement: React.FC<PageElementProps> = ({ content }) => {
  const match = content.match(/data-name="([^"]+)"/);
  const name = match ? match[1] : 'Unknown';

  return (
    <div className={styles.pageElement}>
      <h3>{name}</h3>
      <pre>{content}</pre>
    </div>
  );
};

export default PageElement;
