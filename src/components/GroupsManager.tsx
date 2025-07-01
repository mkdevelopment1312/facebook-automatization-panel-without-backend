
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Users, Calendar, MessageSquare, TrendingUp } from "lucide-react";

interface Group {
  id: string;
  name: string;
  url: string;
  members: number;
  isActive: boolean;
  lastScan: Date;
  foundComments: number;
  messagesSent: number;
}

const GroupsManager = () => {
  const { toast } = useToast();
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Zarabianie Online 2024',
      url: 'https://facebook.com/groups/zarabianie2024',
      members: 45632,
      isActive: true,
      lastScan: new Date(Date.now() - 15 * 60 * 1000),
      foundComments: 23,
      messagesSent: 12
    },
    {
      id: '2',
      name: 'MLM i Marketing Sieciowy',
      url: 'https://facebook.com/groups/mlmmarketing',
      members: 28945,
      isActive: true,
      lastScan: new Date(Date.now() - 8 * 60 * 1000),
      foundComments: 18,
      messagesSent: 9
    },
    {
      id: '3',
      name: 'Biznesy Online Polska',
      url: 'https://facebook.com/groups/biznesyonline',
      members: 67234,
      isActive: false,
      lastScan: new Date(Date.now() - 2 * 60 * 60 * 1000),
      foundComments: 31,
      messagesSent: 15
    }
  ]);

  const [newGroupUrl, setNewGroupUrl] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddGroup = () => {
    if (!newGroupUrl.includes('facebook.com/groups/')) {
      toast({
        title: "Błędny URL",
        description: "Podaj prawidłowy link do grupy Facebook",
        variant: "destructive"
      });
      return;
    }

    const newGroup: Group = {
      id: Date.now().toString(),
      name: 'Nowa Grupa (oczekuje na skanowanie)',
      url: newGroupUrl,
      members: 0,
      isActive: true,
      lastScan: new Date(),
      foundComments: 0,
      messagesSent: 0
    };

    setGroups(prev => [...prev, newGroup]);
    setNewGroupUrl('');
    setIsDialogOpen(false);
    
    toast({
      title: "Grupa dodana",
      description: "Nowa grupa została dodana do monitorowania",
    });
  };

  const toggleGroupStatus = (groupId: string) => {
    setGroups(prev => prev.map(group => 
      group.id === groupId ? { ...group, isActive: !group.isActive } : group
    ));
  };

  const removeGroup = (groupId: string) => {
    setGroups(prev => prev.filter(group => group.id !== groupId));
    toast({
      title: "Grupa usunięta",
      description: "Grupa została usunięta z monitorowania",
    });
  };

  const formatLastScan = (date: Date) => {
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
          <h2 className="text-2xl font-bold">Zarządzanie Grupami</h2>
          <p className="text-gray-600">Dodawaj i monitoruj grupy Facebook</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Dodaj Grupę
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dodaj nową grupę</DialogTitle>
              <DialogDescription>
                Wklej link do grupy Facebook, którą chcesz monitorować
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="groupUrl">URL Grupy</Label>
                <Input
                  id="groupUrl"
                  placeholder="https://facebook.com/groups/nazwagrup..."
                  value={newGroupUrl}
                  onChange={(e) => setNewGroupUrl(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddGroup} className="flex-1">
                  Dodaj Grupę
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Anuluj
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktywne Grupy</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {groups.filter(g => g.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground">
              z {groups.length} łącznie
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Łączni Członkowie</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {groups.reduce((sum, g) => sum + g.members, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              we wszystkich grupach
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Znalezione Komentarze</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {groups.reduce((sum, g) => sum + g.foundComments, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              łącznie w tym miesiącu
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wysłane Wiadomości</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {groups.reduce((sum, g) => sum + g.messagesSent, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              z bieżących grup
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Groups Table */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Lista Grup</CardTitle>
          <CardDescription>
            Zarządzaj wszystkimi monitorowanymi grupami Facebook
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nazwa Grupy</TableHead>
                <TableHead>Członkowie</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ostatnie Skanowanie</TableHead>
                <TableHead>Komentarze</TableHead>
                <TableHead>Wiadomości</TableHead>
                <TableHead>Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{group.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {group.url}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{group.members.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={group.isActive}
                        onCheckedChange={() => toggleGroupStatus(group.id)}
                      />
                      <Badge variant={group.isActive ? "default" : "secondary"}>
                        {group.isActive ? "Aktywna" : "Nieaktywna"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{formatLastScan(group.lastScan)}</TableCell>
                  <TableCell>
                    <span className="font-semibold text-green-600">
                      {group.foundComments}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-blue-600">
                      {group.messagesSent}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Skanuj
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => removeGroup(group.id)}
                      >
                        Usuń
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

export default GroupsManager;
