import { AdminLayout } from "@/components/layout/admin-layout";
import { useGetQuoteStats, useListQuotes, getListQuotesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, FileText, CheckCircle2, Clock, Activity, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useUpdateQuote } from "@workspace/api-client-react";
import { toast } from "sonner";

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  reviewing: "En Revisión",
  in_progress: "En Ejecución",
  completed: "Finalizado",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  reviewing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  in_progress: "bg-primary/10 text-primary border-primary/20",
  completed: "bg-green-500/10 text-green-500 border-green-500/20",
};

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { data: stats, isLoading: statsLoading } = useGetQuoteStats();
  const { data: quotesData, isLoading: quotesLoading } = useListQuotes({ limit: 5 });
  const updateQuote = useUpdateQuote();

  const handleStatusChange = (id: number, status: string) => {
    updateQuote.mutate(
      { id, data: { status: status as "pending" | "reviewing" | "in_progress" | "completed" } },
      {
        onSuccess: () => {
          toast.success("Estado actualizado");
          queryClient.invalidateQueries({ queryKey: getListQuotesQueryKey() });
        },
        onError: () => toast.error("Error al actualizar el estado")
      }
    );
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {statsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-card rounded-xl animate-pulse" />)}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Cotizaciones</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground mt-1">+{stats.weekCount} esta semana</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pendientes</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.pending}</div>
                <p className="text-xs text-muted-foreground mt-1">Requieren atención</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">En Ejecución</CardTitle>
                <Activity className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.in_progress}</div>
                <p className="text-xs text-muted-foreground mt-1">Proyectos activos</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Finalizados</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.completed}</div>
                <p className="text-xs text-muted-foreground mt-1">Proyectos exitosos</p>
              </CardContent>
            </Card>
          </div>
        ) : null}

        <h2 className="text-xl font-bold mb-4 mt-12 text-foreground">Actividad Reciente</h2>
        
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {quotesLoading ? (
            <div className="p-8 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : quotesData?.quotes.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No hay cotizaciones recientes</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Cliente</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotesData?.quotes.map(quote => (
                  <TableRow key={quote.id} className="border-border hover:bg-secondary/50">
                    <TableCell>
                      <div className="font-medium text-foreground">{quote.name}</div>
                      <div className="text-xs text-muted-foreground">{quote.email}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{quote.serviceType}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]">{quote.address}</div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(quote.createdAt), "d MMM, yyyy", { locale: es })}
                    </TableCell>
                    <TableCell>
                      <Select 
                        defaultValue={quote.status} 
                        onValueChange={(val) => handleStatusChange(quote.id, val)}
                      >
                        <SelectTrigger className={`w-[140px] h-8 text-xs font-semibold border ${statusColors[quote.status]}`}>
                          <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(statusLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
