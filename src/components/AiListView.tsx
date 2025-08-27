import { TopList } from '@/types/list';
import ListTiles from './ListTiles';

interface AiListViewProps {
  lists: TopList[];
  onListSelect: (list: TopList) => void;
}

const AiListView = ({ lists, onListSelect }: AiListViewProps) => {
  return (
    <div>
      {lists.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No lists found.</p>
        </div>
      ) : (
        <ListTiles lists={lists} onListSelect={onListSelect} />
      )}
    </div>
  );
};

export default AiListView;
