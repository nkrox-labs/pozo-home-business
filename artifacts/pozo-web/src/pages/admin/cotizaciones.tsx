import { AdminLayout } from "@/components/layout/admin-layout";
import { useListQuotes, getListQuotesQueryKey, useUpdateQuote, useDeleteQuote } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Trash2, Edit } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
type QuoteStatus = "pending" | "reviewing" | "in_progress" | "completed";

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

const priorityLabels: Record<string, string> = {
  low: "Baja",
  normal: "Normal",
  urgent: "Urgente",
};

export default function Cotizaciones() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedQuoteId, setSelectedQuoteId] = useState<number | null>(null);
  const [adminNotes, setAdminNotes] = useState("");

  const { data: quotesData, isLoading } = useListQuotes({ 
    ...(statusFilter !== "all" ? { status: statusFilter as QuoteStatus } : {}) 
  });
  
  const updateQuote = useUpdateQuote();
  const deleteQuote = useDeleteQuote();

  const handleStatusChange = (id: number, status: string) => {
    updateQuote.mutate(
      { id, data: { status: status as QuoteStatus } },
      {
        onSuccess: () => {
          toast.success("Estado actualizado");
          queryClient.invalidateQueries({ queryKey: getListQuotesQueryKey() });
        },
        onError: () => toast.error("Error al actualizar")
      }
    );
  };

  const handleSaveNotes = (id: number) => {
    updateQuote.mutate(
      { id, data: { adminNotes } },
      {
        onSuccess: () => {
          toast.success("Notas guardadas");
          queryClient.invalidateQueries({ queryKey: getListQuotesQueryKey() });
          setSelectedQuoteId(null);
        },
        onError: () => toast.error("Error al guardar notas")
      }
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Está seguro de eliminar esta cotización?")) {
      deleteQuote.mutate(
        { id },
        {
          onSuccess: () => {
            toast.success("Cotización eliminada");
            queryClient.invalidateQueries({ queryKey: getListQuotesQueryKey() });
          },
          onError: () => toast.error("Error al eliminar")
        }
      );
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Gestión de Cotizaciones</h1>
          
          <div className="flex items-center gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-card">
                <SelectValue placeholder="Filtrar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                {Object.entries(statusLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="p-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : quotesData?.quotes.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">No se encontraron cotizaciones.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Detalles</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotesData?.quotes.map(quote => (
                  <TableRow key={quote.id} className="border-border hover:bg-secondary/50">
                    <TableCell className="font-mono text-muted-foreground">#{quote.id}</TableCell>
                    <TableCell>
                      <div className="font-medium text-foreground">{quote.name}</div>
                      <div className="text-xs text-muted-foreground">{quote.email}</div>
                      <div className="text-xs text-muted-foreground">{quote.phone}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{quote.serviceType}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]">{quote.address}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {format(new Date(quote.createdAt), "d MMM, yyyy", { locale: es })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        quote.priority === 'urgent' ? 'border-destructive text-destructive' :
                        quote.priority === 'normal' ? 'border-primary text-primary' : 'border-muted-foreground text-muted-foreground'
                      }>
                        {priorityLabels[quote.priority]}
                      </Badge>
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
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Dialog open={selectedQuoteId === quote.id} onOpenChange={(open) => {
                          if (open) {
                            setSelectedQuoteId(quote.id);
                            setAdminNotes(quote.adminNotes || "");
                          } else {
                            setSelectedQuoteId(null);
                          }
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-card border-border sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Detalles de Cotización #{quote.id}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 my-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground block">Descripción del cliente:</span>
                                  <p className="mt-1 p-3 bg-secondary rounded-md min-h-[100px] whitespace-pre-wrap">{quote.description}</p>
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <span className="text-muted-foreground block text-xs">Servicio:</span>
                                    <span className="font-medium">{quote.serviceType}</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground block text-xs">Dirección:</span>
                                    <span className="font-medium">{quote.address}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <span className="text-foreground font-medium block mb-2">Notas Administrativas (Internas):</span>
                                <Textarea 
                                  value={adminNotes} 
                                  onChange={(e) => setAdminNotes(e.target.value)}
                                  className="min-h-[120px] bg-background"
                                  placeholder="Agregue notas internas, presupuesto estimado, etc."
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setSelectedQuoteId(null)}>Cancelar</Button>
                              <Button onClick={() => handleSaveNotes(quote.id)} disabled={updateQuote.isPending}>
                                {updateQuote.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                Guardar Notas
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(quote.id)}
                          disabled={deleteQuote.isPending}
                        >
                          {deleteQuote.isPending && selectedQuoteId === quote.id ? 
                            <Loader2 className="h-4 w-4 animate-spin" /> : 
                            <Trash2 className="h-4 w-4" />
                          }
                        </Button>
                      </div>
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
