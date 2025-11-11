import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import TransferPage from "./components/TransferPage";
import TransferSuccessPage from "./components/TransferSuccessPage";
import AccountsPage from "./components/AccountsPage";
import TransactionsPage from "./components/TransactionsPage";
import CryptoAdvanced from "./components/CryptoAdvanced";
import SettingsPage from "./components/SettingsPage";
import { useState, useEffect } from "react";
import { useIndexedDB } from "@/hooks/useIndexedDB";
import i18n from "./i18n";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const queryClient = new QueryClient();

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [transferData, setTransferData] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Set default language to Russian
  const [language] = useIndexedDB('userLanguage', 'ru');

  // Update i18n language when language changes
  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Always show password on app load
  useEffect(() => {
    setIsPasswordModalOpen(true);
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '901266') {
      setIsAuthenticated(true);
      setIsPasswordModalOpen(false);
      setPassword('');
    } else {
      alert('Неверный пароль');
      setPassword('');
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setTransferData(null); // Очищаем данные при смене страницы
  };

  const handleTransferSuccess = (data: any) => {
    setTransferData(data);
    setCurrentPage('transfer-success');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Dashboard onPageChange={handlePageChange} />;
      case 'transfer':
        return <TransferPage onTransferSuccess={handleTransferSuccess} />;
      case 'transfer-success':
        return (
          <TransferSuccessPage 
            transferData={transferData}
            onBackToDashboard={() => handlePageChange('home')}
            onNewTransfer={() => handlePageChange('transfer')}
          />
        );
      case 'accounts':
        return <AccountsPage />;
      case 'transactions':
        return <TransactionsPage />;
      case 'crypto':
        return <CryptoAdvanced />;
      case 'settings':
        return <SettingsPage isDarkMode={isDarkMode} onThemeToggle={toggleTheme} />;
      default:
        return <Dashboard onPageChange={handlePageChange} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl max-w-sm mx-auto">
                <div className="text-center mb-8">
                  <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Lock size={36} className="text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2">Введите пароль</h1>
                  <p className="text-white/70">Для доступа к приложению введите пароль</p>
                </div>

                <div className="space-y-8">
                  {/* Password Display */}
                  <div className="flex justify-center space-x-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                          index < password.length
                            ? 'bg-white border-white shadow-lg'
                            : 'border-white/30 bg-white/10'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Numeric Keypad */}
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setPassword(prev => prev.length < 6 ? prev + num.toString() : prev)}
                        className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xl font-semibold hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
                        disabled={password.length >= 6}
                      >
                        {num}
                      </button>
                    ))}
                    <div></div>
                    <button
                      type="button"
                      onClick={() => setPassword(prev => prev.length < 6 ? prev + '0' : prev)}
                      className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xl font-semibold hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
                      disabled={password.length >= 6}
                    >
                      0
                    </button>
                    <button
                      type="button"
                      onClick={() => setPassword(prev => prev.slice(0, -1))}
                      className="w-16 h-16 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-300 text-xl font-semibold hover:bg-red-500/30 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
                      disabled={password.length === 0}
                    >
                      ⌫
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handlePasswordSubmit}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
                    disabled={password.length !== 6}
                  >
                    Войти
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background liquid-bg">
          <Header
            currentPage={currentPage}
            onPageChange={handlePageChange}
            isDark={isDarkMode}
            onThemeToggle={toggleTheme}
          />

          <main className="container mx-auto px-4 py-8">
            {renderPage()}
          </main>
        </div>

        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
