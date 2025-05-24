
import { TopList } from '@/types/list';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface ListTableProps {
  lists: TopList[];
  onListSelect: (list: TopList) => void;
}

const ListTable = ({ lists, onListSelect }: ListTableProps) => {
  return (
    <div className="rounded-lg border border-primary/20 glass-effect">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Tagline</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Items</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lists.map((list) => (
            <TableRow
              key={list.id}
              className="cursor-pointer hover:bg-primary/5"
              onClick={() => onListSelect(list)}
            >
              <TableCell>
                <Badge className="bg-primary text-white">
                  <Star className="w-3 h-3 mr-1" />
                  {list.rank}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">{list.name}</TableCell>
              <TableCell className="text-muted-foreground max-w-xs truncate">
                {list.tagline}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {list.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {list.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{list.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {list.createdAt.toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{list.items.length}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListTable;
