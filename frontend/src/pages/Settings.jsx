import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { useData } from '../components/DataManager';
import { mockLanguages, mockVoiceSettings } from '../utils/mockData';
import { 
  Settings as SettingsIcon, 
  User, 
  Volume2, 
  Globe, 
  Headphones, 
  Bell, 
  Shield, 
  Eye,
  Download,
  Trash2,
  Save,
  RefreshCw,
  Languages,
  Mic,
  Speaker,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const { settings: savedSettings, saveSettings } = useData();
  
  const [settings, setSettings] = useState({
    // Voice Settings
    voiceSpeed: mockVoiceSettings.speed,
    voicePitch: mockVoiceSettings.pitch,
    voiceVolume: mockVoiceSettings.volume,
    preferredLanguage: mockVoiceSettings.preferredLanguage,
    autoTranslate: mockVoiceSettings.autoTranslate,
    showTranscript: mockVoiceSettings.showTranscript,
    voiceGender: 'neutral',
    audioQuality: 'high',
    
    // User Preferences
    theme: 'system',
    fontSize: 'medium',
    autoPlay: false,
    continueListening: true,
    skipIntros: false,
    
    // Notifications
    emailNotifications: true,
    newStoryAlerts: true,
    communityUpdates: false,
    weeklyDigest: true,
    
    // Privacy
    shareListeningHistory: false,
    allowPersonalization: true,
    dataCollection: 'minimal',
    
    // Profile
    displayName: 'Story Lover',
    email: 'user@example.com',
    preferredCultures: ['Khasi', 'Maori'],
    interests: ['Creation Myths', 'Nature Stories'],
    
    // Override with saved settings
    ...savedSettings
  });

  // Load saved settings on component mount
  useEffect(() => {
    if (savedSettings && Object.keys(savedSettings).length > 0) {
      setSettings(prev => ({ ...prev, ...savedSettings }));
    }
  }, [savedSettings]);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    try {
      const savedSettings = await saveSettings(settings);
      if (savedSettings) {
        toast({
          title: "Settings saved",
          description: "Your preferences have been updated and saved locally.",
        });
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      console.error('Settings save error:', error);
      toast({
        title: "Save failed",
        description: "There was an error saving your settings. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleResetSettings = () => {
    setSettings({
      ...settings,
      voiceSpeed: 1.0,
      voicePitch: 1.0,
      voiceVolume: 0.8,
      preferredLanguage: 'English',
      autoTranslate: false,
      showTranscript: true,
      theme: 'system',
      fontSize: 'medium',
      autoPlay: false
    });
    toast({
      title: "Settings reset",
      description: "All settings have been reset to default values.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data exported",
      description: "Your listening history and preferences have been downloaded.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "You will receive a confirmation email shortly.",
      variant: "destructive"
    });
  };

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ];

  const fontSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'xlarge', label: 'Extra Large' }
  ];

  const audioQualities = [
    { value: 'standard', label: 'Standard (128 kbps)' },
    { value: 'high', label: 'High (256 kbps)' },
    { value: 'premium', label: 'Premium (320 kbps)' }
  ];

  const dataCollectionOptions = [
    { value: 'minimal', label: 'Minimal - Only essential data' },
    { value: 'standard', label: 'Standard - Help improve the service' },
    { value: 'full', label: 'Full - Personalized recommendations' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <SettingsIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
            Settings
          </h1>
          <p className="text-lg text-amber-600 max-w-2xl mx-auto">
            Customize your FolkloreGPT experience to suit your preferences
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="voice" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
              <TabsTrigger value="voice">Voice</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Voice Settings */}
            <TabsContent value="voice" className="space-y-6">
              <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-800 flex items-center gap-2">
                    <Headphones className="w-6 h-6" />
                    Voice & Audio Settings
                  </CardTitle>
                  <CardDescription className="text-amber-600">
                    Customize how stories are narrated and how you interact with the voice assistant
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="voiceSpeed" className="text-amber-800 mb-2 block">
                        Speaking Speed
                      </Label>
                      <div className="space-y-2">
                        <Slider
                          id="voiceSpeed"
                          min={0.5}
                          max={2.0}
                          step={0.1}
                          value={[settings.voiceSpeed]}
                          onValueChange={(value) => handleSettingChange('voiceSpeed', value[0])}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-amber-600">
                          <span>Slow</span>
                          <span>{settings.voiceSpeed.toFixed(1)}x</span>
                          <span>Fast</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="voicePitch" className="text-amber-800 mb-2 block">
                        Voice Pitch
                      </Label>
                      <div className="space-y-2">
                        <Slider
                          id="voicePitch"
                          min={0.5}
                          max={2.0}
                          step={0.1}
                          value={[settings.voicePitch]}
                          onValueChange={(value) => handleSettingChange('voicePitch', value[0])}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-amber-600">
                          <span>Low</span>
                          <span>{settings.voicePitch.toFixed(1)}</span>
                          <span>High</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="voiceVolume" className="text-amber-800 mb-2 block">
                      Audio Volume
                    </Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <Volume2 className="w-4 h-4 text-amber-600" />
                        <Slider
                          id="voiceVolume"
                          min={0}
                          max={1}
                          step={0.1}
                          value={[settings.voiceVolume]}
                          onValueChange={(value) => handleSettingChange('voiceVolume', value[0])}
                          className="flex-1"
                        />
                        <span className="text-sm text-amber-600 w-12">
                          {Math.round(settings.voiceVolume * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="preferredLanguage" className="text-amber-800 mb-2 block">
                        Preferred Language
                      </Label>
                      <Select
                        value={settings.preferredLanguage}
                        onValueChange={(value) => handleSettingChange('preferredLanguage', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          {mockLanguages.map((language) => (
                            <SelectItem key={language} value={language}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="audioQuality" className="text-amber-800 mb-2 block">
                        Audio Quality
                      </Label>
                      <Select
                        value={settings.audioQuality}
                        onValueChange={(value) => handleSettingChange('audioQuality', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {audioQualities.map((quality) => (
                            <SelectItem key={quality.value} value={quality.value}>
                              {quality.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="autoTranslate" className="text-amber-800">
                          Auto-translate stories
                        </Label>
                        <p className="text-sm text-amber-600">
                          Automatically translate stories to your preferred language
                        </p>
                      </div>
                      <Switch
                        id="autoTranslate"
                        checked={settings.autoTranslate}
                        onCheckedChange={(checked) => handleSettingChange('autoTranslate', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="showTranscript" className="text-amber-800">
                          Show transcripts
                        </Label>
                        <p className="text-sm text-amber-600">
                          Display text transcripts while listening to stories
                        </p>
                      </div>
                      <Switch
                        id="showTranscript"
                        checked={settings.showTranscript}
                        onCheckedChange={(checked) => handleSettingChange('showTranscript', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="continueListening" className="text-amber-800">
                          Continue listening
                        </Label>
                        <p className="text-sm text-amber-600">
                          Automatically play related stories after current one ends
                        </p>
                      </div>
                      <Switch
                        id="continueListening"
                        checked={settings.continueListening}
                        onCheckedChange={(checked) => handleSettingChange('continueListening', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Display Settings */}
            <TabsContent value="display" className="space-y-6">
              <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-800 flex items-center gap-2">
                    <Eye className="w-6 h-6" />
                    Display Settings
                  </CardTitle>
                  <CardDescription className="text-amber-600">
                    Customize the appearance and accessibility of the interface
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-amber-800 mb-3 block">Theme</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {themes.map((theme) => {
                        const Icon = theme.icon;
                        return (
                          <Button
                            key={theme.value}
                            variant={settings.theme === theme.value ? "default" : "outline"}
                            onClick={() => handleSettingChange('theme', theme.value)}
                            className={`flex flex-col items-center gap-2 h-auto py-4 ${
                              settings.theme === theme.value
                                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white'
                                : 'border-amber-300 text-amber-700 hover:bg-amber-100'
                            }`}
                          >
                            <Icon className="w-6 h-6" />
                            <span>{theme.label}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="fontSize" className="text-amber-800 mb-2 block">
                      Font Size
                    </Label>
                    <Select
                      value={settings.fontSize}
                      onValueChange={(value) => handleSettingChange('fontSize', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fontSizes.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="autoPlay" className="text-amber-800">
                          Auto-play stories
                        </Label>
                        <p className="text-sm text-amber-600">
                          Automatically start playing stories when opened
                        </p>
                      </div>
                      <Switch
                        id="autoPlay"
                        checked={settings.autoPlay}
                        onCheckedChange={(checked) => handleSettingChange('autoPlay', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="skipIntros" className="text-amber-800">
                          Skip introductions
                        </Label>
                        <p className="text-sm text-amber-600">
                          Skip story introductions and go straight to the tale
                        </p>
                      </div>
                      <Switch
                        id="skipIntros"
                        checked={settings.skipIntros}
                        onCheckedChange={(checked) => handleSettingChange('skipIntros', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-800 flex items-center gap-2">
                    <Bell className="w-6 h-6" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription className="text-amber-600">
                    Choose what updates and alerts you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="emailNotifications" className="text-amber-800">
                          Email notifications
                        </Label>
                        <p className="text-sm text-amber-600">
                          Receive email updates about new features and stories
                        </p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="newStoryAlerts" className="text-amber-800">
                          New story alerts
                        </Label>
                        <p className="text-sm text-amber-600">
                          Get notified when new stories are added from your favorite cultures
                        </p>
                      </div>
                      <Switch
                        id="newStoryAlerts"
                        checked={settings.newStoryAlerts}
                        onCheckedChange={(checked) => handleSettingChange('newStoryAlerts', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="communityUpdates" className="text-amber-800">
                          Community updates
                        </Label>
                        <p className="text-sm text-amber-600">
                          Updates about community events and cultural preservation efforts
                        </p>
                      </div>
                      <Switch
                        id="communityUpdates"
                        checked={settings.communityUpdates}
                        onCheckedChange={(checked) => handleSettingChange('communityUpdates', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="weeklyDigest" className="text-amber-800">
                          Weekly digest
                        </Label>
                        <p className="text-sm text-amber-600">
                          A weekly summary of new stories and platform updates
                        </p>
                      </div>
                      <Switch
                        id="weeklyDigest"
                        checked={settings.weeklyDigest}
                        onCheckedChange={(checked) => handleSettingChange('weeklyDigest', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy" className="space-y-6">
              <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-800 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription className="text-amber-600">
                    Control how your data is used and shared
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="dataCollection" className="text-amber-800 mb-2 block">
                      Data Collection Level
                    </Label>
                    <Select
                      value={settings.dataCollection}
                      onValueChange={(value) => handleSettingChange('dataCollection', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {dataCollectionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="shareListeningHistory" className="text-amber-800">
                          Share listening history
                        </Label>
                        <p className="text-sm text-amber-600">
                          Allow sharing of anonymized listening patterns for research
                        </p>
                      </div>
                      <Switch
                        id="shareListeningHistory"
                        checked={settings.shareListeningHistory}
                        onCheckedChange={(checked) => handleSettingChange('shareListeningHistory', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="allowPersonalization" className="text-amber-800">
                          Allow personalization
                        </Label>
                        <p className="text-sm text-amber-600">
                          Use your preferences to recommend relevant stories
                        </p>
                      </div>
                      <Switch
                        id="allowPersonalization"
                        checked={settings.allowPersonalization}
                        onCheckedChange={(checked) => handleSettingChange('allowPersonalization', checked)}
                      />
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">Data Management</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        onClick={handleExportData}
                        className="w-full border-amber-300 text-amber-700 hover:bg-amber-100"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export My Data
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleDeleteAccount}
                        className="w-full border-red-300 text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Settings */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-800 flex items-center gap-2">
                    <User className="w-6 h-6" />
                    Profile Settings
                  </CardTitle>
                  <CardDescription className="text-amber-600">
                    Customize your profile and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="displayName" className="text-amber-800 mb-2 block">
                        Display Name
                      </Label>
                      <Input
                        id="displayName"
                        value={settings.displayName}
                        onChange={(e) => handleSettingChange('displayName', e.target.value)}
                        className="border-amber-200 focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-amber-800 mb-2 block">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleSettingChange('email', e.target.value)}
                        className="border-amber-200 focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-amber-800 mb-2 block">
                      Preferred Cultures
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {settings.preferredCultures.map((culture) => (
                        <Badge key={culture} variant="secondary" className="bg-amber-100 text-amber-800">
                          {culture}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-amber-600 mt-2">
                      These preferences help us recommend stories you might enjoy
                    </p>
                  </div>

                  <div>
                    <Label className="text-amber-800 mb-2 block">
                      Favorite Story Types
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {settings.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="bg-orange-100 text-orange-800">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={handleResetSettings}
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>

            <Button
              onClick={handleSaveSettings}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;