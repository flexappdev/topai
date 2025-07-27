
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onRandomClick: () => void;
}

const Footer = ({ onRandomClick }: FooterProps) => {
  return (
    <footer className="sticky bottom-0 z-50 w-full border-t border-border/40 glass-effect">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link to="/about">
          <Button variant="ghost" size="sm" className="hover:bg-primary/10">
            About
          </Button>
        </Link>
        <Button
          onClick={onRandomClick}
          className="bg-primary hover:bg-primary-600 text-white font-medium px-6"
        >
          Random Section
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
