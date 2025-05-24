
import { useState, useEffect } from 'react';
import { TopList } from '@/types/list';
import { sampleLists } from '@/data/mockData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ListCreator from '@/components/ListCreator';
import ListView from '@/components/ListView';
import ListDetail from '@/components/ListDetail';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const [lists, setLists] = useState<TopList[]>(sampleLists);
  const [selectedList, setSelectedList] = useState<TopList | null>(null);
  const [activeTab, setActiveTab] = useState('browse');
  const { toast } = useToast();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
  }, [isDark]);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    toast({
      title: `Switched to ${!isDark ? 'Dark' : 'Light'} Mode`,
      description: `You're now using ${!isDark ? 'dark' : 'light'} theme.`,
    });
  };

  const handleListCreated = (newList: TopList) => {
    setLists(prev => [newList, ...prev]);
    setActiveTab('browse');
    toast({
      title: 'List Created Successfully!',
      description: `Your "${newList.name}" list has been generated with 100 items.`,
    });
  };

  const handleListSelect = (list: TopList) => {
    setSelectedList(list);
  };

  const handleBackToLists = () => {
    setSelectedList(null);
  };

  const handleRandomClick = () => {
    if (selectedList && selectedList.items.length > 0) {
      const randomIndex = Math.floor(Math.random() * selectedList.items.length);
      const randomItem = selectedList.items[randomIndex];
      toast({
        title: `Random Item: ${randomItem.name}`,
        description: `Rank #${randomItem.rank} - ${randomItem.tagline}`,
      });
    } else if (lists.length > 0) {
      const randomList = lists[Math.floor(Math.random() * lists.length)];
      setSelectedList(randomList);
      setActiveTab('browse');
      toast({
        title: `Random List: ${randomList.name}`,
        description: randomList.tagline,
      });
    }
  };

  if (selectedList) {
    return (
      <div className="min-h-screen flex flex-col w-full bg-background">
        <Header onThemeToggle={handleThemeToggle} isDark={isDark} />
        <main className="flex-1 container mx-auto px-4 py-6">
          <ListDetail list={selectedList} onBack={handleBackToLists} />
        </main>
        <Footer onRandomClick={handleRandomClick} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <Header onThemeToggle={handleThemeToggle} isDark={isDark} />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="gradient-text">TOPAI</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create, explore, and discover comprehensive Top 100 lists on any topic. 
              Powered by AI to deliver detailed rankings and insights.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="create">Create List</TabsTrigger>
              <TabsTrigger value="browse">Browse Lists</TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-6">
              <ListCreator onListCreated={handleListCreated} />
            </TabsContent>

            <TabsContent value="browse" className="space-y-6">
              <ListView lists={lists} onListSelect={handleListSelect} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer onRandomClick={handleRandomClick} />
    </div>
  );
};

export default Index;
