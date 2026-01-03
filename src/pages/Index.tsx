import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import CheatDetailsDialog from '@/components/CheatDetailsDialog';
import AdminPanel from '@/components/AdminPanel';
import AddCheatDialog from '@/components/AddCheatDialog';
import ConfigsDialog from '@/components/ConfigsDialog';

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

      <CheatDetailsDialog 
        cheat={selectedCheat}
        onClose={() => setSelectedCheat(null)}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        isAuthenticated={isAuthenticated}
        adminPassword={adminPassword}
        setAdminPassword={setAdminPassword}
        onLogin={handleAdminLogin}
        cheats={cheats}
        pendingCheats={pendingCheats}
        onApproveCheat={handleApproveCheat}
        onRejectCheat={handleRejectCheat}
        onDeleteCheat={handleDeleteCheat}
        setSelectedCheat={setSelectedCheat}
        setIsAuthenticated={setIsAuthenticated}
      />

      <AddCheatDialog
        isOpen={isAddCheatOpen}
        onClose={() => setIsAddCheatOpen(false)}
        newCheat={newCheat}
        setNewCheat={setNewCheat}
        onSubmit={handleAddCheat}
      />

      <ConfigsDialog
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        configs={configs}
        onUpload={handleUploadConfig}
        onDownload={handleDownloadConfig}
      />
    </div>
  );
}
