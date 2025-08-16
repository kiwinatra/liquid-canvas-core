import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle,
  ArrowLeft,
  Download,
  Share2,
  Clock,
  Shield
} from "lucide-react";
import { useEffect, useState } from "react";

interface TransferSuccessPageProps {
  transferData?: {
    amount: string;
    fromAccount: string;
    toAccount: string;
    description: string;
  };
  onBackToDashboard: () => void;
  onNewTransfer: () => void;
}

export default function TransferSuccessPage({ 
  transferData, 
  onBackToDashboard, 
  onNewTransfer 
}: TransferSuccessPageProps) {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStep(1), 300);
    const timer2 = setTimeout(() => setAnimationStep(2), 800);
    const timer3 = setTimeout(() => setAnimationStep(3), 1200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const transactionId = `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const currentTime = new Date().toLocaleString();

  return (
    <div className="min-h-[80vh] flex items-center justify-center liquid-bg">
      <div className="w-full max-w-md space-y-6">
        {/* Success Animation */}
        <GlassCard variant="ultra" hover className="p-8 text-center">
          <div className={`transition-all duration-500 ${animationStep >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            <div className="relative mx-auto mb-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-success/20 flex items-center justify-center animate-pulse-glow">
                <CheckCircle size={48} className="text-success" />
              </div>
              <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-2 border-success/30 animate-ping"></div>
            </div>
            
            <h1 className="text-2xl font-bold text-success mb-2">
              Transfer Successful!
            </h1>
            <p className="text-muted-foreground">
              Your money has been sent securely
            </p>
          </div>
        </GlassCard>

        {/* Transfer Details */}
        <GlassCard 
          variant="float" 
          hover 
          className={`p-6 transition-all duration-700 delay-300 ${
            animationStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Shield size={18} className="text-primary" />
            Transaction Details
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-bold text-lg text-success">
                ${parseFloat(transferData?.amount || '0').toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">From</span>
              <span className="font-medium">{transferData?.fromAccount || 'Main Account'}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">To</span>
              <span className="font-medium">{transferData?.toAccount || 'Recipient'}</span>
            </div>
            
            {transferData?.description && (
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Description</span>
                <span className="font-medium">{transferData.description}</span>
              </div>
            )}
            
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-mono text-sm">{transactionId}</span>
            </div>
            
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground flex items-center gap-1">
                <Clock size={14} />
                Completed
              </span>
              <span className="font-medium">{currentTime}</span>
            </div>
          </div>
        </GlassCard>

        {/* Action Buttons */}
        <div 
          className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-500 ${
            animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <Button 
            variant="outline" 
            onClick={onBackToDashboard}
            className="glass-card border-0 glass-hover"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Button>
          
          <Button 
            onClick={onNewTransfer}
            className="bg-gradient-primary hover:opacity-90 shadow-primary glass-hover"
          >
            New Transfer
          </Button>
        </div>

        {/* Additional Actions */}
        <GlassCard 
          variant="glass" 
          hover
          className={`p-4 transition-all duration-700 delay-700 ${
            animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2">
              <Download size={18} />
              <span className="text-xs">Download</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2">
              <Share2 size={18} />
              <span className="text-xs">Share</span>
            </Button>
          </div>
        </GlassCard>

        {/* Security Note */}
        <div 
          className={`text-center transition-all duration-700 delay-900 ${
            animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Shield size={12} />
            Your transaction is protected by bank-level security
          </p>
        </div>
      </div>
    </div>
  );
}