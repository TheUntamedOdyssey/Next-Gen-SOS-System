
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageCircle, User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-secondary border-t z-10">
      <div className="max-w-md mx-auto px-6 py-2">
        <div className="flex justify-around">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
            end
          >
            {({ isActive }) => (
              <>
                <Home className={`nav-link-icon ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`nav-link-label ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>Home</span>
              </>
            )}
          </NavLink>
          
          <NavLink 
            to="/chat" 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <MessageCircle className={`nav-link-icon ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`nav-link-label ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>Chat</span>
              </>
            )}
          </NavLink>
          
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <User className={`nav-link-icon ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`nav-link-label ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>Profile</span>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
