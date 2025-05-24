
import { TopList } from '@/types/list';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, Hash } from 'lucide-react';

interface ListScrollProps {
  lists: TopList[];
  onListSelect: (list: TopList) => void;
}

const ListScroll = ({ lists, onListSelect }: ListScrollProps) => {
  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
      {lists.map((list) => (
        <Card
          key={list.id}
          className="cursor-pointer hover:shadow-md hover:shadow-primary/20 transition-all duration-200 glass-effect border-primary/20"
          onClick={() => onListSelect(list)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <img
                src={list.image}
                alt={list.name}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold gradient-text line-clamp-1">{list.name}</h3>
                  <Badge className="bg-primary text-white flex-shrink-0">
                    <Star className="w-3 h-3 mr-1" />
                    #{list.rank}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                  {list.tagline}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {list.createdAt.toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Hash className="w-3 h-3 mr-1" />
                    {list.items.length} items
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {list.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {list.tags.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{list.tags.length - 4}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ListScroll;
