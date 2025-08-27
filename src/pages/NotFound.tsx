import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    toast({
      title: `Switched to ${!isDark ? 'Dark' : 'Light'} Mode`,
      description: `You're now using ${!isDark ? 'dark' : 'light'} theme.`,
    });
  };

  const handleRandomClick = () => {
    toast({
      title: "Random Section",
      description: "This would take you to a random section in a real implementation.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <Header onThemeToggle={handleThemeToggle} isDark={isDark} />
      <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Oops! Page not found</p>
          <Link to="/">
            <Button variant="default" className="mt-4">
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer onRandomClick={handleRandomClick} />
    </div>
  );
};

export default NotFound;
