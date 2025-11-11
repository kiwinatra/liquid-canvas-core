import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  ComposedChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Bitcoin, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Wallet,
  ArrowUpDown,
  Eye,
  Plus,
  Minus,
  Bell,
  Star,
  Clock,
  Activity,
  PieChart as PieChartIcon,
  BarChart3,
  Zap,
  AlertTriangle,
  Target,
  BookOpen,
  Newspaper
} from "lucide-react";
import { useState, useEffect } from "react";

const cryptoData = [
  { name: '9AM', bitcoin: 45000, ethereum: 3200, cardano: 1.2, volume: 125000 },
  { name: '10AM', bitcoin: 46200, ethereum: 3300, cardano: 1.25, volume: 148000 },
  { name: '11AM', bitcoin: 47500, ethereum: 3450, cardano: 1.35, volume: 167000 },
  { name: '12PM', bitcoin: 48800, ethereum: 3600, cardano: 1.4, volume: 189000 },
  { name: '1PM', bitcoin: 52000, ethereum: 3800, cardano: 1.6, volume: 234000 },
  { name: '2PM', bitcoin: 49000, ethereum: 3600, cardano: 1.3, volume: 198000 },
  { name: '3PM', bitcoin: 55000, ethereum: 4100, cardano: 1.8, volume: 267000 },
  { name: '4PM', bitcoin: 58000, ethereum: 4300, cardano: 2.1, volume: 289000 },
];

const cryptoCoins = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 58420.50,
    change24h: 2.4,
    change7d: 5.2,
    icon: Bitcoin,
    balance: 0.0234,
    value: 1367.04,
    marketCap: 1147000000000,
    volume24h: 28000000000,
    sentiment: 'bullish'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 4283.75,
    change24h: -1.2,
    change7d: 3.8,
    balance: 2.45,
    value: 10495.19,
    marketCap: 514000000000,
    volume24h: 15000000000,
    sentiment: 'neutral'
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 2.15,
    change24h: 5.8,
    change7d: -2.1,
    balance: 1250,
    value: 2687.50,
    marketCap: 69000000000,
    volume24h: 2100000000,
    sentiment: 'bullish'
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 198.45,
    change24h: 8.2,
    change7d: 12.4,
    balance: 12.5,
    value: 2480.63,
    marketCap: 89000000000,
    volume24h: 3400000000,
    sentiment: 'very_bullish'
  }
];

