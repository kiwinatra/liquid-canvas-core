import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  DollarSign
} from "lucide-react";
import { useState } from "react";

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  time: string;
  category: string;
  account: string;
  status: 'completed' | 'pending' | 'failed';
  icon: string;
}

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterAccount, setFilterAccount] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'income',
      amount: 1467.08,
      description: 'Твоя доля - как и обещал',
      date: '2025-08-16',
      time: '09:47',
      category: 'salary',
      account: 'Main Checking (**** 9068)',
      status: 'completed',
      icon: '💼'
    },
    {
      id: '2',
      type: 'expense',
      amount: -85.50,
      description: 'Whole Foods Market',
      date: '2024-08-15',
      time: '18:30',
      category: 'shopping',
      account: 'Main Checking (**** 1234)',
      status: 'completed',
      icon: '🛒'
    },
    {
      id: '3',
      type: 'expense',
      amount: -45.00,
      description: 'Shell Gas Station',
      date: '2024-08-15',
      time: '16:20',
      category: 'transport',
      account: 'Main Checking (**** 1234)',
      status: 'completed',
      icon: '⛽'
    },
    {
      id: '4',
      type: 'income',
      amount: 150.00,
      description: 'Freelance Project - Web Design',
      date: '2024-08-14',
      time: '14:15',
      category: 'freelance',
      account: 'Savings (**** 5678)',
      status: 'completed',
      icon: '💻'
    },
    {
      id: '5',
      type: 'expense',
      amount: -1200.00,
      description: 'Monthly Rent Payment',
      date: '2024-08-01',
      time: '10:00',
      category: 'housing',
      account: 'Main Checking (**** 1234)',
      status: 'completed',
      icon: '🏠'
    },
    {
      id: '6',
      type: 'expense',
      amount: -25.99,
      description: 'Netflix Subscription',
      date: '2024-08-13',
      time: '12:00',
      category: 'entertainment',
      account: 'Credit Card (**** 9012)',
      status: 'pending',
      icon: '🎬'
    },
    {
      id: '7',
      type: 'income',
      amount: 75.00,
      description: 'Cashback Reward',
      date: '2024-08-12',
      time: '00:01',
      category: 'rewards',
      account: 'Credit Card (**** 9012)',
      status: 'completed',
      icon: '💰'
    },
    {
      id: '8',
      type: 'expense',
      amount: -120.00,
      description: 'Electric Bill - City Power',
      date: '2024-08-10',
      time: '15:45',
      category: 'utilities',
      account: 'Main Checking (**** 1234)',
      status: 'failed',
      icon: '⚡'
    }
  ];

  const categories = [
    'all', 'salary', 'shopping', 'transport', 'freelance', 
    'housing', 'entertainment', 'rewards', 'utilities'
  ];

  const accounts = [
    'all', 
    'Main Checking (**** 2353)',
    'Savings (**** s93jf)', 
    'Credit Card (**** 9012)'
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
    const matchesAccount = filterAccount === 'all' || transaction.account === filterAccount;
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesAccount && matchesStatus;
  });

  const totalIncome = transactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'pending': return 'text-warning';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/20';
      case 'pending': return 'bg-warning/20';
      case 'failed': return 'bg-error/20';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground">Track all your financial activities</p>
        </div>
        <Button className="bg-gradient-secondary hover:opacity-90">
          <Download size={16} />
          Export CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard variant="glass" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Income</p>
              <p className="text-xl font-bold text-success">
                +${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-success/20">
              <TrendingUp size={20} className="text-success" />
            </div>
          </div>
        </GlassCard>

        <GlassCard variant="glass" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-xl font-bold text-error">
                -${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-error/20">
              <TrendingDown size={20} className="text-error" />
            </div>
          </div>
        </GlassCard>

        <GlassCard variant="glass" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Net Flow</p>
              <p className={`text-xl font-bold ${totalIncome - totalExpenses >= 0 ? 'text-success' : 'text-error'}`}>
                {totalIncome - totalExpenses >= 0 ? '+' : ''}
                ${(totalIncome - totalExpenses).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-primary/20">
              <DollarSign size={20} className="text-primary" />
            </div>
          </div>
        </GlassCard>

        <GlassCard variant="glass" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Transactions</p>
              <p className="text-xl font-bold">{transactions.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-accent">
              <Calendar size={20} className="text-foreground" />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Filters */}
      <GlassCard variant="glass" className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Search transactions..."
              className="pl-10 glass-card border-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[140px] glass-card border-0">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterAccount} onValueChange={setFilterAccount}>
              <SelectTrigger className="w-full sm:w-[180px] glass-card border-0">
                <SelectValue placeholder="Account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account} value={account}>
                    {account === 'all' ? 'All Accounts' : account}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[120px] glass-card border-0">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </GlassCard>

      {/* Transactions List */}
      <GlassCard variant="glass" className="p-0 overflow-hidden">
        <div className="divide-y divide-border">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{transaction.icon}</div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium truncate">{transaction.description}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusBg(transaction.status)} ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>{transaction.date}</span>
                      <span>{transaction.time}</span>
                      <span className="capitalize">{transaction.category}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{transaction.account}</p>
                  </div>
                  
                  <div className="text-right">
                    <span className={`text-lg font-semibold ${
                      transaction.type === 'income' ? 'text-success' : 'text-error'
                    }`}>
                      {transaction.type === 'income' ? '+' : ''}
                      ${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  {transaction.type === 'income' ? 
                    <TrendingUp size={18} className="text-success" /> :
                    <TrendingDown size={18} className="text-error" />
                  }
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <Filter size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No transactions found matching your filters.</p>
              <Button 
                variant="outline" 
                className="mt-4 glass-card border-0"
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('all');
                  setFilterAccount('all');
                  setFilterStatus('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}