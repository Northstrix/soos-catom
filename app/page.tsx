// page.tsx
'use client'

import React, { useState } from 'react';
import { PageSection } from '../components/PageSection';
import { PageList } from '../components/PageList';
import { ElementSection } from '../components/ElementSection';
import { ElementList } from '../components/ElementList';
import { CodeGenerator } from '../components/CodeGenerator';
import Disclaimer from '../components/Disclaimer';
import styles from '../components/Home.module.css';
import Footer from "../components/Footer"

export default function Home() {
  const [pages, setPages] = useState<Array<{ name: string; id: string; icon: string }>>([]);
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const [pageElements, setPageElements] = useState<{ [pageId: string]: Array<{ id: string; content: string }> }>({});
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const handleAgree = () => {
    setShowDisclaimer(false);
  };

  if (showDisclaimer) {
    return <Disclaimer onAgree={handleAgree} />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SOOS CATOM</h1>
      
      <PageSection pages={pages} setPages={setPages} />

      <PageList 
        pages={pages}
        setPages={setPages}
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        setPageElements={setPageElements}
      />

      {currentPage && (
        <ElementSection 
          currentPage={currentPage} 
          pages={pages} 
          pageElements={pageElements[currentPage] || []} 
          setPageElements={(elements) => setPageElements({...pageElements, [currentPage]: elements})}
        />
      )}

      <ElementList 
        pageElements={currentPage ? (pageElements[currentPage] || []) : []}
        setPageElements={(elements) => currentPage ? setPageElements({...pageElements, [currentPage]: elements}) : null}
      />

      <CodeGenerator pages={pages} pageElements={pageElements} />

      <Footer/>
    </div>
  );
}