const mockNews = [
  {
    id: 1,
    title: "Bitcoin reaches new all-time high amid institutional adoption",
    summary: "Major corporations continue to add Bitcoin to their treasury reserves...",
    timestamp: "2 hours ago",
    sentiment: "positive"
  },
  {
    id: 2,
    title: "Ethereum 2.0 staking rewards show promising returns",
    summary: "Early stakers report consistent yields as network upgrades continue...",
    timestamp: "4 hours ago",
    sentiment: "positive"
  },
  {
    id: 3,
    title: "Regulatory clarity brings stability to crypto markets",
    summary: "New guidelines provide framework for institutional participation...",
    timestamp: "6 hours ago",
    sentiment: "neutral"
  }
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

export default function CryptoAdvanced() {
  const { toast } = useToast();
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [activeTab, setActiveTab] = useState('overview');
  const [chartType, setChartType] = useState<'area' | 'line' | 'candle'>('area');
  const [timeframe, setTimeframe] = useState('1D');
  
  const [watchlist, setWatchlist] = useLocalStorage<string[]>('cryptoWatchlist', ['bitcoin', 'ethereum']);
  const [priceAlerts, setPriceAlerts] = useLocalStorage<Array<{id: string, coin: string, price: number, type: 'above' | 'below'}>>('priceAlerts', []);
  const [tradingHistory, setTradingHistory] = useLocalStorage<Array<{
    id: string;
    type: 'buy' | 'sell';
    coin: string;
    amount: number;
    price: number;
    timestamp: Date;
  }>>('tradingHistory', []);

  const selectedCoinData = cryptoCoins.find(coin => coin.id === selectedCoin);
  const totalPortfolioValue = cryptoCoins.reduce((sum, coin) => sum + coin.value, 0);
  const portfolioData = cryptoCoins.map(coin => ({
    name: coin.symbol,
    value: coin.value,
    percentage: ((coin.value / totalPortfolioValue) * 100).toFixed(1)
  }));

  const handleTrade = (type: 'buy' | 'sell') => {
    if (!tradeAmount || !selectedCoinData) return;

    const trade = {
      id: Date.now().toString(),
      type,
      coin: selectedCoinData.symbol,
      amount: parseFloat(tradeAmount),
      price: selectedCoinData.price,
      timestamp: new Date()
    };

    setTradingHistory(prev => [trade, ...prev.slice(0, 49)]); // Keep last 50 trades

    toast({
      title: `${type === 'buy' ? 'Purchase' : 'Sale'} Successful!`,
      description: `${type === 'buy' ? 'Bought' : 'Sold'} ${tradeAmount} ${selectedCoinData.symbol} for $${(parseFloat(tradeAmount) * selectedCoinData.price).toFixed(2)}`,
    });
    
    setTradeAmount('');
  };

  const toggleWatchlist = (coinId: string) => {
    setWatchlist(prev => 
      prev.includes(coinId) 
        ? prev.filter(id => id !== coinId)
        : [...prev, coinId]
    );
    
    const action = watchlist.includes(coinId) ? 'removed from' : 'added to';
    toast({
      title: "Watchlist Updated",
      description: `${cryptoCoins.find(c => c.id === coinId)?.name} ${action} watchlist`,
    });
  };

  const addPriceAlert = () => {
    if (!selectedCoinData) return;
    
    const alertPrice = prompt(`Set price alert for ${selectedCoinData.name}:`);
    if (!alertPrice || isNaN(parseFloat(alertPrice))) return;
    
    const alert = {
      id: Date.now().toString(),
      coin: selectedCoinData.symbol,
      price: parseFloat(alertPrice),
      type: parseFloat(alertPrice) > selectedCoinData.price ? 'above' : 'below' as 'above' | 'below'
    };
    
    setPriceAlerts(prev => [...prev, alert]);
    toast({
      title: "Price Alert Created",
      description: `Alert set for ${selectedCoinData.symbol} ${alert.type} $${alert.price}`,
    });
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'very_bullish': return 'text-success';
      case 'bullish': return 'text-success/80';
      case 'neutral': return 'text-muted-foreground';
      case 'bearish': return 'text-error/80';
      case 'very_bearish': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Advanced Crypto Trading</h1>
          <p className="text-muted-foreground">Professional trading tools and analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass-card border-0" onClick={addPriceAlert}>
            <Bell size={16} />
            Price Alert
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
            <Target size={16} />
            Pro Tools
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <PieChartIcon size={16} />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="trading" className="flex items-center gap-2">
            <ArrowUpDown size={16} />
            <span className="hidden sm:inline">Trading</span>
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <Wallet size={16} />
            <span className="hidden sm:inline">Portfolio</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 size={16} />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center gap-2">
            <Newspaper size={16} />
            <span className="hidden sm:inline">News</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6">
            {/* Quick Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <GlassCard variant="liquid" className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/20 text-success">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-xl font-bold">${totalPortfolioValue.toLocaleString()}</p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard variant="liquid" className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20 text-primary">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">24h Change</p>
                    <p className="text-xl font-bold text-success">+$1,247.32</p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard variant="liquid" className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/20 text-foreground">
                    <Activity size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Trades</p>
                    <p className="text-xl font-bold">{tradingHistory.length}</p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard variant="liquid" className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/20 text-warning">
                    <Bell size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price Alerts</p>
                    <p className="text-xl font-bold">{priceAlerts.length}</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Market Overview */}
            <GlassCard variant="liquid" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Market Overview</h2>
                <div className="flex gap-2">
                  <Button 
                    variant={timeframe === '1H' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => setTimeframe('1H')}
                    className="glass-card border-0"
                  >
                    1H
                  </Button>
                  <Button 
                    variant={timeframe === '1D' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => setTimeframe('1D')}
                    className="glass-card border-0"
                  >
                    1D
                  </Button>
                  <Button 
                    variant={timeframe === '1W' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => setTimeframe('1W')}
                    className="glass-card border-0"
                  >
                    1W
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cryptoCoins.map((coin) => {
                  const Icon = coin.icon || Bitcoin;
                  const isWatched = watchlist.includes(coin.id);
                  return (
                    <GlassCard key={coin.id} variant="glass" className="p-4 hover:scale-105 transition-transform">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-accent text-primary">
                            <Icon size={20} />
                          </div>
                          <div>
                            <h3 className="font-medium">{coin.symbol}</h3>
                            <p className="text-xs text-muted-foreground">{coin.name}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleWatchlist(coin.id)}
                          className="p-1 h-auto"
                        >
                          <Star size={16} className={isWatched ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'} />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Price</span>
                          <span className="text-sm font-medium">${coin.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">24h</span>
                          <div className={`flex items-center gap-1 text-sm ${coin.change24h >= 0 ? 'text-success' : 'text-error'}`}>
                            {coin.change24h >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            {Math.abs(coin.change24h)}%
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Sentiment</span>
                          <Badge variant="outline" className={`text-xs ${getSentimentColor(coin.sentiment || 'neutral')}`}>
                            {coin.sentiment?.replace('_', ' ') || 'neutral'}
                          </Badge>
                        </div>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        </TabsContent>

        <TabsContent value="trading">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Advanced Chart */}
            <GlassCard variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Price Chart</h2>
                <div className="flex gap-2">
                  <Button 
                    variant={chartType === 'area' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => setChartType('area')}
                    className="glass-card border-0"
                  >
                    Area
                  </Button>
                  <Button 
                    variant={chartType === 'line' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => setChartType('line')}
                    className="glass-card border-0"
                  >
                    Line
                  </Button>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'area' ? (
                    <ComposedChart data={cryptoData}>
                      <defs>
                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis yAxisId="price" stroke="hsl(var(--muted-foreground))" />
                      <YAxis yAxisId="volume" orientation="right" stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        yAxisId="price"
                        type="monotone" 
                        dataKey="bitcoin" 
                        stroke="hsl(var(--primary))" 
                        fillOpacity={1} 
                        fill="url(#priceGradient)" 
                      />
                      <Bar yAxisId="volume" dataKey="volume" fill="hsl(var(--accent))" opacity={0.3} />
                    </ComposedChart>
                  ) : (
                    <LineChart data={cryptoData}>
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
                      <Line 
                        type="monotone" 
                        dataKey="bitcoin" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </GlassCard>

            {/* Enhanced Trading Interface */}
            <GlassCard variant="glass" className="p-6">
              <h2 className="text-lg font-semibold mb-4">Advanced Trading</h2>
              
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

                <div className="space-y-4">
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
                    <div className="p-4 rounded-lg bg-accent/50 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Price per {selectedCoinData.symbol}:</span>
                        <span>${selectedCoinData.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Market Cap:</span>
                        <span>${(selectedCoinData.marketCap || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium">
                        <span>Total {tradeType === 'buy' ? 'Cost' : 'Receive'}:</span>
                        <span>${(parseFloat(tradeAmount) * selectedCoinData.price).toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setTradeAmount('0.25')}
                      className="glass-card border-0"
                    >
                      25%
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setTradeAmount('0.50')}
                      className="glass-card border-0"
                    >
                      50%
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setTradeAmount('1.0')}
                      className="glass-card border-0"
                    >
                      100%
                    </Button>
                  </div>

                  <Button 
                    onClick={() => handleTrade(tradeType)}
                    className={`w-full ${tradeType === 'buy' ? 'bg-gradient-success' : 'bg-gradient-error'} hover:opacity-90`}
                    disabled={!tradeAmount}
                  >
                    <Zap size={16} />
                    {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedCoinData?.symbol}
                  </Button>
                </div>
              </Tabs>
            </GlassCard>
          </div>
        </TabsContent>

        <TabsContent value="portfolio">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Portfolio Distribution */}
            <GlassCard variant="glass" className="p-6">
              <h2 className="text-lg font-semibold mb-4">Portfolio Distribution</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {portfolioData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm">{item.name}: {item.percentage}%</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Trading History */}
            <GlassCard variant="glass" className="p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Trades</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {tradingHistory.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No trades yet</p>
                ) : (
                  tradingHistory.slice(0, 10).map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                      <div className="flex items-center gap-3">
                        <div className={`p-1 rounded ${trade.type === 'buy' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                          {trade.type === 'buy' ? <Plus size={14} /> : <Minus size={14} />}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {trade.type.toUpperCase()} {trade.amount} {trade.coin}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(trade.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          ${(trade.amount * trade.price).toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ${trade.price}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </GlassCard>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6">
            {/* Performance Metrics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <GlassCard variant="liquid" className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-success" />
                    <span className="text-sm font-medium">Best Performer</span>
                  </div>
                  <p className="text-xl font-bold">SOL</p>
                  <p className="text-sm text-success">+12.4%</p>
                </div>
              </GlassCard>
              
              <GlassCard variant="liquid" className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Activity size={16} className="text-primary" />
                    <span className="text-sm font-medium">Volatility</span>
                  </div>
                  <p className="text-xl font-bold">Medium</p>
                  <p className="text-sm text-muted-foreground">5.2% avg</p>
                </div>
              </GlassCard>
              
              <GlassCard variant="liquid" className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Target size={16} className="text-accent" />
                    <span className="text-sm font-medium">Success Rate</span>
                  </div>
                  <p className="text-xl font-bold">78%</p>
                  <p className="text-sm text-muted-foreground">Last 30 days</p>
                </div>
              </GlassCard>
              
              <GlassCard variant="liquid" className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-warning" />
                    <span className="text-sm font-medium">ROI</span>
                  </div>
                  <p className="text-xl font-bold text-success">+24.7%</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
              </GlassCard>
            </div>

            {/* Price Alerts */}
            <GlassCard variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Price Alerts</h2>
                <Button onClick={addPriceAlert} size="sm" className="glass-card">
                  <Plus size={16} />
                  Add Alert
                </Button>
              </div>
              
              <div className="space-y-3">
                {priceAlerts.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No price alerts set</p>
                ) : (
                  priceAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                      <div className="flex items-center gap-3">
                        <AlertTriangle size={16} className="text-warning" />
                        <div>
                          <p className="text-sm font-medium">{alert.coin}</p>
                          <p className="text-xs text-muted-foreground">
                            Alert when {alert.type} ${alert.price}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setPriceAlerts(prev => prev.filter(a => a.id !== alert.id))}
                        className="text-error hover:text-error"
                      >
                        ×
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </GlassCard>
          </div>
        </TabsContent>

        <TabsContent value="news">
          <GlassCard variant="glass" className="p-6">
            <h2 className="text-lg font-semibold mb-4">Crypto News & Analysis</h2>
            
            <div className="space-y-4">
              {mockNews.map((article) => (
                <div key={article.id} className="p-4 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/20 text-primary">
                      <Newspaper size={16} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{article.summary}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock size={12} />
                          {article.timestamp}
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            article.sentiment === 'positive' ? 'text-success border-success/20' :
                            article.sentiment === 'negative' ? 'text-error border-error/20' :
                            'text-muted-foreground'
                          }`}
                        >
                          {article.sentiment}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}