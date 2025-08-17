import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  Bitcoin, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Wallet,
  ArrowUpDown,
  Eye,
  Plus,
  Minus
} from "lucide-react";
import { useState } from "react";

const cryptoData = [
  { name: 'Jan', bitcoin: 45000, ethereum: 3200, cardano: 1.2 },
  { name: 'Feb', bitcoin: 48000, ethereum: 3500, cardano: 1.4 },
  { name: 'Mar', bitcoin: 52000, ethereum: 3800, cardano: 1.6 },
  { name: 'Apr', bitcoin: 49000, ethereum: 3600, cardano: 1.3 },
  { name: 'May', bitcoin: 55000, ethereum: 4100, cardano: 1.8 },
  { name: 'Jun', bitcoin: 58000, ethereum: 4300, cardano: 2.1 },
];

const cryptoCoins = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 58420.50,
    change24h: 2.4,
    icon: Bitcoin,
    balance: 0.0234,
    value: 1367.04
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 4283.75,
    change24h: -1.2,
    balance: 2.45,
    value: 10495.19
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 2.15,
    change24h: 5.8,
    balance: 1250,
    value: 2687.50
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 198.45,
    change24h: 8.2,
    balance: 12.5,
    value: 2480.63
  }
];

export default function CryptoPage() {
  const { toast } = useToast();
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  const selectedCoinData = cryptoCoins.find(coin => coin.id === selectedCoin);
  const totalPortfolioValue = cryptoCoins.reduce((sum, coin) => sum + coin.value, 0);

  const handleTrade = (type: 'buy' | 'sell') => {
    if (!tradeAmount || !selectedCoinData) return;

    toast({
      title: `${type === 'buy' ? 'Purchase' : 'Sale'} Successful!`,
      description: `${type === 'buy' ? 'Bought' : 'Sold'} ${tradeAmount} ${selectedCoinData.symbol} for $${(parseFloat(tradeAmount) * selectedCoinData.price).toFixed(2)}`,
    });
    
    setTradeAmount('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Cryptocurrency Trading</h1>
          <p className="text-muted-foreground">Buy, sell and track digital assets</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass-card border-0">
            <Eye size={16} />
            Portfolio
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
            <Plus size={16} />
            Add Funds
          </Button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <GlassCard variant="liquid" className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Your Crypto Portfolio</h2>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold text-success">${totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cryptoCoins.map((coin) => {
            const Icon = coin.icon || Bitcoin;
            return (
              <GlassCard key={coin.id} variant="glass" className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-accent text-primary">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">{coin.symbol}</h3>
                    <p className="text-xs text-muted-foreground">{coin.name}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Balance</span>
                    <span className="text-sm font-medium">{coin.balance} {coin.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Value</span>
                    <span className="text-sm font-medium">${coin.value.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">24h</span>
                    <div className={`flex items-center gap-1 text-sm ${coin.change24h >= 0 ? 'text-success' : 'text-error'}`}>
                      {coin.change24h >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {Math.abs(coin.change24h)}%
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Market Chart */}
        <GlassCard variant="glass" className="p-6">
          <h2 className="text-lg font-semibold mb-4">Market Trends</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cryptoData}>
                <defs>
                  <linearGradient id="bitcoinGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="bitcoin" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#bitcoinGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Trading Interface */}
        <GlassCard variant="glass" className="p-6">
          <h2 className="text-lg font-semibold mb-4">Trade Cryptocurrency</h2>
          
          <Tabs value={tradeType} onValueChange={(value) => setTradeType(value as 'buy' | 'sell')} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 glass-card">
              <TabsTrigger value="buy" className="data-[state=active]:bg-success/20 data-[state=active]:text-success">
                <Plus size={16} className="mr-2" />
                Buy
              </TabsTrigger>
              <TabsTrigger value="sell" className="data-[state=active]:bg-error/20 data-[state=active]:text-error">
                <Minus size={16} className="mr-2" />
                Sell
              </TabsTrigger>
            </TabsList>

            <TabsContent value="buy" className="space-y-4">
              <div className="space-y-2">
                <Label>Select Cryptocurrency</Label>
                <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                  <SelectTrigger className="glass-card border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cryptoCoins.map((coin) => (
                      <SelectItem key={coin.id} value={coin.id}>
                        <div className="flex items-center gap-2">
                          <span>{coin.symbol}</span>
                          <span className="text-muted-foreground">- ${coin.price}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Amount ({selectedCoinData?.symbol})</Label>
                <Input
                  type="number"
                  step="0.00001"
                  placeholder="0.001"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  className="glass-card border-0"
                />
              </div>

              {selectedCoinData && tradeAmount && (
                <div className="p-3 rounded-lg bg-accent/50">
                  <div className="flex justify-between text-sm">
                    <span>Price per {selectedCoinData.symbol}:</span>
                    <span>${selectedCoinData.price}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Total Cost:</span>
                    <span>${(parseFloat(tradeAmount) * selectedCoinData.price).toFixed(2)}</span>
                  </div>
                </div>
              )}

              <Button 
                onClick={() => handleTrade('buy')}
                className="w-full bg-gradient-success hover:opacity-90"
                disabled={!tradeAmount}
              >
                <Plus size={16} />
                Buy {selectedCoinData?.symbol}
              </Button>
            </TabsContent>

            <TabsContent value="sell" className="space-y-4">
              <div className="space-y-2">
                <Label>Select Cryptocurrency</Label>
                <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                  <SelectTrigger className="glass-card border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cryptoCoins.map((coin) => (
                      <SelectItem key={coin.id} value={coin.id}>
                        <div className="flex items-center gap-2">
                          <span>{coin.symbol}</span>
                          <span className="text-muted-foreground">- Balance: {coin.balance}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Amount ({selectedCoinData?.symbol})</Label>
                <Input
                  type="number"
                  step="0.00001"
                  placeholder="0.001"
                  max={selectedCoinData?.balance}
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  className="glass-card border-0"
                />
                <p className="text-xs text-muted-foreground">
                  Available: {selectedCoinData?.balance} {selectedCoinData?.symbol}
                </p>
              </div>

              {selectedCoinData && tradeAmount && (
                <div className="p-3 rounded-lg bg-accent/50">
                  <div className="flex justify-between text-sm">
                    <span>Price per {selectedCoinData.symbol}:</span>
                    <span>${selectedCoinData.price}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>You'll Receive:</span>
                    <span>${(parseFloat(tradeAmount) * selectedCoinData.price).toFixed(2)}</span>
                  </div>
                </div>
              )}

              <Button 
                onClick={() => handleTrade('sell')}
                className="w-full bg-gradient-error hover:opacity-90"
                disabled={!tradeAmount || (selectedCoinData && parseFloat(tradeAmount) > selectedCoinData.balance)}
              >
                <Minus size={16} />
                Sell {selectedCoinData?.symbol}
              </Button>
            </TabsContent>
          </Tabs>
        </GlassCard>
      </div>

      {/* Market Data */}
      <GlassCard variant="glass" className="p-6">
        <h2 className="text-lg font-semibold mb-4">Market Data</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 font-medium">Asset</th>
                <th className="text-right py-3 font-medium">Price</th>
                <th className="text-right py-3 font-medium">24h Change</th>
                <th className="text-right py-3 font-medium">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {cryptoCoins.map((coin) => {
                const Icon = coin.icon || Bitcoin;
                return (
                  <tr key={coin.id} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <Icon size={20} className="text-primary" />
                        <div>
                          <p className="font-medium">{coin.name}</p>
                          <p className="text-sm text-muted-foreground">{coin.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-4 font-medium">
                      ${coin.price.toLocaleString()}
                    </td>
                    <td className={`text-right py-4 ${coin.change24h >= 0 ? 'text-success' : 'text-error'}`}>
                      <div className="flex items-center justify-end gap-1">
                        {coin.change24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {Math.abs(coin.change24h)}%
                      </div>
                    </td>
                    <td className="text-right py-4 text-muted-foreground">
                      ${(coin.price * 21000000).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}