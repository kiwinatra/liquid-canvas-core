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
import { useState } from "react";

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

  const accounts: Account[] = [
    {
      id: '1',
      name: 'Main Account',
      number: '**** 1234',
      balance: 24500.75,
      currency: '$',
      type: 'checking'
    },
    {
      id: '2', 
      name: 'Savings',
      number: '**** 5678',
      balance: 8900.00,
      currency: '$',
      type: 'savings'
    },
    {
      id: '3',
      name: 'Credit Card',
      number: '**** 9012',
      balance: -1250.50,
      currency: '$',
      type: 'credit'
    }
  ];

  const recentTransactions: Transaction[] = [
    {
      id: '1',
      type: 'income',
      amount: 2500.00,
      description: 'Salary Deposit',
      date: '2024-08-16',
      category: 'salary',
      icon: '💼'
    },
    {
      id: '2',
      type: 'expense', 
      amount: -85.50,
      description: 'Grocery Store',
      date: '2024-08-15',
      category: 'shopping',
      icon: '🛒'
    },
    {
      id: '3',
      type: 'expense',
      amount: -45.00,
      description: 'Gas Station',
      date: '2024-08-15',
      category: 'transport',
      icon: '⛽'
    },
    {
      id: '4',
      type: 'income',
      amount: 150.00,
      description: 'Freelance Payment',
      date: '2024-08-14',
      category: 'freelance',
      icon: '💻'
    }
  ];

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground">Manage your finances with ease</p>
        </div>
        <Button 
          onClick={() => onPageChange('transfer')}
          className="bg-gradient-primary hover:opacity-90 shadow-primary"
        >
          <ArrowUpDown size={16} />
          Transfer Money
        </Button>
      </div>

      {/* Total Balance Card */}
      <GlassCard variant="liquid" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Total Balance</h2>
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
              ? `$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
              : '••••••'
            }
          </span>
          <span className="text-success text-sm flex items-center gap-1">
            <TrendingUp size={14} />
            +5.2%
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm mt-2">
          Across all accounts
        </p>
      </GlassCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Button 
          variant="outline"
          className="h-20 flex-col gap-2 glass-card border-0"
          onClick={() => onPageChange('transfer')}
        >
          <ArrowUpDown size={20} />
          Transfer
        </Button>
        <Button 
          variant="outline"
          className="h-20 flex-col gap-2 glass-card border-0"
          onClick={() => onPageChange('accounts')}
        >
          <Plus size={20} />
          Add Account
        </Button>
        <Button 
          variant="outline"
          className="h-20 flex-col gap-2 glass-card border-0"
          onClick={() => onPageChange('transactions')}
        >
          <TrendingUp size={20} />
          Analytics
        </Button>
        <Button 
          variant="outline"
          className="h-20 flex-col gap-2 glass-card border-0"
          onClick={() => onPageChange('accounts')}
        >
          <CreditCard size={20} />
          Cards
        </Button>
      </div>

      {/* Accounts Overview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Accounts</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onPageChange('accounts')}
          >
            View All
          </Button>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <GlassCard key={account.id} variant="glass" className="p-4">
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
                  {account.currency}{Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  account.type === 'credit' ? 'bg-warning/20 text-warning' :
                  account.type === 'savings' ? 'bg-success/20 text-success' :
                  'bg-primary/20 text-primary'
                }`}>
                  {account.type}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onPageChange('transactions')}
          >
            View All
          </Button>
        </div>
        
        <GlassCard variant="glass" className="p-0 overflow-hidden">
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
                      ${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <p className="text-xs text-muted-foreground capitalize">
                      {transaction.category}
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