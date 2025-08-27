import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const About = () => {
  const [readmeContent, setReadmeContent] = useState('');
  const [isDark, setIsDark] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
    
    fetch('/README.md')
      .then((response) => response.text())
      .then((text) => setReadmeContent(text));
  }, [isDark]);

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
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <ReactMarkdown>{readmeContent}</ReactMarkdown>
        </div>
      </main>
      <Footer onRandomClick={handleRandomClick} />
    </div>
  );
};

export default About;
