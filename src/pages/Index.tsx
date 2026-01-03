import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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

const mockCheats: Cheat[] = [
  {
    id: 1,
    name: 'UltraVision Pro',
    game: 'cs2',
    description: 'Продвинутый ESP с настройкой цветов, отображением оружия и дистанции. Поддержка всех режимов игры.',
    downloads: 1523,
    uploadDate: '2026-01-01',
    uploader: 'CheatMaster',
    images: [],
    approved: true
  },
  {
    id: 2,
    name: 'BlockHack Ultimate',
    game: 'minecraft',
    description: 'Полный набор читов для Minecraft: X-Ray, Fly, Speed, KillAura, NoFall и многое другое.',
    downloads: 2341,
    uploadDate: '2025-12-28',
    uploader: 'MineCrafter99',
    images: [],
    approved: true
  },
  {
    id: 3,
    name: 'RoboExploit',
    game: 'roblox',
    description: 'Мощный эксплоит для Roblox с поддержкой скриптов, телепортации и спидхака.',
    downloads: 3156,
    uploadDate: '2026-01-02',
    uploader: 'RoboHacker',
    images: [],
    approved: true
  }
];

export default function Index() {
  const [selectedGame, setSelectedGame] = useState<Game>('all');
  const [selectedCheat, setSelectedCheat] = useState<Cheat | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAddCheatOpen, setIsAddCheatOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cheats, setCheats] = useState<Cheat[]>(mockCheats);
  const [configs, setConfigs] = useState<Array<{id: number, name: string, game: Game, data: string}>>([]);
  
  const [newCheat, setNewCheat] = useState({
    name: '',
    game: 'minecraft' as Game,
    description: '',
    uploader: '',
    fileUrl: '',
    fileType: 'url' as 'url' | 'file',
    avatar: null as File | null,
    screenshots: [] as File[]
  });

  const games = [
    { id: 'all' as Game, name: 'Все игры', icon: 'Grid3x3' },
    { id: 'minecraft' as Game, name: 'Minecraft', icon: 'Box' },
    { id: 'cs2' as Game, name: 'CS2', icon: 'Crosshair' },
    { id: 'roblox' as Game, name: 'Roblox', icon: 'Gamepad2' }
  ];

  const filteredCheats = selectedGame === 'all' 
    ? cheats.filter(c => c.approved)
    : cheats.filter(cheat => cheat.game === selectedGame && cheat.approved);

  const pendingCheats = cheats.filter(c => !c.approved);

  const handleAdminLogin = () => {
    if (adminPassword === 'sexxxlop123') {
      setIsAuthenticated(true);
      setAdminPassword('');
    }
  };

  const handleAddCheat = () => {
    const cheat: Cheat = {
      id: Date.now(),
      name: newCheat.name,
      game: newCheat.game,
      description: newCheat.description,
      downloads: 0,
      uploadDate: new Date().toISOString().split('T')[0],
      uploader: newCheat.uploader,
      images: [],
      approved: false
    };
    setCheats([...cheats, cheat]);
    setNewCheat({
      name: '',
      game: 'minecraft',
      description: '',
      uploader: '',
      fileUrl: '',
      fileType: 'url',
      avatar: null,
      screenshots: []
    });
    setIsAddCheatOpen(false);
  };

  const handleApproveCheat = (id: number) => {
    setCheats(cheats.map(c => c.id === id ? { ...c, approved: true } : c));
  };

  const handleRejectCheat = (id: number) => {
    setCheats(cheats.filter(c => c.id !== id));
  };

  const handleDeleteCheat = (id: number) => {
    setCheats(cheats.filter(c => c.id !== id));
  };

  const handleUploadConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const config = {
          id: Date.now(),
          name: file.name,
          game: selectedGame === 'all' ? 'minecraft' : selectedGame,
          data: event.target?.result as string
        };
        setConfigs([...configs, config]);
      };
      reader.readAsText(file);
    }
  };

  const handleDownloadConfig = (config: {id: number, name: string, data: string}) => {
    const blob = new Blob([config.data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = config.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent animate-pulse-glow z-50" />
      
      <header className="container mx-auto px-4 py-6 border-b border-primary/20">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black text-primary neon-glow">
            LOADER<span className="text-secondary">CHEATS</span>
          </h1>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => setIsConfigOpen(true)}
            >
              <Icon name="Download" className="mr-2" size={18} />
              Конфиги
            </Button>
            <Button 
              variant="outline" 
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
              onClick={() => setIsAdminOpen(true)}
            >
              <Icon name="Shield" className="mr-2" size={18} />
              Админка
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12 text-center animate-fade-in">
          <h2 className="text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            ЧИТ-АРСЕНАЛ
          </h2>
          <p className="text-muted-foreground text-lg">Лучшие читы для твоих любимых игр</p>
        </section>

        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {games.map(game => (
            <Button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              variant={selectedGame === game.id ? 'default' : 'outline'}
              className={`
                ${selectedGame === game.id 
                  ? 'bg-primary text-primary-foreground neon-border animate-pulse-glow' 
                  : 'border-primary/50 text-foreground hover:border-primary'
                }
              `}
            >
              <Icon name={game.icon as any} className="mr-2" size={20} />
              {game.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCheats.map((cheat, index) => (
            <Card 
              key={cheat.id} 
              className="bg-card border-primary/30 hover:border-primary hover-scale cursor-pointer overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedCheat(cheat)}
            >
              <div className="h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <Icon name="Zap" size={80} className="text-primary/40 group-hover:text-primary transition-colors" />
              </div>
              
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {cheat.name}
                  </h3>
                  <Badge className="bg-secondary text-secondary-foreground">
                    {cheat.game.toUpperCase()}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {cheat.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-primary">
                    <Icon name="Download" size={16} />
                    <span>{cheat.downloads.toLocaleString()}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {new Date(cheat.uploadDate).toLocaleDateString('ru')}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-secondary to-accent text-white font-bold px-8 py-6 text-lg hover-scale"
            onClick={() => setIsAddCheatOpen(true)}
          >
            <Icon name="Plus" className="mr-2" size={24} />
            Добавить свой чит
          </Button>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 border-t border-primary/20 mt-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobile(!isMobile)}
              className={isMobile ? 'text-primary' : 'text-muted-foreground'}
            >
              <Icon name="Smartphone" className="mr-2" size={18} />
              {isMobile ? 'Мобильный режим' : 'ПК режим'}
            </Button>
          </div>
          
          <Button
            variant="ghost"
            className="text-primary hover:text-primary-foreground hover:bg-primary"
            onClick={() => window.open('https://t.me/loadercheatspulse', '_blank')}
          >
            <Icon name="Send" className="mr-2" size={20} />
            Telegram канал
          </Button>
        </div>
      </footer>

      <Dialog open={!!selectedCheat} onOpenChange={() => setSelectedCheat(null)}>
        <DialogContent className="bg-card border-primary max-w-2xl">
          {selectedCheat && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-black text-primary">
                  {selectedCheat.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="h-64 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <Icon name="Image" size={80} className="text-muted-foreground" />
                </div>
                
                <div className="flex gap-3">
                  <Badge className="bg-secondary text-secondary-foreground">
                    {selectedCheat.game.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="border-primary text-primary">
                    {selectedCheat.downloads.toLocaleString()} скачиваний
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">Описание</h4>
                  <p className="text-muted-foreground">{selectedCheat.description}</p>
                </div>
                
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-bold">Загрузил:</span> {selectedCheat.uploader}
                  </div>
                  <div>
                    <span className="font-bold">Дата:</span> {new Date(selectedCheat.uploadDate).toLocaleDateString('ru')}
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

      <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
        <DialogContent className="bg-card border-secondary">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-secondary">
              Админ-панель
            </DialogTitle>
          </DialogHeader>
          
          {!isAuthenticated ? (
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Введите пароль"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                className="w-full px-4 py-2 bg-background border border-secondary/50 rounded-md text-foreground focus:border-secondary focus:outline-none"
              />
              <Button 
                onClick={handleAdminLogin}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                Войти
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">Ожидающие модерации: {pendingCheats.length}</p>
              
              {pendingCheats.length > 0 ? (
                <div className="max-h-96 overflow-y-auto space-y-3">
                  {pendingCheats.map(cheat => (
                    <Card key={cheat.id} className="p-4 bg-muted border-secondary/30">
                      <div className="mb-3">
                        <h4 className="font-bold text-foreground">{cheat.name}</h4>
                        <p className="text-xs text-muted-foreground">{cheat.game.toUpperCase()} • {cheat.uploader}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                          onClick={() => handleApproveCheat(cheat.id)}
                        >
                          <Icon name="Check" size={16} />
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => handleRejectCheat(cheat.id)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">Нет ожидающих читов</p>
              )}
              
              <div className="pt-3 border-t border-secondary/30">
                <p className="text-sm text-muted-foreground mb-2">Управление одобренными</p>
                <Button 
                  variant="outline" 
                  className="w-full border-destructive text-destructive"
                  onClick={() => {
                    const cheatId = prompt('Введите ID чита для удаления:');
                    if (cheatId) handleDeleteCheat(Number(cheatId));
                  }}
                >
                  <Icon name="Trash2" className="mr-2" size={18} />
                  Удалить чит
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAddCheatOpen} onOpenChange={setIsAddCheatOpen}>
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
              onClick={handleAddCheat}
              disabled={!newCheat.name || !newCheat.description || !newCheat.uploader}
              className="w-full bg-gradient-to-r from-secondary to-accent text-white font-bold py-3 hover-scale disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Send" className="mr-2" size={20} />
              Отправить на модерацию
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
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
                  onChange={handleUploadConfig}
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
                          onClick={() => handleDownloadConfig(config)}
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
    </div>
  );
}