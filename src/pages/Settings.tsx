import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import DailyListTable from '@/components/DailyListTable';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

const Settings = () => {
  const [isDark, setIsDark] = useState(true);
  const [mongoStatus, setMongoStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [collections, setCollections] = useState<any[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [collectionStats, setCollectionStats] = useState<any>(null);
  const [lists, setLists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedList, setSelectedList] = useState<any | null>(null);
  const { toast } = useToast();

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

  const testMongoConnection = async () => {
    setMongoStatus('connecting');
    try {
      const response = await fetch('/api/mongo');
      if (response.ok) {
        const data = await response.json();
        setCollections(data.collections);
        setMongoStatus('connected');
        toast({
          title: "MongoDB Connected",
          description: "Successfully connected to MongoDB database.",
        });
      } else {
        throw new Error('Failed to connect to MongoDB');
      }
    } catch (error) {
      setMongoStatus('disconnected');
      toast({
        title: "MongoDB Connection Failed",
        description: "Could not connect to MongoDB. Please check your connection settings.",
        variant: "destructive",
      });
    }
  };

  const fetchCollectionStats = async (collectionName: string) => {
    try {
      const response = await fetch(`/api/mongo/${collectionName}`);
      if (response.ok) {
        const data = await response.json();
        setCollectionStats(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch collection statistics.",
        variant: "destructive",
      });
    }
  };

  const fetchLists = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/daily');
      if (response.ok) {
        const data = await response.json();
        setLists(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch lists.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    testMongoConnection();
    fetchLists();
  }, []);

  useEffect(() => {
    if (selectedCollection) {
      fetchCollectionStats(selectedCollection);
    }
  }, [selectedCollection]);

  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <Header onThemeToggle={handleThemeToggle} isDark={isDark} />
      <main className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <Tabs defaultValue="mongo">
          <TabsList>
            <TabsTrigger value="mongo">Mongo</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="lists">Lists</TabsTrigger>
          </TabsList>
          <TabsContent value="mongo">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center space-x-3">
                  {mongoStatus === 'connected' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : mongoStatus === 'disconnected' ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />
                  )}
                  <div>
                    <h3 className="font-medium">MongoDB Connection</h3>
                    <p className="text-sm text-muted-foreground">
                      {mongoStatus === 'connected' 
                        ? 'Connected to MongoDB database' 
                        : mongoStatus === 'disconnected' 
                          ? 'Disconnected from MongoDB' 
                          : 'Connecting to MongoDB...'}
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={testMongoConnection}
                  disabled={mongoStatus === 'connecting'}
                  variant="outline"
                >
                  {mongoStatus === 'connecting' ? 'Testing...' : 'Test Connection'}
                </Button>
              </div>

              {mongoStatus === 'connected' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">Collections</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {collections.map((collection) => (
                        <Button
                          key={collection.name}
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => setSelectedCollection(collection.name)}
                        >
                          {collection.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {selectedCollection && (
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">Collection Stats: {selectedCollection}</h3>
                      <div className="space-y-2">
                        <p>Total Documents: {collectionStats?.count || 'N/A'}</p>
                        <p>First Document: {collectionStats?.firstDoc ? JSON.stringify(collectionStats.firstDoc) : 'N/A'}</p>
                        <p>Latest Document: {collectionStats?.latestDoc ? JSON.stringify(collectionStats.latestDoc) : 'N/A'}</p>
                        <p>Sample Document: {collectionStats?.sampleDoc ? JSON.stringify(collectionStats.sampleDoc) : 'N/A'}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="users">
            <p>Users settings will go here.</p>
          </TabsContent>
          <TabsContent value="images">
            <p>Images settings will go here.</p>
          </TabsContent>
          <TabsContent value="videos">
            <p>Videos settings will go here.</p>
          </TabsContent>
          <TabsContent value="lists">
            <DailyListTable lists={lists} onListSelect={setSelectedList} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </main>
      <Footer onRandomClick={handleRandomClick} />

      <Sheet open={selectedList !== null} onOpenChange={(isOpen) => !isOpen && setSelectedList(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{selectedList?.name}</SheetTitle>
            <SheetDescription>
              {selectedList?.tagline}
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <pre>{JSON.stringify(selectedList, null, 2)}</pre>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Settings;
