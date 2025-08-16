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
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [transferData, setTransferData] = useState(null);

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
      default:
        return <Dashboard onPageChange={handlePageChange} />;
    }
  };

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
