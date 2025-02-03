// components/CodeGenerator.tsx
import React, { useState } from 'react';
import ChronicleButton from '@/components/chronicle-button/ChronicleButton';
import CLikeMultiLineReadOnlyInput from '@/components/c-like-multi-line-read-only-input/CLikeMultiLineReadOnlyInput';
import styles from './Home.module.css';

// Define interfaces for page elements and pages
interface PageElement {
  id: string;
  content: string;
}

interface Page {
  name: string;
  id: string;
  icon: string; // Icon name as a string
}

interface CodeGeneratorProps {
  pages: Array<Page>;
  pageElements: { [pageId: string]: Array<PageElement> };
}

// CodeGenerator component
export const CodeGenerator: React.FC<CodeGeneratorProps> = ({ pages, pageElements }) => {
  const [generatedCode, setGeneratedCode] = useState('');

  const generateCode = () => {
    // Prepare data for each page and its associated elements
    const pageData = pages.map(page => ({
      name: page.name,
      id: page.id,
      iconName: page.icon || '', // Use the icon name directly
      elements: pageElements[page.id] || [], // Ensure elements array is always defined
    }));

    // Generate variables for each page's elements
    const pageElementArrays = pageData.map(page => {
      const elementIds = page.elements.map(el => el.id);
      return `
        var ${page.id.replace(/-/g, '_')} = ${JSON.stringify(elementIds)};
        var ${page.id.replace(/-/g, '_')}_count = ${elementIds.length};
      `;
    }).join('\n');

    const navbarHtml = `
    <div id="soos-catom-overlay">
      <div id="navbar">
        <a href="#" onclick="soosCatomShowPage('home')">
          SOOS CATOM
        </a>
        <div class="icon-container">
          ${pageData.map((page) => `
            <div class="tooltip" tabindex="0">
              <span class="icon ti ti-${page.iconName}" onclick="soosCatomShowPage('${page.id}')"></span>
              <span class="tooltip-text">${page.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    <style>
      :root {
        --color-light: #c7c7cf;
        --color-hover: #f7f7ff;
        --color-dark-bg: #080810;
        --tooltip-bg: #181820;
        --tooltip-text-color: #f7f7f7;
      }
      
      .page__header {
        display: none;
      }
      
      #soos-catom-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: transparent;
        z-index: 1000000;
        pointer-events: none;
      }
  
      #navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 64px;
        background-color: var(--color-dark-bg);
        border-bottom: 1px solid #444444;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 40px;
        z-index: 1000001;
        pointer-events: auto;
      }
  
      /* Center icons container */
      .icon-container {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
      }
  
      /* Title styles */
      #navbar > a {
        margin: 0;
        color: var(--color-light);
        font-size: 26px;
        font-weight: bold;
        text-decoration: none;
        transition: color 0.3s ease;
      }
  
      /* Title hover effect */
      #navbar > a:hover {
        color: var(--color-hover);
      }
  
      /* Tooltip container */
      .tooltip {
        position: relative;
        display: inline-block;
        cursor: pointer;
        margin-left: 10px;
      }
  
      /* Tooltip text */
      .tooltip-text {
        visibility: hidden;
        position: absolute;
        width: clamp(224px, 100%, 250px);
        font-size: 19px;
        padding: 5px;
        border-radius: 10px;
        text-align: center;
        background-color: var(--tooltip-bg);
        color: var(--tooltip-text-color);
        z-index: 1000002;
        top: calc(100% + 26px);
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        box-shadow: 0 0 0 2px var(--tooltip-text-color);
      }
  
      /* Show tooltip on hover */
      .tooltip:hover .tooltip-text {
        visibility: visible;
        opacity: 1;
      }
  
      /* Icon styles */
      .icon {
        font-size: clamp(24px, 2vw, 36px);
        color: var(--color-light);
      }
  
      .icon:hover {
        color: var(--color-hover);
      }
    </style>
  `;  
  
    // Generate JavaScript logic for managing visibility of elements
    const js = `
    var soosCatomPages = ${JSON.stringify(pageData)};
  
    ${pageElementArrays}
  
    function soosCatomShowPage(pageId) {
      // Hide all elements from all pages first
      soosCatomPages.forEach(function(page) {
        page.elements.forEach(function(el) {
          var section = document.querySelector('.page_section_' + el.id);
          if (section) {
            var parentSection = section.closest('.page-section');
            if (parentSection) {
              parentSection.style.display = 'none'; // Hide the element
            }
          }
        });
      });
  
      // Show elements for the selected page
      var currentPage = soosCatomPages.find(page => page.id === pageId);
      if (currentPage) {
        currentPage.elements.forEach(function(el) {
          var section = document.querySelector('.page_section_' + el.id);
          if (section) {
            var parentSection = section.closest('.page-section');
            if (parentSection) {
              parentSection.style.display = 'block'; // Show the element
            }
          }
        });
      } else {
        console.error('Page not found:', pageId);
      }
    }
  
    document.addEventListener('DOMContentLoaded', function() {
      // Create navbar placeholder
      var placeholder = document.createElement('div');
      placeholder.style.height = '64px';
      placeholder.style.width = '100%';
      document.body.insertBefore(placeholder, document.body.firstChild);
  
      // Inject overlay and navbar into the DOM
      var overlayContainer = document.createElement('div');
      overlayContainer.innerHTML = \`${navbarHtml.replace(/`/g, '\\`')}\`;
      document.body.appendChild(overlayContainer);
  
      // Add Tabler Icons Webfont stylesheet to the DOM
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css';
      document.head.appendChild(link);
      
      // Show the first page on load, or handle case where no pages exist
      if (soosCatomPages.length > 0) {
        soosCatomShowPage('${pages[0].id}');
      } else {
        console.warn('No pages available to show.');
      }
    });
  `;  

    // Combine everything into a single script tag
    const fullCode = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
      <style>
        :root { --color-dark: rgb(71,85,105); }
      </style>
      <script>${js}</script>
    `;

    setGeneratedCode(fullCode);
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Generate Code</h2>
      <ChronicleButton
        text="Generate Code"
        onClick={generateCode}
        width="100%"
        name="generateCode"
        value="generateCode"
      />
      {generatedCode && (
        <div style={{ marginTop: '20px' }}>
          <CLikeMultiLineReadOnlyInput value={generatedCode} />
        </div>
      )}
    </div>
  );
};
