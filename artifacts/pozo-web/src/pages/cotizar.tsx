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
import { Loader2, UploadCloud, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

const quoteSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().min(7, "Teléfono inválido").max(20),
  address: z.string().min(5, "Dirección inválida").max(300),
  clientType: z.enum(["particular", "empresa", "condominio"]),
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
      clientType: "particular",
      serviceType: "",
      description: "",
      priority: "normal",
    },
  });

  const onSubmit = (values: z.infer<typeof quoteSchema>) => {
    const { clientType, ...rest } = values;
    createQuote.mutate({ data: { ...rest, description: `[${clientType.toUpperCase()}] ${rest.description}` } }, {
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">Sin costo</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Cotice su Proyecto</h1>
            <p className="text-lg text-muted-foreground">
              Proporcione los detalles de su requerimiento. Nuestro equipo analizará su solicitud y responderá en menos de 24 horas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[
              { icon: CheckCircle2, text: "Presupuesto sin costo" },
              { icon: CheckCircle2, text: "Respuesta en menos de 24h" },
              { icon: CheckCircle2, text: "Sin compromiso" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3">
                <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
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
                          <Input placeholder="+56 9 XXXX XXXX" {...field} className="bg-background" />
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
                          <Input placeholder="Av. Principal 123, Comuna" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="clientType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Cliente</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Seleccione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="particular">Particular</SelectItem>
                            <SelectItem value="empresa">Empresa</SelectItem>
                            <SelectItem value="condominio">Condominio</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                              <SelectItem value="loading" disabled>Cargando...</SelectItem>
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
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Baja — A futuro</SelectItem>
                            <SelectItem value="normal">Normal — Estándar</SelectItem>
                            <SelectItem value="urgent">Urgente — Inmediata</SelectItem>
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
                      <FormLabel>Descripción del Trabajo</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describa los detalles del trabajo, dimensiones aproximadas, materiales preferidos o cualquier información relevante..."
                          className="min-h-[160px] bg-background resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-background/50 hover:bg-secondary/20 transition-colors cursor-pointer">
                  <UploadCloud className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-foreground font-medium">Subir Fotografías o Planos</p>
                  <p className="text-xs text-muted-foreground mt-1">Opcional — JPG, PNG, PDF hasta 10MB</p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                  <p className="text-xs text-muted-foreground max-w-sm">
                    Al enviar esta solicitud, nuestro equipo la revisará y le contactará con un presupuesto detallado.
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto h-12 px-10 text-base font-semibold flex-shrink-0"
                    disabled={createQuote.isPending}
                  >
                    {createQuote.isPending ? <Loader2 className="animate-spin mr-2" /> : null}
                    Solicitar Cotización
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
