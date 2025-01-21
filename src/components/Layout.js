import React from 'react';
import Header from './Header';

function Layout({ children, setIsLoggedIn }) {
  return (
    <div>
      <header>
        <Header setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>{children}</main>
      <footer className="footer_container">
        <p>
          © {new Date().getFullYear()} Taskana. All rights reserved.{' '}
          <a href="https://leogonzalezdev.com" target="_blank" rel="noopener noreferrer">
            leogonzalezdev.com
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Layout;
