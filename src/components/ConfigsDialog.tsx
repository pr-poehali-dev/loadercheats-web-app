import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

type Game = 'minecraft' | 'cs2' | 'roblox' | 'all';

interface Config {
  id: number;
  name: string;
  game: Game;
  data: string;
}

interface ConfigsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  configs: Config[];
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDownload: (config: Config) => void;
}

export default function ConfigsDialog({ isOpen, onClose, configs, onUpload, onDownload }: ConfigsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-primary max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-primary">
            Конфиги
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-3">
            <label className="flex-1">
              <input
                type="file"
                accept=".cfg,.ini,.txt,.json"
                onChange={onUpload}
                className="hidden"
                id="config-upload"
              />
              <Button 
                asChild
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <label htmlFor="config-upload" className="cursor-pointer flex items-center justify-center">
                  <Icon name="Upload" className="mr-2" size={20} />
                  Загрузить конфиг
                </label>
              </Button>
            </label>
          </div>

          <div className="border-t border-primary/20 pt-4">
            <h3 className="font-bold mb-3">Мои конфиги ({configs.length})</h3>
            
            {configs.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {configs.map(config => (
                  <Card key={config.id} className="p-4 bg-muted border-primary/30 hover:border-primary transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-foreground">{config.name}</h4>
                        <p className="text-xs text-muted-foreground">{config.game.toUpperCase()}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => onDownload(config)}
                      >
                        <Icon name="Download" size={16} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="FileText" size={48} className="mx-auto mb-3 opacity-40" />
                <p>Нет сохраненных конфигов</p>
                <p className="text-xs mt-1">Загрузите конфиг для начала</p>
              </div>
            )}
          </div>

          <div className="border-t border-primary/20 pt-4">
            <h3 className="font-bold mb-3">Популярные конфиги</h3>
            <div className="space-y-2">
              <Card className="p-4 bg-muted border-primary/30 hover:border-primary transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-foreground">Pro Config CS2</h4>
                    <p className="text-xs text-muted-foreground">CS2 • 1.2k скачиваний</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon name="Download" size={16} />
                  </Button>
                </div>
              </Card>

              <Card className="p-4 bg-muted border-primary/30 hover:border-primary transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-foreground">OptiFine Settings</h4>
                    <p className="text-xs text-muted-foreground">MINECRAFT • 856 скачиваний</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon name="Download" size={16} />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
