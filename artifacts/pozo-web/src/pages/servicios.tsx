import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useListServices } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Home as HomeIcon,
  Building2,
  Factory,
  Paintbrush,
  Droplets,
  Zap,
  Hammer,
  LayoutGrid,
  Wind,
  Gauge,
  Lightbulb,
  Building,
  LayoutDashboard,
  ShieldCheck,
  FlaskConical,
  Cpu,
  Layers,
  Settings,
  AlertTriangle,
  Wrench,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Paintbrush,
  Home: HomeIcon,
  Droplets,
  Pipette: Wrench,
  Zap,
  Hammer,
  LayoutGrid,
  Wind,
  Building2,
  Gauge,
  Lightbulb,
  Building,
  LayoutDashboard,
  ShieldCheck,
  Factory,
  FlaskConical,
  Cpu,
  Layers,
  Settings,
  AlertTriangle,
  Wrench,
};

const serviceHighlights: Record<string, string[]> = {
  "Pintura Interior": ["Colores Sherwin-Williams y Sikkens", "Imprimante sellador incluido", "Acabados mate, satinado y semi-brillante"],
  "Pintura Exterior": ["Resistente a UV e intemperie", "Sellado de grietas previo", "Garantía 3 años"],
  "Impermeabilización": ["Membranas asfálticas y cristalizantes", "Techos, terrazas y fundaciones", "Garantía 5 años"],
  "Gasfitería y Plomería": ["Agua fría, caliente y gas", "Urgencias 24/7", "Calefones y sistemas de red"],
  "Electricidad Residencial": ["Tableros y circuitos", "Iluminación LED y domótica", "Certificación SEC"],
  "Carpintería a Medida": ["Closets, cocinas y puertas", "Melamina, MDF o madera nativa", "Diseño a planos o medidas propias"],
  "Pisos y Revestimientos": ["Flotante, porcelanato y cerámica", "Nivelación de base incluida", "Interiores y exteriores"],
  "Climatización": ["Split, minisplit y piso radiante", "Mantenimiento de equipos", "Diagnóstico energético"],
  "Pintura Comercial": ["Trabajo nocturno disponible", "Mínima interrupción operativa", "Cumplimiento de plazos garantizado"],
  "Gasfitería Comercial": ["Redes de agua y alcantarillado", "Gas licuado y natural", "Certificación Supergas y Metrogas"],
  "Electricidad Comercial": ["Tableros de distribución", "Iluminación eficiente y UPS", "Certificación SEC"],
  "Mantenimiento de Edificios": ["Programa preventivo integral", "Contratos mensuales y anuales", "Personal dedicado"],
  "Remodelación de Espacios": ["Tabiques y cielos americanos", "Pisos vinílicos y amoblado", "Entrega llave en mano"],
  "Sistemas de Seguridad": ["Cámaras IP y alarmas", "Control de acceso biométrico", "Detección y supresión de incendio"],
  "Instalaciones Industriales": ["Estructuras y tuberías de proceso", "Soldadura certificada", "Pinturas anticorrosivas"],
  "Gasfitería Industrial": ["Vapor, aire comprimido y gases", "Tratamiento de aguas residuales", "Diseño de ingeniería"],
  "Electricidad Industrial": ["Media tensión y tableros MCC", "Automatización PLC y SCADA", "Variadores y motores"],
  "Recubrimientos Industriales": ["Pisos epóxicos autonivelantes", "Resistencia química y tráfico pesado", "Poliuretano y anticorrosivo"],
  "Mantenimiento de Plantas": ["Mecánica, eléctrica e instrumentación", "Producción continua sin parar", "Personal técnico especializado"],
  "Señalización Industrial": ["ISO 3864 y NFPA", "Demarcación y franjas peatonales", "Rótulos y letreros reflectantes"],
};

export default function Servicios() {
  const { data: services, isLoading } = useListServices();

  const categories = [
    {
      id: "residential",
      label: "Residencial",
      desc: "Soluciones de alta gama para su hogar",
      icon: HomeIcon,
      gradient: "from-amber-500/10 to-transparent",
      border: "border-amber-500/20",
    },
    {
      id: "commercial",
      label: "Comercial",
      desc: "Mantenimiento y desarrollo para negocios",
      icon: Building2,
      gradient: "from-blue-500/10 to-transparent",
      border: "border-blue-500/20",
    },
    {
      id: "industrial",
      label: "Industrial",
      desc: "Operaciones de gran escala y precisión",
      icon: Factory,
      gradient: "from-slate-500/10 to-transparent",
      border: "border-slate-500/20",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-20 text-center max-w-3xl mx-auto"
          >
            <span className="inline-block text-primary text-sm font-semibold tracking-widest uppercase mb-4">
              Catálogo completo
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Nuestros <span className="text-primary">Servicios</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Más de 20 servicios especializados para el hogar, comercio e industria.
              Ejecutados por técnicos certificados con garantía escrita en cada trabajo.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="space-y-16">
              {[1, 2, 3].map((s) => (
                <div key={s} className="space-y-6">
                  <Skeleton className="h-10 w-48 rounded-lg bg-card" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <Skeleton key={i} className="h-64 w-full rounded-xl bg-card" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-28">
              {categories.map((cat, categoryIndex) => {
                const catServices = services?.filter((s) => s.category === cat.id) ?? [];
                if (catServices.length === 0) return null;
                const CatIcon = cat.icon;

                return (
                  <motion.section
                    key={cat.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  >
                    <div className={`flex items-center gap-4 mb-10 pb-5 border-b ${cat.border}`}>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} border ${cat.border} flex items-center justify-center`}>
                        <CatIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold">{cat.label}</h2>
                        <p className="text-muted-foreground text-sm mt-0.5">{cat.desc}</p>
                      </div>
                      <span className="ml-auto text-sm text-muted-foreground font-medium hidden sm:block">
                        {catServices.length} servicios
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {catServices.map((service, i) => {
                        const ServiceIcon = iconMap[service.icon] ?? Wrench;
                        const highlights = serviceHighlights[service.name] ?? [];

                        return (
                          <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ delay: i * 0.07, duration: 0.4 }}
                            className="group bg-card border border-border rounded-2xl p-6 flex flex-col hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                          >
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                <ServiceIcon className="w-5 h-5 text-primary" />
                              </div>
                              <h3 className="text-base font-bold leading-snug group-hover:text-primary transition-colors pt-1">
                                {service.name}
                              </h3>
                            </div>

                            <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                              {service.description}
                            </p>

                            {highlights.length > 0 && (
                              <ul className="space-y-1.5 mb-6">
                                {highlights.map((h) => (
                                  <li key={h} className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                    {h}
                                  </li>
                                ))}
                              </ul>
                            )}

                            <Link href="/cotizar">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-border hover:border-primary hover:text-primary group/btn transition-all"
                              >
                                Solicitar Cotización
                                <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.section>
                );
              })}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-24 bg-card border border-border rounded-2xl p-10 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">¿No encuentra lo que busca?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Contamos con técnicos especializados en muchas más áreas. Cuéntenos su proyecto
              y le daremos una solución a la medida.
            </p>
            <Link href="/cotizar">
              <Button size="lg" className="font-semibold px-8">
                Cotizar Proyecto Personalizado
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
