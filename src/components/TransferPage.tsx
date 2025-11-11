import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowUpDown,
  Banknote,
  Shield,
  Clock,
  Smartphone,
  QrCode,
  User,
  Phone
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface TransferPageProps {
  onTransferSuccess: (transferData: any) => void;
}

export default function TransferPage({ onTransferSuccess }: TransferPageProps) {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [smsCode, setSmsCode] = useState(['', '', '', '', '', '']);
  const [qrScanned, setQrScanned] = useState(false);
  const [transferData, setTransferData] = useState({
    method: 'qr', // 'qr', 'qlid', 'phone'
    fromAccount: '',
    qlId: '',
    phone: '',
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
      if (newCode.every(digit => digit !== '')) {
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

  const handleScanQr = () => {
    // Simulate QR scan
    setQrScanned(true);
    toast({
      title: t('transfer.transferSuccessful'),
      description: "QR-код отсканирован успешно.",
    });
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    let errorMessage = '';

    if (!transferData.fromAccount) {
      errorMessage = t('transfer.fillRequired');
      isValid = false;
    } else if (transferData.method === 'qr' && !qrScanned) {
      errorMessage = t('transfer.scanQrFirst');
      isValid = false;
    } else if (transferData.method === 'qlid' && !transferData.qlId) {
      errorMessage = t('transfer.enterQlIdFirst');
      isValid = false;
    } else if (transferData.method === 'phone' && !transferData.phone) {
      errorMessage = t('transfer.enterPhoneFirst');
      isValid = false;
    } else if (!transferData.amount) {
      errorMessage = t('transfer.fillRequired');
      isValid = false;
    } else if (parseFloat(transferData.amount) <= 0) {
      errorMessage = t('transfer.invalidAmount');
      isValid = false;
    }

    if (!isValid) {
      toast({
        title: t('transfer.error'),
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    setIsConfirmOpen(true);
    setSmsCode(['', '', '', '', '', '']);
  };

  const resetForm = () => {
    setTransferData({
      method: 'qr',
      fromAccount: '',
      qlId: '',
      phone: '',
      amount: '',
      description: ''
    });
    setQrScanned(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">{t('transfer.title')}</h1>
        <p className="text-muted-foreground">{t('transfer.subtitle')}</p>
      </div>

      <GlassCard hover className="p-6">
        <form onSubmit={handleTransfer}>
          <Tabs value={transferData.method} onValueChange={(value) => setTransferData(prev => ({...prev, method: value}))} className="w-full">
            <TabsList className="grid w-full grid-cols-3 border-0">
            <TabsTrigger value="qr" className="flex items-center gap-2">
              <QrCode size={16} />
              {t('transfer.qr')}
            </TabsTrigger>
            <TabsTrigger value="qlid" className="flex items-center gap-2">
              <User size={16} />
              {t('transfer.qlId')}
            </TabsTrigger>
            <TabsTrigger value="phone" className="flex items-center gap-2">
              <Phone size={16} />
              {t('transfer.phone')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="qr" className="space-y-6 mt-6">
            <div className="text-center">
              <Button
                type="button"
                onClick={handleScanQr}
                className="bg-gradient-primary hover:opacity-90 shadow-primary glass-hover"
                disabled={qrScanned}
              >
                <QrCode size={16} className="mr-2" />
                {qrScanned ? 'QR-код отсканирован' : t('transfer.scanQr')}
              </Button>
              {qrScanned && (
                <p className="text-sm text-muted-foreground mt-2">QR-код успешно отсканирован</p>
              )}
            </div>

            {qrScanned && (
              <>
                {/* From Account */}
                <div className="space-y-2">
                  <Label htmlFor="from-account-qr">{t('transfer.selectAccount')}</Label>
                  <Select
                    value={transferData.fromAccount}
                    onValueChange={(value) => setTransferData(prev => ({...prev, fromAccount: value}))}
                  >
                    <SelectTrigger className="glass-card border-0 glass-hover">
                      <SelectValue placeholder={t('transfer.selectAccount')} />
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

                {/* Amount */}
                <div className="space-y-2">
                  <Label htmlFor="amount-qr">{t('transfer.enterAmount')}</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      $
                    </div>
                    <Input
                      id="amount-qr"
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

                {/* Transfer Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:opacity-90 shadow-primary glass-hover"
                  disabled={!transferData.fromAccount || !transferData.amount}
                >
                  <ArrowUpDown size={16} className="mr-2" />
                  {t('transfer.transfer')}
                </Button>
              </>
            )}
          </TabsContent>

          <TabsContent value="qlid" className="space-y-6 mt-6">
            {/* QL-ID Input */}
            <div className="space-y-2">
              <Label htmlFor="qlid">{t('transfer.enterQlId')}</Label>
              <Input
                id="qlid"
                placeholder="Введите QL-ID"
                className="glass-card border-0 glass-hover"
                value={transferData.qlId}
                onChange={(e) => setTransferData(prev => ({...prev, qlId: e.target.value}))}
              />
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount-qlid">{t('transfer.enterAmount')}</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  $
                </div>
                <Input
                  id="amount-qlid"
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

            {/* From Account */}
            <div className="space-y-2">
              <Label htmlFor="from-account-qlid">{t('transfer.selectAccount')}</Label>
              <Select
                value={transferData.fromAccount}
                onValueChange={(value) => setTransferData(prev => ({...prev, fromAccount: value}))}
              >
                <SelectTrigger className="glass-card border-0 glass-hover">
                  <SelectValue placeholder={t('transfer.selectAccount')} />
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

            {/* Transfer Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90 shadow-primary glass-hover"
              disabled={!transferData.qlId || !transferData.fromAccount || !transferData.amount}
            >
              <ArrowUpDown size={16} className="mr-2" />
              {t('transfer.transfer')}
            </Button>
          </TabsContent>

          <TabsContent value="phone" className="space-y-6 mt-6">
            {/* Phone Input */}
            <div className="space-y-2">
              <Label htmlFor="phone">{t('transfer.enterPhone')}</Label>
              <Input
                id="phone"
                placeholder="+7 (999) 123-45-67"
                className="glass-card border-0 glass-hover"
                value={transferData.phone}
                onChange={(e) => setTransferData(prev => ({...prev, phone: e.target.value}))}
              />
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount-phone">{t('transfer.enterAmount')}</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  $
                </div>
                <Input
                  id="amount-phone"
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

            {/* From Account */}
            <div className="space-y-2">
              <Label htmlFor="from-account-phone">{t('transfer.selectAccount')}</Label>
              <Select
                value={transferData.fromAccount}
                onValueChange={(value) => setTransferData(prev => ({...prev, fromAccount: value}))}
              >
                <SelectTrigger className="glass-card border-0 glass-hover">
                  <SelectValue placeholder={t('transfer.selectAccount')} />
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

            {/* Transfer Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90 shadow-primary glass-hover"
              disabled={!transferData.phone || !transferData.fromAccount || !transferData.amount}
            >
              <ArrowUpDown size={16} className="mr-2" />
              {t('transfer.transfer')}
            </Button>
          </TabsContent>
        </Tabs>
        </form>

        {/* Clear Button */}
        <div className="flex justify-center pt-4">
          <Button
            type="button"
            variant="outline"
            className="glass-card border-0 glass-hover"
            onClick={resetForm}
          >
            {t('transfer.clear')}
          </Button>
        </div>
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
              {t('transfer.smsVerification')}
            </DialogTitle>
            <DialogDescription>
              {t('transfer.smsDescription')}
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
                {t('transfer.resendCode')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}