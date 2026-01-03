import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Game = 'minecraft' | 'cs2' | 'roblox' | 'all';

interface Cheat {
  id: number;
  name: string;
  game: Game;
  description: string;
  downloads: number;
  uploadDate: string;
  uploader: string;
  images: string[];
  approved: boolean;
}

interface CheatDetailsDialogProps {
  cheat: Cheat | null;
  onClose: () => void;
}

export default function CheatDetailsDialog({ cheat, onClose }: CheatDetailsDialogProps) {
  return (
    <Dialog open={!!cheat} onOpenChange={onClose}>
      <DialogContent className="bg-card border-primary max-w-2xl">
        {cheat && (
          <>
            <DialogHeader>
              <DialogTitle className="text-3xl font-black text-primary">
                {cheat.name}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="h-64 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <Icon name="Image" size={80} className="text-muted-foreground" />
              </div>
              
              <div className="flex gap-3">
                <Badge className="bg-secondary text-secondary-foreground">
                  {cheat.game.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="border-primary text-primary">
                  {cheat.downloads.toLocaleString()} скачиваний
                </Badge>
              </div>
              
              <div>
                <h4 className="font-bold mb-2">Описание</h4>
                <p className="text-muted-foreground">{cheat.description}</p>
              </div>
              
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div>
                  <span className="font-bold">Загрузил:</span> {cheat.uploader}
                </div>
                <div>
                  <span className="font-bold">Дата:</span> {new Date(cheat.uploadDate).toLocaleDateString('ru')}
                </div>
              </div>
              
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Icon name="Download" className="mr-2" size={20} />
                Скачать чит
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
