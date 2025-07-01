
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Send, Clock, CheckCircle } from "lucide-react";

interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  isActive: boolean;
}

interface QueuedMessage {
  id: string;
  recipient: string;
  template: string;
  scheduledTime: Date;
  status: 'pending' | 'sent' | 'failed';
}

const MessagingPanel = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<MessageTemplate[]>([
    {
      id: '1',
      name: 'Wiadomość Powitalna',
      content: 'Cześć! Widziałem Twój komentarz w grupie. Mam propozycję, która może Cię zainteresować. Czy mogę napisać więcej szczegółów?',
      isActive: true
    },
    {
      id: '2',
      name: 'Follow-up',
      content: 'Dzień dobry! To ja ponownie w sprawie wcześniejszej propozycji. Czy miałeś/miałaś czas to rozważyć?',
      isActive: true
    }
  ]);

  const [queuedMessages, setQueuedMessages] = useState<QueuedMessage[]>([
    {
      id: '1',
      recipient: 'Jan Kowalski',
      template: 'Wiadomość Powitalna',
      scheduledTime: new Date(Date.now() + 5 * 60 * 1000),
      status: 'pending'
    },
    {
      id: '2',
      recipient: 'Anna Nowak',
      template: 'Wiadomość Powitalna',
      scheduledTime: new Date(Date.now() + 10 * 60 * 1000),
      status: 'pending'
    }
  ]);

  const [newTemplate, setNewTemplate] = useState({ name: '', content: '' });
  const [isAutoSend, setIsAutoSend] = useState(true);
  const [delayMinutes, setDelayMinutes] = useState(5);

  const handleSaveTemplate = () => {
    if (!newTemplate.name || !newTemplate.content) {
      toast({
        title: "Błąd",
        description: "Wypełnij wszystkie pola szablonu",
        variant: "destructive"
      });
      return;
    }

    const template: MessageTemplate = {
      id: Date.now().toString(),
      name: newTemplate.name,
      content: newTemplate.content,
      isActive: true
    };

    setTemplates(prev => [...prev, template]);
    setNewTemplate({ name: '', content: '' });
    
    toast({
      title: "Szablon zapisany",
      description: "Nowy szablon wiadomości został dodany",
    });
  };

  const toggleTemplate = (templateId: string) => {
    setTemplates(prev => prev.map(template => 
      template.id === templateId ? { ...template, isActive: !template.isActive } : template
    ));
  };

  const removeTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(template => template.id !== templateId));
    toast({
      title: "Szablon usunięty",
      description: "Szablon został usunięty z listy",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-orange-600"><Clock className="w-3 h-3 mr-1" />Oczekuje</Badge>;
      case 'sent':
        return <Badge variant="default" className="text-green-600"><CheckCircle className="w-3 h-3 mr-1" />Wysłana</Badge>;
      case 'failed':
        return <Badge variant="destructive">Błąd</Badge>;
      default:
        return <Badge variant="secondary">Nieznany</Badge>;
    }
  };

  const formatScheduledTime = (date: Date) => {
    return date.toLocaleString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Panel Wiadomości</h2>
        <p className="text-gray-600">Zarządzaj szablonami i kolejką wiadomości</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message Templates */}
        <div className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Szablony Wiadomości</CardTitle>
              <CardDescription>
                Twórz i zarządzaj szablonami automatycznych wiadomości
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="templateName">Nazwa szablonu</Label>
                  <Input
                    id="templateName"
                    placeholder="Np. Wiadomość powitalna"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="templateContent">Treść wiadomości</Label>
                  <Textarea
                    id="templateContent"
                    placeholder="Napisz treść wiadomości..."
                    rows={4}
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>
                <Button onClick={handleSaveTemplate} className="w-full">
                  Zapisz Szablon
                </Button>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Zapisane szablony:</h4>
                {templates.map((template) => (
                  <div key={template.id} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{template.name}</span>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={template.isActive}
                          onCheckedChange={() => toggleTemplate(template.id)}
                        />
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => removeTemplate(template.id)}
                        >
                          Usuń
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {template.content}
                    </p>
                    <Badge variant={template.isActive ? "default" : "secondary"}>
                      {template.isActive ? "Aktywny" : "Nieaktywny"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings and Queue */}
        <div className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Ustawienia Wysyłania</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoSend">Automatyczne wysyłanie</Label>
                  <p className="text-sm text-gray-600">Wysyłaj wiadomości automatycznie</p>
                </div>
                <Switch
                  id="autoSend"
                  checked={isAutoSend}
                  onCheckedChange={setIsAutoSend}
                />
              </div>

              <div>
                <Label htmlFor="delay">Opóźnienie (minuty)</Label>
                <Input
                  id="delay"
                  type="number"
                  min="1"
                  max="60"
                  value={delayMinutes}
                  onChange={(e) => setDelayMinutes(Number(e.target.value))}
                />
                <p className="text-xs text-gray-600 mt-1">
                  Czas między znalezieniem komentarza a wysłaniem wiadomości
                </p>
              </div>

              <div>
                <Label htmlFor="templateSelect">Domyślny szablon</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz szablon" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.filter(t => t.isActive).map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Statystyki Dziś
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Wiadomości w kolejce:</span>
                <span className="font-semibold">{queuedMessages.filter(m => m.status === 'pending').length}</span>
              </div>
              <div className="flex justify-between">
                <span>Wysłane dziś:</span>
                <span className="font-semibold text-green-600">23</span>
              </div>
              <div className="flex justify-between">
                <span>Otrzymane odpowiedzi:</span>
                <span className="font-semibold text-blue-600">5</span>
              </div>
              <div className="flex justify-between">
                <span>Współczynnik odpowiedzi:</span>
                <span className="font-semibold text-purple-600">21.7%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Message Queue */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Kolejka Wiadomości</CardTitle>
          <CardDescription>
            Aktualnie zaplanowane wiadomości do wysłania
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Odbiorca</TableHead>
                <TableHead>Szablon</TableHead>
                <TableHead>Zaplanowane na</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queuedMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell className="font-medium">{message.recipient}</TableCell>
                  <TableCell>{message.template}</TableCell>
                  <TableCell>{formatScheduledTime(message.scheduledTime)}</TableCell>
                  <TableCell>{getStatusBadge(message.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Send className="w-3 h-3 mr-1" />
                        Wyślij teraz
                      </Button>
                      <Button size="sm" variant="destructive">
                        Anuluj
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagingPanel;
