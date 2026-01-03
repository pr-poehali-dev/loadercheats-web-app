import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type Game = 'minecraft' | 'cs2' | 'roblox' | 'all';

interface NewCheat {
  name: string;
  game: Game;
  description: string;
  uploader: string;
  fileUrl: string;
  fileType: 'url' | 'file';
  avatar: File | null;
  screenshots: File[];
}

interface AddCheatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  newCheat: NewCheat;
  setNewCheat: (cheat: NewCheat) => void;
  onSubmit: () => void;
}

export default function AddCheatDialog({ isOpen, onClose, newCheat, setNewCheat, onSubmit }: AddCheatDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-accent max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-accent">
            Добавить чит
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-bold mb-2 block">Название чита</label>
            <input
              type="text"
              placeholder="Например: SuperHack Pro"
              value={newCheat.name}
              onChange={(e) => setNewCheat({ ...newCheat, name: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-accent/50 rounded-md text-foreground focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-bold mb-2 block">Игра</label>
            <select
              value={newCheat.game}
              onChange={(e) => setNewCheat({ ...newCheat, game: e.target.value as Game })}
              className="w-full px-4 py-2 bg-background border border-accent/50 rounded-md text-foreground focus:border-accent focus:outline-none"
            >
              <option value="minecraft">Minecraft</option>
              <option value="cs2">CS2</option>
              <option value="roblox">Roblox</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-bold mb-2 block">Описание</label>
            <textarea
              placeholder="Опишите функции чита..."
              value={newCheat.description}
              onChange={(e) => setNewCheat({ ...newCheat, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-background border border-accent/50 rounded-md text-foreground focus:border-accent focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-bold mb-2 block">Ваш ник</label>
            <input
              type="text"
              placeholder="Как вас называть?"
              value={newCheat.uploader}
              onChange={(e) => setNewCheat({ ...newCheat, uploader: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-accent/50 rounded-md text-foreground focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-bold mb-2 block">Способ загрузки</label>
            <div className="flex gap-3 mb-3">
              <Button
                type="button"
                variant={newCheat.fileType === 'url' ? 'default' : 'outline'}
                className={newCheat.fileType === 'url' ? 'bg-accent' : 'border-accent/50'}
                onClick={() => setNewCheat({ ...newCheat, fileType: 'url' })}
              >
                <Icon name="Link" className="mr-2" size={18} />
                Ссылка
              </Button>
              <Button
                type="button"
                variant={newCheat.fileType === 'file' ? 'default' : 'outline'}
                className={newCheat.fileType === 'file' ? 'bg-accent' : 'border-accent/50'}
                onClick={() => setNewCheat({ ...newCheat, fileType: 'file' })}
              >
                <Icon name="Upload" className="mr-2" size={18} />
                Файл (до 500 МБ)
              </Button>
            </div>

            {newCheat.fileType === 'url' ? (
              <input
                type="url"
                placeholder="https://example.com/cheat.zip"
                value={newCheat.fileUrl}
                onChange={(e) => setNewCheat({ ...newCheat, fileUrl: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-accent/50 rounded-md text-foreground focus:border-accent focus:outline-none"
              />
            ) : (
              <div className="border-2 border-dashed border-accent/50 rounded-md p-6 text-center hover:border-accent transition-colors cursor-pointer">
                <Icon name="Upload" size={40} className="mx-auto mb-2 text-accent" />
                <p className="text-sm text-muted-foreground">Нажмите для выбора файла</p>
                <p className="text-xs text-muted-foreground mt-1">Максимум 500 МБ</p>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-bold mb-2 block">Аватарка чита (необязательно)</label>
            <div className="border-2 border-dashed border-accent/30 rounded-md p-4 text-center hover:border-accent/50 transition-colors cursor-pointer">
              <Icon name="Image" size={32} className="mx-auto mb-2 text-accent/60" />
              <p className="text-xs text-muted-foreground">Загрузить изображение</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold mb-2 block">Скриншоты (необязательно)</label>
            <div className="border-2 border-dashed border-accent/30 rounded-md p-4 text-center hover:border-accent/50 transition-colors cursor-pointer">
              <Icon name="Images" size={32} className="mx-auto mb-2 text-accent/60" />
              <p className="text-xs text-muted-foreground">Загрузить несколько изображений</p>
            </div>
          </div>

          <Button 
            onClick={onSubmit}
            disabled={!newCheat.name || !newCheat.description || !newCheat.uploader}
            className="w-full bg-gradient-to-r from-secondary to-accent text-white font-bold py-3 hover-scale disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="Send" className="mr-2" size={20} />
            Отправить на модерацию
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
