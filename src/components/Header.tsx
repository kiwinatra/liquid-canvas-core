import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { 
  Wallet, 
  Home, 
  CreditCard, 
  ArrowUpDown, 
  Receipt, 
  Sun, 
  Moon,
  Menu,
  X,
  ChevronDown,
  Bitcoin,
  Settings
} from "lucide-react";
import { useState, useEffect } from "react";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

export default function Header({ currentPage, onPageChange, isDark, onThemeToggle }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'accounts', label: 'Accounts', icon: CreditCard },
    { id: 'transfer', label: 'Transfer', icon: ArrowUpDown },
    { id: 'crypto', label: 'Crypto', icon: Bitcoin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const toggleLanguage = () => {
    setCurrentLang(prev => prev === 'EN' ? 'RU' : 'EN');
    setIsLanguageOpen(false);
  };

  // Close mobile menu when page changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border backdrop-blur-xl bg-background/80">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => onPageChange('home')}
            >
              <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground group-hover:shadow-primary transition-all">
                <Wallet size={24} />
              </div>
              <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
                QL7
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => onPageChange(id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:bg-accent",
                    currentPage === id 
                      ? "text-primary bg-accent" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </nav>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="hidden sm:flex items-center gap-1"
                >
                  {currentLang}
                  <ChevronDown size={16} />
                </Button>
                
                {isLanguageOpen && (
                  <GlassCard 
                    variant="glass" 
                    className="absolute right-0 top-12 p-2 min-w-[120px] z-50"
                  >
                    <button
                      onClick={toggleLanguage}
                      className="w-full px-3 py-2 text-left hover:bg-accent rounded-md transition-colors"
                    >
                      {currentLang === 'EN' ? 'Русский' : 'English'}
                    </button>
                  </GlassCard>
                )}
              </div>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onThemeToggle}
                className="p-2"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <GlassCard 
             
            className="fixed top-16 left-4 right-4 p-4 z-50 md:hidden animate-slide-up"
          >
            <nav className="space-y-2">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => onPageChange(id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left",
                    currentPage === id 
                      ? "text-primary bg-accent" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon size={20} />
                  {label}
                </button>
              ))}
            </nav>
            
            <div className="mt-4 pt-4 border-t border-border">
              <button
                onClick={toggleLanguage}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left hover:bg-accent"
              >
                Language: {currentLang}
              </button>
            </div>
          </GlassCard>
        </>
      )}

      {/* Click outside to close language dropdown */}
      {isLanguageOpen && (
        <div 
          className="fixed inset-0 z-30"
          onClick={() => setIsLanguageOpen(false)}
        />
      )}
    </>
  );
}