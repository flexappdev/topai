
import { useState } from 'react';
import { TopList, ViewMode, SortBy } from '@/types/list';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Grid2x2, List, Menu, Search } from 'lucide-react';
import ListTiles from './ListTiles';
import ListTable from './ListTable';
import ListScroll from './ListScroll';

interface ListViewProps {
  lists: TopList[];
  onListSelect: (list: TopList) => void;
}

const ListView = ({ lists, onListSelect }: ListViewProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('tiles');
  const [sortBy, setSortBy] = useState<SortBy>('created');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLists = lists.filter(list =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    list.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    list.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedLists = [...filteredLists].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rank':
        return a.rank - b.rank;
      case 'updated':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'created':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const renderViewModeButtons = () => (
    <div className="flex gap-1 bg-muted rounded-lg p-1">
      <Button
        variant={viewMode === 'tiles' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setViewMode('tiles')}
        className={viewMode === 'tiles' ? 'bg-primary' : ''}
      >
        <Grid2x2 className="w-4 h-4" />
      </Button>
      <Button
        variant={viewMode === 'table' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setViewMode('table')}
        className={viewMode === 'table' ? 'bg-primary' : ''}
      >
        <List className="w-4 h-4" />
      </Button>
      <Button
        variant={viewMode === 'scroll' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setViewMode('scroll')}
        className={viewMode === 'scroll' ? 'bg-primary' : ''}
      >
        <Menu className="w-4 h-4" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search lists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 items-center">
          <Select value={sortBy} onValueChange={(value: SortBy) => setSortBy(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created">Latest</SelectItem>
              <SelectItem value="updated">Recently Updated</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="rank">Rank</SelectItem>
            </SelectContent>
          </Select>

          {renderViewModeButtons()}
        </div>
      </div>

      {sortedLists.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No lists found matching your search.</p>
        </div>
      ) : (
        <>
          {viewMode === 'tiles' && <ListTiles lists={sortedLists} onListSelect={onListSelect} />}
          {viewMode === 'table' && <ListTable lists={sortedLists} onListSelect={onListSelect} />}
          {viewMode === 'scroll' && <ListScroll lists={sortedLists} onListSelect={onListSelect} />}
        </>
      )}
    </div>
  );
};

export default ListView;
