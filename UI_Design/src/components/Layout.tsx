
import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavbar = false }) => {
  return (
    <div className="app-container">
      <div className="page-container page-transition-enter">
        {children}
      </div>
      {!hideNavbar && <Navbar />}
    </div>
  );
};

export default Layout;
