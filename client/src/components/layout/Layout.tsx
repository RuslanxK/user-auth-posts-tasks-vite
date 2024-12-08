import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-background min-h-screen p-4">
      {children}
    </div>
  );
};

export default Layout;
