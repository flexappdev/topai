
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Settings, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  onThemeToggle: () => void;
  isDark: boolean;
}

const Header = ({ onThemeToggle, isDark }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-effect">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          import { Link } from 'react-router-dom';

          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-xl font-bold gradient-text hover:bg-primary/10"
            >
              <Home className="w-5 h-5 mr-2" />
              TOPAI
            </Button>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onThemeToggle}
            className="hover:bg-primary/10"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          import { Link } from 'react-router-dom';

          <Link to="/settings">
            <Button variant="ghost" size="sm" className="hover:bg-primary/10">
              <Settings className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
