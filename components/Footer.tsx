import React, { useEffect, useState } from 'react';

const Footer: React.FC = () => {
  const [showFooter, setShowFooter] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 24);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`footer ${showFooter ? 'opacity-1' : 'opacity-0'}`}>
      <span className="footer-text">
        Made by <a id="linkanimation" href="https://maxim-bortnikov.netlify.app/" target="_blank" rel="noopener noreferrer">Maxim Bortnikov</a> using <a id="linkanimation" href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a> and <a id="linkanimation" href="https://www.perplexity.ai/" target="_blank" rel="noopener noreferrer">Perplexity</a>
      </span>

      <style jsx>{`
        .footer {
          position: relative;
          z-index: 400;
          border-radius: 8px;
          height: 56px;
          background-color: var(--theme-white);
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--foreground);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: opacity 0.3s ease;
        }
        .opacity-0 {
          opacity: 0;
        }
        .opacity-1 {
          opacity: 1;
        }
        .footer-text {
          font-size: 16px;
          letter-spacing: -.0035em;
          text-align: center;
          flex-grow: 1;
        }
        #linkanimation {
          text-decoration: none;
          color: var(--foreground);
          position: relative;
        }
        #linkanimation::before {
          position: absolute;
          content: "";
          width: 100%;
          height: 1px;
          background-color: var(--foreground);
          transform: scale(1,1);
          transition: background-color .5s ease-in-out;
          bottom: 0px;
        }
        #linkanimation:hover::before {
          animation: link ease 1s 1 300ms forwards;
          transform-origin: right;
        }
        @keyframes link {
          50% { transform: scaleX(0); }
          50.1% { transform: translateX(-100%) scaleX(-0.01); }
          100% { transform: translateX(-100%) scaleX(-1); }
        }
      `}</style>
    </div>
  );
};

export default Footer;
