
import { useState } from 'react';
import { TopList, ListItem, ViewMode } from '@/types/list';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Grid2x2, List, Menu, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ListDetailProps {
  list: TopList;
  onBack: () => void;
}

const ListDetail = ({ list, onBack }: ListDetailProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('tiles');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rank' | 'name'>('rank');

  const filteredItems = list.items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'rank') return a.rank - b.rank;
    return a.name.localeCompare(b.name);
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

  const renderItemTiles = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {sortedItems.map((item) => (
        <Card key={item.id} className="group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 glass-effect border-primary/20">
          <div className="aspect-square relative overflow-hidden rounded-t-lg">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 left-2">
              <Badge className="bg-primary text-white font-bold">#{item.rank}</Badge>
            </div>
          </div>
          <CardContent className="p-3">
            <h4 className="font-semibold text-sm line-clamp-1 mb-1">{item.name}</h4>
            <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{item.tagline}</p>
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderItemTable = () => (
    <div className="rounded-lg border border-primary/20 glass-effect overflow-hidden">
      <div className="max-h-96 overflow-y-auto">
        <div className="grid grid-cols-12 gap-4 p-3 border-b font-semibold text-sm">
          <div className="col-span-1">Rank</div>
          <div className="col-span-3">Name</div>
          <div className="col-span-4">Tagline</div>
          <div className="col-span-4">Tags</div>
        </div>
        {sortedItems.map((item) => (
          <div key={item.id} className="grid grid-cols-12 gap-4 p-3 border-b hover:bg-primary/5 transition-colors">
            <div className="col-span-1">
              <Badge className="bg-primary text-white">#{item.rank}</Badge>
            </div>
            <div className="col-span-3 font-medium text-sm">{item.name}</div>
            <div className="col-span-4 text-sm text-muted-foreground line-clamp-1">{item.tagline}</div>
            <div className="col-span-4 flex flex-wrap gap-1">
              {item.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderItemScroll = () => (
    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
      {sortedItems.map((item) => (
        <Card key={item.id} className="glass-effect border-primary/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-primary text-white text-xs">#{item.rank}</Badge>
                  <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{item.tagline}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="hover:bg-primary/10">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lists
        </Button>
      </div>

      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <div className="flex items-start gap-4">
            <img
              src={list.image}
              alt={list.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <CardTitle className="gradient-text text-2xl mb-2">{list.name}</CardTitle>
              <p className="text-muted-foreground mb-3">{list.tagline}</p>
              <div className="flex flex-wrap gap-1">
                {list.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <Badge className="bg-primary text-white">
              <Star className="w-4 h-4 mr-1" />
              #{list.rank}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 items-center">
          <Select value={sortBy} onValueChange={(value: 'rank' | 'name') => setSortBy(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rank">Rank</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>

          {renderViewModeButtons()}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {filteredItems.length} {filteredItems.length === 1 ? 'Item' : 'Items'}
          </h3>
        </div>

        {sortedItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found matching your search.</p>
          </div>
        ) : (
          <>
            {viewMode === 'tiles' && renderItemTiles()}
            {viewMode === 'table' && renderItemTable()}
            {viewMode === 'scroll' && renderItemScroll()}
          </>
        )}
      </div>
    </div>
  );
};

export default ListDetail;
