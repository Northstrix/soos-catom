// components/Disclaimer.tsx

import React from 'react';
import styles from './Disclaimer.module.css';

interface DisclaimerProps {
  onAgree: () => void;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ onAgree }) => {
  return (
    <div className={styles.disclaimerContainer}>
      <div className={styles.disclaimerContent}>
        <h2 className={styles.disclaimerTitle}>Important Disclaimer</h2>
        <p>Welcome to SOOS CATOM. Before proceeding, please read and accept the following terms:</p>
        <ul>
          <li>This application is an experimental tool made for educational and demonstrational purposes only. It is not intended for commercial use or as a production-ready tool.</li>
          <li>This application is provided &quot;as is,&quot; without warranties or guarantees of any kind, whether expressed or implied.</li>
          <li>The developer of this application shall not be held liable for any damages, losses, or consequences arising from its use.</li>
          <li>You assume full responsibility for your use of this application and any content generated or manipulated within it.</li>
        </ul>
        <p>By clicking the button below, you accept and agree to these terms:</p>
        <button className={styles.disclaimerButton} onClick={onAgree}>
          I Accept and Agree to These Terms
        </button>
      </div>
    </div>
  );
};

export default Disclaimer;
