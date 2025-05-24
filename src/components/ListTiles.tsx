
import { TopList } from '@/types/list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Star } from 'lucide-react';

interface ListTilesProps {
  lists: TopList[];
  onListSelect: (list: TopList) => void;
}

const ListTiles = ({ lists, onListSelect }: ListTilesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lists.map((list) => (
        <Card
          key={list.id}
          className="group cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 glass-effect border-primary/20"
          onClick={() => onListSelect(list)}
        >
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
            <img
              src={list.image}
              alt={list.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2">
              <Badge className="bg-primary text-white">
                <Star className="w-3 h-3 mr-1" />
                #{list.rank}
              </Badge>
            </div>
          </div>
          
          <CardHeader className="pb-2">
            <CardTitle className="line-clamp-2 gradient-text">{list.name}</CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-1">{list.tagline}</p>
          </CardHeader>
          
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {list.description}
            </p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {list.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {list.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{list.tags.length - 3}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 mr-1" />
              {list.createdAt.toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ListTiles;
