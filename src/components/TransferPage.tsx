import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowUpDown, 
  Banknote, 
  Shield, 
  Clock,
  Smartphone
} from "lucide-react";
import { useState } from "react";

interface TransferPageProps {
  onTransferSuccess: (transferData: any) => void;
}

export default function TransferPage({ onTransferSuccess }: TransferPageProps) {
  const { toast } = useToast();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [smsCode, setSmsCode] = useState(['', '', '', '', '', '']);
  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    description: ''
  });

  const accounts = [
    { id: '1', name: 'Main Account (**** 1234)', balance: 24500.75 },
    { id: '2', name: 'Savings Account (**** 5678)', balance: 8900.00 },
  ];

  const recipients = [
    { id: '1', name: 'John Smith', account: '**** 9876' },
    { id: '2', name: 'Jane Doe', account: '**** 5432' },
    { id: 'new', name: 'Add New Recipient', account: '' }
  ];

  const handleSmsCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...smsCode];
      newCode[index] = value;
      setSmsCode(newCode);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`sms-${index + 1}`);
        nextInput?.focus();
      }
      
      // Check if code is complete
      if (newCode.every(digit => digit !== '') && newCode.join('') === '123456') {
        setTimeout(() => {
          setIsConfirmOpen(false);
          onTransferSuccess(transferData);
          toast({
            title: "Transfer Successful!",
            description: `$${transferData.amount} has been transferred successfully.`,
          });
        }, 1000);
      }
    }
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transferData.fromAccount || !transferData.toAccount || !transferData.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(transferData.amount) <= 0) {
      toast({
        title: "Error", 
        description: "Please enter a valid amount.",
        variant: "destructive",
      });
      return;
    }

    setIsConfirmOpen(true);
    setSmsCode(['', '', '', '', '', '']);
  };

  const resetForm = () => {
    setTransferData({
      fromAccount: '',
      toAccount: '',
      amount: '',
      description: ''
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Transfer Money</h1>
        <p className="text-muted-foreground">Send money quickly and securely</p>
      </div>

      <GlassCard variant="ultra" hover className="p-6">
        <form onSubmit={handleTransfer} className="space-y-6">
          {/* From Account */}
          <div className="space-y-2">
            <Label htmlFor="from-account">From Account</Label>
            <Select 
              value={transferData.fromAccount} 
              onValueChange={(value) => setTransferData(prev => ({...prev, fromAccount: value}))}
            >
              <SelectTrigger className="glass-card border-0 glass-hover">
                <SelectValue placeholder="Select account to transfer from" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{account.name}</span>
                      <span className="text-muted-foreground ml-4">
                        ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* To Account/Recipient */}
          <div className="space-y-2">
            <Label htmlFor="to-account">To Recipient</Label>
            <Select 
              value={transferData.toAccount} 
              onValueChange={(value) => setTransferData(prev => ({...prev, toAccount: value}))}
            >
              <SelectTrigger className="glass-card border-0 glass-hover">
                <SelectValue placeholder="Select recipient" />
              </SelectTrigger>
              <SelectContent>
                {recipients.map((recipient) => (
                  <SelectItem key={recipient.id} value={recipient.id}>
                    <div className="flex items-center gap-2">
                      <span>{recipient.name}</span>
                      {recipient.account && (
                        <span className="text-muted-foreground">({recipient.account})</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                $
              </div>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className="glass-card border-0 pl-8 glass-hover"
                value={transferData.amount}
                onChange={(e) => setTransferData(prev => ({...prev, amount: e.target.value}))}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="What's this transfer for?"
              className="glass-card border-0 resize-none glass-hover"
              rows={3}
              value={transferData.description}
              onChange={(e) => setTransferData(prev => ({...prev, description: e.target.value}))}
            />
          </div>

          {/* Transfer Summary */}
          {transferData.fromAccount && transferData.toAccount && transferData.amount && (
            <GlassCard variant="float" morph hover className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Shield size={16} />
                Transfer Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>From:</span>
                  <span>{accounts.find(a => a.id === transferData.fromAccount)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>To:</span>
                  <span>{recipients.find(r => r.id === transferData.toAccount)?.name}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Amount:</span>
                  <span>${parseFloat(transferData.amount || '0').toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fee:</span>
                  <span className="text-success">Free</span>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1 glass-card border-0 glass-hover"
              onClick={resetForm}
            >
              Clear
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-primary hover:opacity-90 shadow-primary glass-hover"
            >
              <ArrowUpDown size={16} />
              Transfer Money
            </Button>
          </div>
        </form>
      </GlassCard>

      {/* Features */}
      <div className="grid sm:grid-cols-3 gap-4">
        <GlassCard variant="glass" hover className="p-4 text-center">
          <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
          <h3 className="font-medium mb-1">Secure</h3>
          <p className="text-sm text-muted-foreground">Bank-level encryption</p>
        </GlassCard>
        
        <GlassCard variant="glass" hover className="p-4 text-center">
          <Clock className="w-8 h-8 mx-auto mb-2 text-secondary" />
          <h3 className="font-medium mb-1">Instant</h3>
          <p className="text-sm text-muted-foreground">Transfer in seconds</p>
        </GlassCard>
        
        <GlassCard variant="glass" hover className="p-4 text-center">
          <Banknote className="w-8 h-8 mx-auto mb-2 text-success" />
          <h3 className="font-medium mb-1">No Fees</h3>
          <p className="text-sm text-muted-foreground">Free transfers</p>
        </GlassCard>
      </div>

      {/* SMS Confirmation Modal */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="sm:max-w-md glass-card border-0">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Smartphone size={20} />
              SMS Verification
            </DialogTitle>
            <DialogDescription>
              We've sent a 6-digit code to your registered mobile number. Enter it below to confirm the transfer.
              <br />
              <span className="text-xs text-muted-foreground mt-2 block">
                (Demo code: 123456)
              </span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              {smsCode.map((digit, index) => (
                <Input
                  key={index}
                  id={`sms-${index}`}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg font-semibold glass-card border-0"
                  value={digit}
                  onChange={(e) => handleSmsCodeChange(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !digit && index > 0) {
                      const prevInput = document.getElementById(`sms-${index - 1}`);
                      prevInput?.focus();
                    }
                  }}
                />
              ))}
            </div>
            
            <div className="text-center">
              <Button variant="ghost" size="sm" className="text-primary">
                Resend Code
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}