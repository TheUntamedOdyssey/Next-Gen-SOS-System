
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle, Settings, User, Home } from 'lucide-react';

const NavBar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background flex justify-around items-center p-2 z-50">
      <Link to="/">
        <Button variant={isActive('/') ? "default" : "ghost"} className="flex flex-col h-16 w-16">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Button>
      </Link>
      <Link to="/contacts">
        <Button variant={isActive('/contacts') ? "default" : "ghost"} className="flex flex-col h-16 w-16">
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Contacts</span>
        </Button>
      </Link>
      <Link to="/settings">
        <Button variant={isActive('/settings') ? "default" : "ghost"} className="flex flex-col h-16 w-16">
          <Settings className="h-6 w-6" />
          <span className="text-xs mt-1">Settings</span>
        </Button>
      </Link>
      <Link to="/about">
        <Button variant={isActive('/about') ? "default" : "ghost"} className="flex flex-col h-16 w-16">
          <AlertCircle className="h-6 w-6" />
          <span className="text-xs mt-1">About</span>
        </Button>
      </Link>
    </div>
  );
};

export default NavBar;
