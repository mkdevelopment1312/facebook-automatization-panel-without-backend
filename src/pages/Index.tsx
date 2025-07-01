
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Users, MessageSquare, TrendingUp, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LiveMonitor from "@/components/LiveMonitor";
import GroupsManager from "@/components/GroupsManager";
import MessagingPanel from "@/components/MessagingPanel";
import SettingsPanel from "@/components/SettingsPanel";

const Index = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [stats, setStats] = useState({
    groups: 12,
    profiles: 847,
    messagesSent: 234,
    responses: 23,
    activeMonitoring: true
  });

  const handleConnect = () => {
    setIsConnected(true);
    toast({
      title: "Połączono z Facebookiem",
      description: "Pomyślnie zalogowano do konta Facebook",
    });
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast({
      title: "Rozłączono",
      description: "Sesja Facebook została zakończona",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Facebook Marketing Bot
            </h1>
            <p className="text-gray-600">Automatyzacja marketingu w grupach Facebook</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={isConnected ? "default" : "secondary"} className="px-4 py-2">
              {isConnected ? "🟢 Połączony" : "🔴 Rozłączony"}
            </Badge>
            {!isConnected ? (
              <Button onClick={handleConnect} className="bg-blue-600 hover:bg-blue-700">
                Połącz z Facebook
              </Button>
            ) : (
              <Button onClick={handleDisconnect} variant="outline">
                Rozłącz
              </Button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monitorowane Grupy</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.groups}</div>
              <p className="text-xs text-muted-foreground">+2 w tym tygodniu</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Zebrane Profile</CardTitle>
              <Database className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.profiles}</div>
              <p className="text-xs text-muted-foreground">+156 dziś</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wysłane Wiadomości</CardTitle>
              <MessageSquare className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.messagesSent}</div>
              <p className="text-xs text-muted-foreground">+47 dziś</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Odpowiedzi</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.responses}</div>
              <p className="text-xs text-muted-foreground">9.8% współczynnik odpowiedzi</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5 bg-white">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="groups">Grupy</TabsTrigger>
            <TabsTrigger value="monitor">Monitor Live</TabsTrigger>
            <TabsTrigger value="messaging">Wiadomości</TabsTrigger>
            <TabsTrigger value="settings">Ustawienia</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Aktywność Dzisiaj</CardTitle>
                  <CardDescription>Podsumowanie działań z ostatnich 24 godzin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Skanowanie grup</span>
                    <Badge variant="outline">Aktywne</Badge>
                  </div>
                  <Progress value={75} className="w-full" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Ukończono: 9/12 grup</span>
                    <span>75%</span>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Nowe komentarze:</span>
                      <span className="font-semibold">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dopasowane frazy:</span>
                      <span className="font-semibold">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wysłane wiadomości:</span>
                      <span className="font-semibold">18</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Najnowsze Aktywności</CardTitle>
                  <CardDescription>Ostatnie działania bota</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Nowy komentarz znaleziony</p>
                        <p className="text-xs text-gray-600">Grupa: "Zarabianie Online" - 2 min temu</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Wiadomość wysłana</p>
                        <p className="text-xs text-gray-600">Do: Jan Kowalski - 5 min temu</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Otrzymano odpowiedź</p>
                        <p className="text-xs text-gray-600">Od: Anna Nowak - 8 min temu</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="groups">
            <GroupsManager />
          </TabsContent>

          <TabsContent value="monitor">
            <LiveMonitor />
          </TabsContent>

          <TabsContent value="messaging">
            <MessagingPanel />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
