import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpDown, 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  Plus,
  Eye,
  EyeOff,
  Wallet
} from "lucide-react";
import { useState, useEffect } from "react";

interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
  currency: string;
  type: 'checking' | 'savings' | 'credit';
}

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  category: string;
  icon: string;
}

interface DashboardProps {
  onPageChange: (page: string) => void;
}

export default function Dashboard({ onPageChange }: DashboardProps) {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Предотвращаем мигание при загрузке
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const accounts: Account[] = [
    {
      id: '1',
      name: 'Основной счет',
      number: '**** 1234',
      balance: 2450, // Convert USD to RUB
      currency: '₽',
      type: 'checking'
    },
    
  ];

  const recentTransactions: Transaction[] = [
    
  ];

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  if (!isLoaded) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-accent rounded-lg w-1/3"></div>
        <div className="h-32 bg-accent rounded-lg"></div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-20 bg-accent rounded-lg"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Добро пожаловать!</h1>
          <p className="text-muted-foreground">Управляйте своими финансами с легкостью</p>
        </div>
        <Button
          onClick={() => onPageChange('transfer')}
          className="bg-gradient-primary hover:opacity-90 shadow-primary"
        >
          <ArrowUpDown size={16} />
          Перевести деньги
        </Button>
      </div>

      {/* Lime Slots Partnership Advertisement */}
      <GlassCard hover className="p-6 bg-gradient-to-r from-lime-500/10 to-green-500/10 border-lime-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Партнерство с Lime Slots</h3>
              <p className="text-muted-foreground text-sm">
                Лучшие игровые автоматы и бонусы для наших пользователей
              </p>
            </div>
          </div>
          <Button
            className="bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white shadow-lg"
            onClick={() => window.open('https://limeslots.com', '_blank')}
          >
            Играть сейчас
          </Button>
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            🎰 1000+ игр
          </span>
          <span className="flex items-center gap-1">
            🎁 Бесплатные бонусы
          </span>
          <span className="flex items-center gap-1">
            🛡️ Безопасные выплаты
          </span>
        </div>
      </GlassCard>

      {/* Total Balance Card */}
      <GlassCard hover morph className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Общий баланс</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setBalanceVisible(!balanceVisible)}
            className="p-2"
          >
            {balanceVisible ? <Eye size={18} /> : <EyeOff size={18} />}
          </Button>
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">
            {balanceVisible
              ? `₽${totalBalance.toLocaleString('ru-RU', { minimumFractionDigits: 2 })}`
              : '••••••'
            }
          </span>
          <span className="text-success text-sm flex items-center gap-1">
            <TrendingUp size={14} />
            +5.2%
          </span>
        </div>

        <p className="text-muted-foreground text-sm mt-2">
          По всем счетам
        </p>
      </GlassCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Button
          variant="outline"
          className="h-20 flex-col gap-2 glass-card border-0 glass-hover"
          onClick={() => onPageChange('transfer')}
        >
          <ArrowUpDown size={20} />
          Перевод
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col gap-2 glass-card border-0 glass-hover"
          onClick={() => onPageChange('accounts')}
        >
          <Plus size={20} />
          Добавить счет
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col gap-2 glass-card border-0 glass-hover"
          onClick={() => onPageChange('transactions')}
        >
          <TrendingUp size={20} />
          Аналитика
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col gap-2 glass-card border-0 glass-hover"
          onClick={() => onPageChange('accounts')}
        >
          <CreditCard size={20} />
          Карты
        </Button>
      </div>

      {/* Bank Transfer Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Быстрый перевод по банкам</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <GlassCard hover className="p-4 cursor-pointer" onClick={() => onPageChange('transfer')}>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">С</span>
              </div>
              <span className="font-medium text-sm">Сбербанк</span>
            </div>
          </GlassCard>
          <GlassCard hover className="p-4 cursor-pointer" onClick={() => onPageChange('transfer')}>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">В</span>
              </div>
              <span className="font-medium text-sm">ВТБ</span>
            </div>
          </GlassCard>
          <GlassCard hover className="p-4 cursor-pointer" onClick={() => onPageChange('transfer')}>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">А</span>
              </div>
              <span className="font-medium text-sm">Альфа-Банк</span>
            </div>
          </GlassCard>
          <GlassCard hover className="p-4 cursor-pointer" onClick={() => onPageChange('transfer')}>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Т</span>
              </div>
              <span className="font-medium text-sm">Тинькофф</span>
            </div>
          </GlassCard>
          <GlassCard hover className="p-4 cursor-pointer" onClick={() => onPageChange('transfer')}>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Р</span>
              </div>
              <span className="font-medium text-sm">Росбанк</span>
            </div>
          </GlassCard>
          <GlassCard hover className="p-4 cursor-pointer" onClick={() => onPageChange('transfer')}>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Г</span>
              </div>
              <span className="font-medium text-sm">Газпромбанк</span>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Additional Advertisements */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Crypto Trading Ad */}
        <GlassCard hover className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">₿</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">Криптовалютная торговля</h4>
              <p className="text-xs text-muted-foreground">Торгуйте BTC, ETH и другими</p>
            </div>
          </div>
          <Button size="sm" className="w-full mt-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
            Начать торговлю
          </Button>
        </GlassCard>

        {/* Investment Platform Ad */}
        <GlassCard hover className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">📈</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">Инвестиционные фонды</h4>
              <p className="text-xs text-muted-foreground">Диверсифицируйте портфель</p>
            </div>
          </div>
          <Button size="sm" className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
            Инвестировать
          </Button>
        </GlassCard>

        {/* Insurance Services Ad */}
        <GlassCard hover className="p-4 bg-gradient-to-r from-green-500/10 to-teal-500/10 border-green-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🛡️</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">Страхование имущества</h4>
              <p className="text-xs text-muted-foreground">Защитите свои активы</p>
            </div>
          </div>
          <Button size="sm" className="w-full mt-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
            Оформить страховку
          </Button>
        </GlassCard>
      </div>

      {/* Accounts Overview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Ваши счета</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange('accounts')}
            className="glass-hover"
          >
            Посмотреть все
          </Button>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account, index) => (
            <GlassCard key={account.id} variant="float" hover className="p-4" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-accent">
                    <Wallet size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium">{account.name}</h3>
                    <p className="text-sm text-muted-foreground">{account.number}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-lg font-semibold ${
                  account.balance < 0 ? 'text-error' : 'text-foreground'
                }`}>
                  {account.currency}{Math.abs(account.balance).toLocaleString('ru-RU', { minimumFractionDigits: 2 })}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  account.type === 'credit' ? 'bg-warning/20 text-warning' :
                  account.type === 'savings' ? 'bg-success/20 text-success' :
                  'bg-primary/20 text-primary'
                }`}>
                  {account.type === 'checking' ? 'расчетный' :
                   account.type === 'savings' ? 'сберегательный' :
                   account.type === 'credit' ? 'кредитный' : account.type}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Недавние транзакции</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange('transactions')}
            className="glass-hover"
          >
            Посмотреть все
          </Button>
        </div>
        
        <GlassCard hover className="p-0 overflow-hidden">
          <div className="divide-y divide-border">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{transaction.icon}</div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{transaction.description}</h4>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                  
                  <div className="text-right">
                    <span className={`font-semibold ${
                      transaction.type === 'income' ? 'text-success' : 'text-error'
                    }`}>
                      {transaction.type === 'income' ? '+' : ''}
                      ₽{Math.abs(transaction.amount).toLocaleString('ru-RU', { minimumFractionDigits: 2 })}
                    </span>
                    <p className="text-xs text-muted-foreground capitalize">
                      {transaction.category === 'salary' ? 'зарплата' :
                       transaction.category === 'shopping' ? 'покупки' :
                       transaction.category === 'transport' ? 'транспорт' :
                       transaction.category === 'freelance' ? 'фриланс' : transaction.category}
                    </p>
                  </div>
                  
                  {transaction.type === 'income' ? 
                    <TrendingUp size={16} className="text-success" /> :
                    <TrendingDown size={16} className="text-error" />
                  }
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}