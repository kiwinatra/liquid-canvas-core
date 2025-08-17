import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Shield, 
  Bell, 
  Globe, 
  Palette,
  Eye,
  Lock,
  Smartphone,
  Mail,
  Key,
  CreditCard,
  Download
} from "lucide-react";
import { useState } from "react";

interface SettingsPageProps {
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

export default function SettingsPage({ isDarkMode = false, onThemeToggle }: SettingsPageProps) {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  });
  
  const [security, setSecurity] = useState({
    twoFactor: true,
    emailNotifications: true,
    smsNotifications: false,
    transactionAlerts: true,
    loginAlerts: true
  });

  const [language, setLanguage] = useState('en');

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSecurityChange = (key: string, value: boolean) => {
    setSecurity(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast({
      title: "Security Settings Updated",
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and security</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 glass-card">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={16} />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield size={16} />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell size={16} />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Palette size={16} />
            <span className="hidden sm:inline">Preferences</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <GlassCard variant="glass" className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User size={20} />
              Profile Information
            </h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => setProfile(prev => ({...prev, firstName: e.target.value}))}
                  className="glass-card border-0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => setProfile(prev => ({...prev, lastName: e.target.value}))}
                  className="glass-card border-0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({...prev, email: e.target.value}))}
                    className="glass-card border-0 pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Smartphone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({...prev, phone: e.target.value}))}
                    className="glass-card border-0 pl-10"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <Button 
                onClick={handleSaveProfile}
                className="bg-gradient-primary hover:opacity-90 shadow-primary"
              >
                Save Changes
              </Button>
              <Button variant="outline" className="glass-card border-0">
                Cancel
              </Button>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            <GlassCard variant="glass" className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield size={20} />
                Security Settings
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Key size={16} />
                      <span className="font-medium">Two-Factor Authentication</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    checked={security.twoFactor}
                    onCheckedChange={(value) => handleSecurityChange('twoFactor', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Eye size={16} />
                      <span className="font-medium">Login Alerts</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                  </div>
                  <Switch
                    checked={security.loginAlerts}
                    onCheckedChange={(value) => handleSecurityChange('loginAlerts', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} />
                      <span className="font-medium">Transaction Alerts</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Receive alerts for all transactions</p>
                  </div>
                  <Switch
                    checked={security.transactionAlerts}
                    onCheckedChange={(value) => handleSecurityChange('transactionAlerts', value)}
                  />
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <Button variant="outline" className="glass-card border-0">
                  <Lock size={16} />
                  Change Password
                </Button>
                <Button variant="outline" className="glass-card border-0">
                  <Download size={16} />
                  Download Backup Codes
                </Button>
              </div>
            </GlassCard>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <GlassCard variant="glass" className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell size={20} />
              Notification Preferences
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span className="font-medium">Email Notifications</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={security.emailNotifications}
                  onCheckedChange={(value) => handleSecurityChange('emailNotifications', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Smartphone size={16} />
                    <span className="font-medium">SMS Notifications</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Switch
                  checked={security.smsNotifications}
                  onCheckedChange={(value) => handleSecurityChange('smsNotifications', value)}
                />
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="preferences">
          <GlassCard variant="glass" className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Palette size={20} />
              Appearance & Language
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="glass-card border-0 w-full sm:w-48">
                    <div className="flex items-center gap-2">
                      <Globe size={16} />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">🇺🇸 English</SelectItem>
                    <SelectItem value="ru">🇷🇺 Русский</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Palette size={16} />
                    <span className="font-medium">Dark Mode</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Use dark theme throughout the application</p>
                </div>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={onThemeToggle}
                />
              </div>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}