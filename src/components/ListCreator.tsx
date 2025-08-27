
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Sparkles } from 'lucide-react';
import { generateMockList } from '@/data/mockData';
import { TopList } from '@/types/list';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

interface ListCreatorProps {
  onListCreated: (list: TopList) => void;
}

const ListCreator = ({ onListCreated }: ListCreatorProps) => {
  const [keyword, setKeyword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!keyword.trim()) return;
    setIsDialogOpen(true);
  };

  const handleRemind = async () => {
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, keyword }),
      });
      toast({
        title: "Reminder Set",
        description: "We'll notify you when your list is ready.",
      });
      setIsDialogOpen(false);
      setEmail('');

      // Simulate list generation after reminder is set
      setIsGenerating(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newList = generateMockList(keyword);
      onListCreated(newList);
      setKeyword('');
      setIsGenerating(false);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to set reminder.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-text">
            <Plus className="w-5 h-5" />
            Create New Top 100 List
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter keyword (e.g., Movies, Restaurants, Books...)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
              className="flex-1"
            />
            <Button
              onClick={handleGenerate}
              disabled={!keyword.trim() || isGenerating}
              className="bg-primary hover:bg-primary-600"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Generating...
                </div>
              ) : (
                'Generate'
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Enter a keyword and we'll generate a comprehensive Top 100 list with detailed information for each item.
          </p>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>List Generation in Progress</DialogTitle>
            <DialogDescription>
              Your list is being generated and we'll let you know when it's ready.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleRemind} className="w-full">
              Remind me
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ListCreator;
