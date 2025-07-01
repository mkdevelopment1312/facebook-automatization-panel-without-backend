
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Users, Bell, Eye } from "lucide-react";

interface ActivityItem {
  id: string;
  type: 'comment' | 'message' | 'response' | 'scan';
  timestamp: Date;
  group?: string;
  user?: string;
  content?: string;
  phrase?: string;
}

const LiveMonitor = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'comment',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      group: 'Zarabianie Online 2024',
      user: 'Marcin Kowalski',
      content: 'Jestem zainteresowany, pisz priv',
      phrase: 'pisz priv'
    },
    {
      id: '2',
      type: 'message',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      user: 'Anna Nowak',
      content: 'Wiadomość wysłana automatycznie'
    },
    {
      id: '3',
      type: 'response',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      user: 'Piotr Wiśniewski',
      content: 'Dzięki za wiadomość, jestem zainteresowany!'
    },
    {
      id: '4',
      type: 'scan',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      group: 'MLM i Marketing',
      content: 'Skanowanie zakończone - znaleziono 3 nowe komentarze'
    }
  ]);

  const [isMonitoring, setIsMonitoring] = useState(true);

  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      // Symulacja nowych aktywności
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        type: Math.random() > 0.5 ? 'comment' : 'scan',
        timestamp: new Date(),
        group: 'Zarabianie w Internecie',
        user: 'Nowy Użytkownik',
        content: Math.random() > 0.5 ? 'Jestem zainteresowany' : 'Skanowanie w toku...',
        phrase: 'jestem zainteresowany'
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 19)]);
    }, 10000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'comment': return <MessageSquare className="h-4 w-4 text-green-600" />;
      case 'message': return <Bell className="h-4 w-4 text-blue-600" />;
      case 'response': return <Users className="h-4 w-4 text-orange-600" />;
      case 'scan': return <Eye className="h-4 w-4 text-purple-600" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'comment': return 'bg-green-50 border-green-200';
      case 'message': return 'bg-blue-50 border-blue-200';
      case 'response': return 'bg-orange-50 border-orange-200';
      case 'scan': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Teraz';
    if (minutes < 60) return `${minutes} min temu`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h temu`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Monitor na Żywo</h2>
          <p className="text-gray-600">Obserwuj aktywność bota w czasie rzeczywistym</p>
        </div>
        <div className="flex gap-2">
          <Badge variant={isMonitoring ? "default" : "secondary"}>
            {isMonitoring ? "🟢 Aktywny" : "🔴 Zatrzymany"}
          </Badge>
          <Button 
            onClick={() => setIsMonitoring(!isMonitoring)}
            variant={isMonitoring ? "destructive" : "default"}
          >
            {isMonitoring ? "Zatrzymaj" : "Uruchom"} Monitoring
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Strumień Aktywności
              </CardTitle>
              <CardDescription>
                Najnowsze wydarzenia z monitorowanych grup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-3">
                  {activities.map((activity, index) => (
                    <div key={activity.id}>
                      <div className={`p-4 rounded-lg border ${getActivityColor(activity.type)}`}>
                        <div className="flex items-start gap-3">
                          {getActivityIcon(activity.type)}
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">
                                {activity.type === 'comment' && 'Nowy komentarz znaleziony'}
                                {activity.type === 'message' && 'Wiadomość wysłana'}
                                {activity.type === 'response' && 'Otrzymano odpowiedź'}
                                {activity.type === 'scan' && 'Skanowanie grupy'}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatTime(activity.timestamp)}
                              </span>
                            </div>
                            {activity.group && (
                              <p className="text-xs text-gray-600">Grupa: {activity.group}</p>
                            )}
                            {activity.user && (
                              <p className="text-xs text-gray-600">Użytkownik: {activity.user}</p>
                            )}
                            {activity.content && (
                              <p className="text-sm text-gray-700 bg-white p-2 rounded border">
                                "{activity.content}"
                              </p>
                            )}
                            {activity.phrase && (
                              <Badge variant="outline" className="text-xs">
                                Fraza: {activity.phrase}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      {index < activities.length - 1 && <Separator className="my-2" />}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Statystyki Live</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Aktywne skanowanie:</span>
                <Badge variant="default">3 grupy</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Znalezione dziś:</span>
                <span className="font-semibold">47 komentarzy</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Wysłane dziś:</span>
                <span className="font-semibold">23 wiadomości</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Odpowiedzi:</span>
                <span className="font-semibold text-green-600">5 nowych</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Monitorowane Frazy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="outline">pisz priv</Badge>
                <Badge variant="outline">jestem zainteresowany</Badge>
                <Badge variant="outline">pv</Badge>
                <Badge variant="outline">chcę dowiedzieć się więcej</Badge>
                <Badge variant="outline">info priv</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Discord Webhook</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status:</span>
                  <Badge variant="default">🟢 Połączony</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ostatnie powiadomienie:</span>
                  <span className="text-xs text-gray-600">2 min temu</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveMonitor;
