import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Wallet, 
  PiggyBank, 
  TrendingUp,
  Plus,
  Eye,
  Settings,
  Lock,
  Bell
} from "lucide-react";
import { useState } from "react";

interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
  currency: string;
  type: 'checking' | 'savings' | 'credit';
  interestRate?: number;
  creditLimit?: number;
}

export default function AccountsPage() {
  const { toast } = useToast();
  const [showNewAccountForm, setShowNewAccountForm] = useState(false);
  const [newAccount, setNewAccount] = useState({
    type: 'checking',
    currency: 'USD',
    initialDeposit: ''
  });

  const accounts: Account[] = [
    {
      id: '1',
      name: 'Main Checking',
      number: '**** **** **** 1234',
      balance: 24500.75,
      currency: 'USD',
      type: 'checking'
    },
    {
      id: '2',
      name: 'High-Yield Savings',
      number: '**** **** **** 5678',
      balance: 8900.00,
      currency: 'USD',
      type: 'savings',
      interestRate: 4.5
    },
    {
      id: '3',
      name: 'Premium Credit',
      number: '**** **** **** 9012',
      balance: -1250.50,
      currency: 'USD',
      type: 'credit',
      creditLimit: 10000
    }
  ];

  const accountTypes = [
    {
      id: 'checking',
      name: 'Checking Account',
      description: 'For daily expenses and transactions',
      icon: Wallet,
      features: ['Free transfers', 'Debit card', 'Online banking', 'Mobile deposits']
    },
    {
      id: 'savings',
      name: 'Savings Account', 
      description: 'Earn interest on your savings',
      icon: PiggyBank,
      features: ['4.5% APY', 'Compound interest', 'No monthly fees', 'Goal tracking']
    },
    {
      id: 'credit',
      name: 'Credit Card',
      description: 'Build credit with flexible spending',
      icon: CreditCard,
      features: ['$10,000 limit', 'Cashback rewards', 'Travel insurance', 'No annual fee']
    }
  ];

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedType = accountTypes.find(t => t.id === newAccount.type);
    
    toast({
      title: "Account Created!",
      description: `Your ${selectedType?.name} has been successfully created.`,
    });
    
    setShowNewAccountForm(false);
    setNewAccount({
      type: 'checking',
      currency: 'USD', 
      initialDeposit: ''
    });
  };

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'savings': return PiggyBank;
      case 'credit': return CreditCard;
      default: return Wallet;
    }
  };

  const getAccountColor = (type: string) => {
    switch (type) {
      case 'savings': return 'text-success';
      case 'credit': return 'text-warning';
      default: return 'text-primary';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Your Accounts</h1>
          <p className="text-muted-foreground">Manage your banking accounts</p>
        </div>
        <Button 
          onClick={() => setShowNewAccountForm(true)}
          className="bg-gradient-primary hover:opacity-90 shadow-primary"
        >
          <Plus size={16} />
          Open New Account
        </Button>
      </div>

      {/* Account Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => {
          const Icon = getAccountIcon(account.type);
          return (
            <GlassCard key={account.id} variant="glass" className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg bg-accent ${getAccountColor(account.type)}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{account.name}</h3>
                    <p className="text-sm text-muted-foreground">{account.number}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="p-2">
                  <Settings size={16} />
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Balance</p>
                  <p className={`text-xl font-bold ${account.balance < 0 ? 'text-error' : 'text-foreground'}`}>
                    ${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>

                {account.interestRate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Interest Rate</span>
                    <span className="text-sm font-medium text-success">{account.interestRate}% APY</span>
                  </div>
                )}

                {account.creditLimit && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Available Credit</span>
                      <span>${(account.creditLimit + account.balance).toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-accent h-2 rounded-full">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all"
                        style={{ width: `${((account.creditLimit + account.balance) / account.creditLimit) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1 glass-card border-0">
                  <Eye size={14} />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1 glass-card border-0">
                  <TrendingUp size={14} />
                  Activity
                </Button>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Account Types */}
      {showNewAccountForm ? (
        <GlassCard variant="glass" className="p-6">
          <form onSubmit={handleCreateAccount} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Open New Account</h2>
            </div>

            <div className="space-y-4">
              <Label>Account Type</Label>
              <RadioGroup 
                value={newAccount.type} 
                onValueChange={(value) => setNewAccount(prev => ({...prev, type: value}))}
                className="grid gap-4 sm:grid-cols-3"
              >
                {accountTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div key={type.id} className="relative">
                      <RadioGroupItem 
                        value={type.id} 
                        id={type.id}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={type.id}
                        className="flex flex-col p-4 rounded-lg border-2 border-border cursor-pointer hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5 transition-all"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Icon size={20} className="text-primary" />
                          <span className="font-medium">{type.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                        <ul className="text-xs space-y-1">
                          {type.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                              <div className="w-1 h-1 bg-primary rounded-full" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select 
                  value={newAccount.currency} 
                  onValueChange={(value) => setNewAccount(prev => ({...prev, currency: value}))}
                >
                  <SelectTrigger className="glass-card border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="initial-deposit">Initial Deposit (Optional)</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    $
                  </div>
                  <Input
                    id="initial-deposit"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="glass-card border-0 pl-8"
                    value={newAccount.initialDeposit}
                    onChange={(e) => setNewAccount(prev => ({...prev, initialDeposit: e.target.value}))}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 glass-card border-0"
                onClick={() => setShowNewAccountForm(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-primary hover:opacity-90 shadow-primary"
              >
                Open Account
              </Button>
            </div>
          </form>
        </GlassCard>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Account Types</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {accountTypes.map((type) => {
              const Icon = type.icon;
              return (
                <GlassCard 
                  key={type.id} 
                  variant="glass" 
                  className="p-6 cursor-pointer hover:border-primary/50 transition-all"
                  onClick={() => setShowNewAccountForm(true)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-lg bg-accent text-primary">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{type.name}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                  
                  <ul className="text-sm space-y-1 mb-4">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="outline" size="sm" className="w-full glass-card border-0">
                    <Plus size={14} />
                    Open Account
                  </Button>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}

      {/* Security Features */}
      <GlassCard variant="liquid" className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lock size={20} />
          Account Security
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span className="text-sm">Two-factor authentication enabled</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span className="text-sm">Account alerts active</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span className="text-sm">Fraud monitoring active</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}