import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateQuote, useListServices } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

const quoteSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().min(7, "Teléfono inválido").max(20),
  address: z.string().min(5, "Dirección inválida").max(300),
  serviceType: z.string().min(1, "Seleccione un servicio"),
  description: z.string().min(10, "Describa su proyecto con más detalle").max(2000),
  priority: z.enum(["low", "normal", "urgent"]),
});

export default function Cotizar() {
  const [_, setLocation] = useLocation();
  const { data: services, isLoading: servicesLoading } = useListServices();
  const createQuote = useCreateQuote();

  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      serviceType: "",
      description: "",
      priority: "normal",
    },
  });

  const onSubmit = (values: z.infer<typeof quoteSchema>) => {
    createQuote.mutate({ data: values }, {
      onSuccess: () => {
        toast.success("Cotización enviada con éxito. Nos contactaremos pronto.");
        setLocation("/");
      },
      onError: () => {
        toast.error("Ocurrió un error al enviar la cotización. Intente nuevamente.");
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Cotice su Proyecto</h1>
            <p className="text-lg text-muted-foreground">
              Proporcione los detalles de su requerimiento. Nuestro equipo de ingenieros analizará su solicitud y responderá a la brevedad.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border p-8 rounded-2xl shadow-xl"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre Completo / Empresa</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej. Juan Pérez" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input placeholder="contacto@empresa.com" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 234 567 8900" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección del Proyecto</FormLabel>
                        <FormControl>
                          <Input placeholder="Av. Principal 123" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Servicio</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Seleccione un servicio" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {servicesLoading ? (
                              <SelectItem value="loading" disabled>Cargando servicios...</SelectItem>
                            ) : services?.map(service => (
                              <SelectItem key={service.id} value={service.name}>{service.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prioridad</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Seleccione la prioridad" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Baja - Planificación a futuro</SelectItem>
                            <SelectItem value="normal">Normal - Tiempos estándar</SelectItem>
                            <SelectItem value="urgent">Urgente - Requiere atención inmediata</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción del Proyecto</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describa los detalles técnicos y requerimientos específicos de su proyecto..." 
                          className="min-h-[150px] bg-background resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-background/50 hover:bg-secondary/20 transition-colors cursor-pointer">
                  <UploadCloud className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-foreground font-medium">Adjuntar planos o imágenes referenciales</p>
                  <p className="text-xs text-muted-foreground mt-1">Arrastre archivos o haga clic para seleccionar (Opcional)</p>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full sm:w-auto h-14 px-10 text-lg font-semibold"
                    disabled={createQuote.isPending}
                  >
                    {createQuote.isPending ? <Loader2 className="animate-spin mr-2" /> : null}
                    Enviar Solicitud
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
