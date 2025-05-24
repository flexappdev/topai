
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FooterProps {
  onRandomClick: () => void;
}

const Footer = ({ onRandomClick }: FooterProps) => {
  return (
    <footer className="sticky bottom-0 z-50 w-full border-t border-border/40 glass-effect">
      <div className="container flex h-14 items-center justify-center px-4">
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
