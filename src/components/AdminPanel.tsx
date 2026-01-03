import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

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

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  adminPassword: string;
  setAdminPassword: (password: string) => void;
  onLogin: () => void;
  cheats: Cheat[];
  pendingCheats: Cheat[];
  onApproveCheat: (id: number) => void;
  onRejectCheat: (id: number) => void;
  onDeleteCheat: (id: number) => void;
  setSelectedCheat: (cheat: Cheat | null) => void;
  setIsAuthenticated: (value: boolean) => void;
}

export default function AdminPanel({
  isOpen,
  onClose,
  isAuthenticated,
  adminPassword,
  setAdminPassword,
  onLogin,
  cheats,
  pendingCheats,
  onApproveCheat,
  onRejectCheat,
  onDeleteCheat,
  setSelectedCheat,
  setIsAuthenticated
}: AdminPanelProps) {
  const [adminTab, setAdminTab] = useState<'moderation' | 'cheats' | 'stats' | 'users'>('moderation');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-secondary max-w-3xl max-h-[90vh] overflow-y-auto">
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
              onKeyPress={(e) => e.key === 'Enter' && onLogin()}
              className="w-full px-4 py-2 bg-background border border-secondary/50 rounded-md text-foreground focus:border-secondary focus:outline-none"
            />
            <Button 
              onClick={onLogin}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Войти
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-2 border-b border-secondary/30 pb-3">
              <Button
                size="sm"
                variant={adminTab === 'moderation' ? 'default' : 'ghost'}
                className={adminTab === 'moderation' ? 'bg-secondary' : ''}
                onClick={() => setAdminTab('moderation')}
              >
                <Icon name="Clock" className="mr-2" size={16} />
                Модерация ({pendingCheats.length})
              </Button>
              <Button
                size="sm"
                variant={adminTab === 'cheats' ? 'default' : 'ghost'}
                className={adminTab === 'cheats' ? 'bg-secondary' : ''}
                onClick={() => setAdminTab('cheats')}
              >
                <Icon name="List" className="mr-2" size={16} />
                Читы
              </Button>
              <Button
                size="sm"
                variant={adminTab === 'stats' ? 'default' : 'ghost'}
                className={adminTab === 'stats' ? 'bg-secondary' : ''}
                onClick={() => setAdminTab('stats')}
              >
                <Icon name="BarChart3" className="mr-2" size={16} />
                Статистика
              </Button>
              <Button
                size="sm"
                variant={adminTab === 'users' ? 'default' : 'ghost'}
                className={adminTab === 'users' ? 'bg-secondary' : ''}
                onClick={() => setAdminTab('users')}
              >
                <Icon name="Users" className="mr-2" size={16} />
                Пользователи
              </Button>
            </div>

            {adminTab === 'moderation' && (
              <div>
                {pendingCheats.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto space-y-3">
                    {pendingCheats.map(cheat => (
                      <Card key={cheat.id} className="p-4 bg-muted border-secondary/30">
                        <div className="mb-3">
                          <h4 className="font-bold text-foreground">{cheat.name}</h4>
                          <p className="text-xs text-muted-foreground">{cheat.game.toUpperCase()} • {cheat.uploader}</p>
                          <p className="text-xs text-muted-foreground mt-1">{cheat.description.slice(0, 80)}...</p>
                          <p className="text-xs text-muted-foreground mt-1">ID: {cheat.id}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => onApproveCheat(cheat.id)}
                          >
                            <Icon name="Check" className="mr-1" size={16} />
                            Одобрить
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => onRejectCheat(cheat.id)}
                          >
                            <Icon name="X" className="mr-1" size={16} />
                            Отклонить
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="CheckCircle" size={48} className="mx-auto mb-3 opacity-40" />
                    <p>Все читы проверены!</p>
                  </div>
                )}
              </div>
            )}

            {adminTab === 'cheats' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-muted-foreground">Всего читов: {cheats.filter(c => c.approved).length}</p>
                  <Button size="sm" variant="outline" className="border-primary text-primary">
                    <Icon name="Plus" className="mr-1" size={16} />
                    Добавить
                  </Button>
                </div>
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {cheats.filter(c => c.approved).map(cheat => (
                    <Card key={cheat.id} className="p-3 bg-muted border-secondary/30 hover:border-secondary transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-foreground">{cheat.name}</h4>
                          <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                            <span>{cheat.game.toUpperCase()}</span>
                            <span>•</span>
                            <span><Icon name="Download" className="inline" size={12} /> {cheat.downloads}</span>
                            <span>•</span>
                            <span>ID: {cheat.id}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-primary hover:text-primary-foreground hover:bg-primary"
                            onClick={() => setSelectedCheat(cheat)}
                          >
                            <Icon name="Eye" size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                            onClick={() => {
                              if (confirm(`Удалить чит "${cheat.name}"?`)) {
                                onDeleteCheat(cheat.id);
                              }
                            }}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {adminTab === 'stats' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-4 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
                    <div className="flex items-center gap-3">
                      <Icon name="Zap" size={32} className="text-primary" />
                      <div>
                        <p className="text-2xl font-black text-foreground">{cheats.filter(c => c.approved).length}</p>
                        <p className="text-xs text-muted-foreground">Активных читов</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-secondary/20 to-secondary/5 border-secondary/30">
                    <div className="flex items-center gap-3">
                      <Icon name="Clock" size={32} className="text-secondary" />
                      <div>
                        <p className="text-2xl font-black text-foreground">{pendingCheats.length}</p>
                        <p className="text-xs text-muted-foreground">На модерации</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30">
                    <div className="flex items-center gap-3">
                      <Icon name="Download" size={32} className="text-accent" />
                      <div>
                        <p className="text-2xl font-black text-foreground">{cheats.reduce((sum, c) => sum + c.downloads, 0).toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Скачиваний</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/30">
                    <div className="flex items-center gap-3">
                      <Icon name="TrendingUp" size={32} className="text-green-500" />
                      <div>
                        <p className="text-2xl font-black text-foreground">+42%</p>
                        <p className="text-xs text-muted-foreground">Рост за месяц</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="p-4 bg-muted border-secondary/30">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <Icon name="Gamepad2" size={20} className="text-secondary" />
                    По играм
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Minecraft</span>
                      <span className="font-bold text-primary">{cheats.filter(c => c.game === 'minecraft' && c.approved).length} читов</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">CS2</span>
                      <span className="font-bold text-primary">{cheats.filter(c => c.game === 'cs2' && c.approved).length} читов</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Roblox</span>
                      <span className="font-bold text-primary">{cheats.filter(c => c.game === 'roblox' && c.approved).length} читов</span>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {adminTab === 'users' && (
              <div className="space-y-3">
                <Card className="p-4 bg-muted border-secondary/30">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-foreground">Топ загрузчики</h4>
                      <p className="text-xs text-muted-foreground">Самые активные пользователи</p>
                    </div>
                    <Icon name="Trophy" size={24} className="text-accent" />
                  </div>
                  <div className="space-y-2">
                    {Array.from(new Set(cheats.map(c => c.uploader))).slice(0, 5).map((uploader, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-secondary/20 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-sm">
                            {i + 1}
                          </div>
                          <span className="font-bold">{uploader}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {cheats.filter(c => c.uploader === uploader).length} читов
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-4 bg-muted border-secondary/30">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <Icon name="Shield" size={20} className="text-secondary" />
                    Управление доступом
                  </h4>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-primary/50 text-foreground"
                    >
                      <Icon name="UserPlus" className="mr-2" size={18} />
                      Добавить модератора
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-red-500/50 text-foreground"
                    >
                      <Icon name="Ban" className="mr-2" size={18} />
                      Заблокировать пользователя
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            <div className="pt-3 border-t border-secondary/30 flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex-1 border-secondary text-secondary"
                onClick={() => setIsAuthenticated(false)}
              >
                <Icon name="LogOut" className="mr-2" size={16} />
                Выйти
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
