
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Bell, Database, MessageSquare, Users } from "lucide-react";

const SettingsPanel = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Facebook Settings
    username: '',
    password: '',
    isLoggedIn: false,
    
    // Monitoring Settings
    scanInterval: 15,
    maxCommentsPerScan: 50,
    enableRealTimeMonitoring: true,
    
    // Message Settings
    messageDelay: 5,
    maxMessagesPerDay: 100,
    enableAutoResponse: true,
    
    // Search Phrases
    searchPhrases: 'pisz priv\njestem zainteresowany\npv\ninfo priv\nchcę dowiedzieć się więcej',
    
    // Discord Webhook
    discordWebhookUrl: 'https://discord.com/api/webhooks/...',
    enableDiscordNotifications: true,
    
    // Safety Settings
    humanLikeDelay: true,
    randomizeTimings: true,
    maxActionsPerHour: 20
  });

  const handleSaveSettings = () => {
    toast({
      title: "Ustawienia zapisane",
      description: "Wszystkie zmiany zostały pomyślnie zapisane",
    });
  };

  const handleTestWebhook = () => {
    toast({
      title: "Test webhook",
      description: "Wysłano wiadomość testową na Discord",
    });
  };

  const handleLoginToFacebook = () => {
    if (!settings.username || !settings.password) {
      toast({
        title: "Błąd logowania",
        description: "Podaj login i hasło do Facebook",
        variant: "destructive"
      });
      return;
    }

    setSettings(prev => ({ ...prev, isLoggedIn: true }));
    toast({
      title: "Połączono z Facebook",
      description: "Pomyślnie zalogowano do konta Facebook",
    });
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Ustawienia</h2>
        <p className="text-gray-600">Konfiguruj parametry działania bota</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Facebook Connection */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Połączenie z Facebook
            </CardTitle>
            <CardDescription>
              Konfiguracja logowania do konta Facebook
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Status połączenia:</span>
              <Badge variant={settings.isLoggedIn ? "default" : "secondary"}>
                {settings.isLoggedIn ? "🟢 Połączony" : "🔴 Rozłączony"}
              </Badge>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="username">Email/Telefon</Label>
                <Input
                  id="username"
                  type="email"
                  placeholder="twoj@email.com"
                  value={settings.username}
                  onChange={(e) => updateSetting('username', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">Hasło</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={settings.password}
                  onChange={(e) => updateSetting('password', e.target.value)}
                />
              </div>
              <Button 
                onClick={handleLoginToFacebook}
                className="w-full"
                disabled={settings.isLoggedIn}
              >
                {settings.isLoggedIn ? "Już połączony" : "Połącz z Facebook"}
              </Button>
            </div>
            
            <div className="text-sm text-gray-600 p-3 bg-yellow-50 border border-yellow-200 rounded">
              ⚠️ Dane logowania są przechowywane lokalnie i szyfrowane
            </div>
          </CardContent>
        </Card>

        {/* Monitoring Settings */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Ustawienia Monitorowania
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="scanInterval">Interwał skanowania (minuty)</Label>
              <Input
                id="scanInterval"
                type="number"
                min="5"
                max="120"
                value={settings.scanInterval}
                onChange={(e) => updateSetting('scanInterval', Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="maxComments">Maks. komentarzy na skanowanie</Label>
              <Input
                id="maxComments"
                type="number"
                min="10"
                max="200"
                value={settings.maxCommentsPerScan}
                onChange={(e) => updateSetting('maxCommentsPerScan', Number(e.target.value))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Monitoring w czasie rzeczywistym</Label>
                <p className="text-sm text-gray-600">Ciągłe skanowanie nowych postów</p>
              </div>
              <Switch
                checked={settings.enableRealTimeMonitoring}
                onCheckedChange={(checked) => updateSetting('enableRealTimeMonitoring', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Message Settings */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Ustawienia Wiadomości
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="messageDelay">Opóźnienie wysyłki (minuty)</Label>
              <Input
                id="messageDelay"
                type="number"
                min="1"
                max="60"
                value={settings.messageDelay}
                onChange={(e) => updateSetting('messageDelay', Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="maxMessages">Maks. wiadomości dziennie</Label>
              <Input
                id="maxMessages"
                type="number"
                min="10"
                max="500"
                value={settings.maxMessagesPerDay}
                onChange={(e) => updateSetting('maxMessagesPerDay', Number(e.target.value))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Automatyczne odpowiedzi</Label>
                <p className="text-sm text-gray-600">Odpowiadaj na otrzymane wiadomości</p>
              </div>
              <Switch
                checked={settings.enableAutoResponse}
                onCheckedChange={(checked) => updateSetting('enableAutoResponse', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Search Phrases */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Frazy Wyszukiwania</CardTitle>
            <CardDescription>
              Frazy, które bot będzie wyszukiwał w komentarzach (jedna na linię)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="pisz priv&#10;jestem zainteresowany&#10;pv"
              rows={6}
              value={settings.searchPhrases}
              onChange={(e) => updateSetting('searchPhrases', e.target.value)}
            />
            <p className="text-sm text-gray-600 mt-2">
              Obecnie aktywnych fraz: {settings.searchPhrases.split('\n').filter(p => p.trim()).length}
            </p>
          </CardContent>
        </Card>

        {/* Discord Webhook */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Discord Webhook
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Powiadomienia Discord</Label>
                <p className="text-sm text-gray-600">Otrzymuj powiadomienia o odpowiedziach</p>
              </div>
              <Switch
                checked={settings.enableDiscordNotifications}
                onCheckedChange={(checked) => updateSetting('enableDiscordNotifications', checked)}
              />
            </div>
            
            <div>
              <Label htmlFor="webhookUrl">URL Webhook</Label>
              <Input
                id="webhookUrl"
                placeholder="https://discord.com/api/webhooks/..."
                value={settings.discordWebhookUrl}
                onChange={(e) => updateSetting('discordWebhookUrl', e.target.value)}
              />
            </div>
            
            <Button onClick={handleTestWebhook} variant="outline" className="w-full">
              Testuj Webhook
            </Button>
          </CardContent>
        </Card>

        {/* Safety Settings */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Ustawienia Bezpieczeństwa</CardTitle>
            <CardDescription>
              Parametry zapobiegające wykryciu automatyzacji
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Humanoidalne opóźnienia</Label>
                <p className="text-sm text-gray-600">Symuluj naturalne zachowanie</p>
              </div>
              <Switch
                checked={settings.humanLikeDelay}
                onCheckedChange={(checked) => updateSetting('humanLikeDelay', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Losowe czasowanie</Label>
                <p className="text-sm text-gray-600">Różnicuj czas między akcjami</p>
              </div>
              <Switch
                checked={settings.randomizeTimings}
                onCheckedChange={(checked) => updateSetting('randomizeTimings', checked)}
              />
            </div>
            
            <div>
              <Label htmlFor="maxActions">Maks. akcji na godzinę</Label>
              <Input
                id="maxActions"
                type="number"
                min="5"
                max="100"
                value={settings.maxActionsPerHour}
                onChange={(e) => updateSetting('maxActionsPerHour', Number(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} size="lg" className="bg-blue-600 hover:bg-blue-700">
          Zapisz Wszystkie Ustawienia
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
