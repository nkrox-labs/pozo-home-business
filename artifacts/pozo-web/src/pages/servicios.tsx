import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight, CheckCircle2, Zap, Wrench, Paintbrush, Home as HomeIcon,
  Leaf, Building2, Briefcase, Settings2, Sun, HardHat, Pipette, Layers, Hammer,
  Factory, Filter,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ServiceCategory {
  icon: LucideIcon; emoji: string; label: string; tag: "residencial" | "industrial" | "ambos";
  color: string; border: string; iconColor: string; description: string;
  residential?: string[]; industrial?: string[];
  items?: string[];
}

const categories: ServiceCategory[] = [
  {
    icon: Zap, emoji: "⚡", label: "Electricidad", tag: "ambos",
    color: "from-yellow-500/10 to-transparent", border: "border-yellow-500/20", iconColor: "text-yellow-400",
    description: "Instalaciones eléctricas residenciales e industriales con certificación SEC. Desde enchufes hasta tableros industriales y automatización.",
    residential: ["Cambio de enchufes e interruptores", "Instalación de luminarias y LED", "Instalación de diferenciales", "Reparación de cortocircuitos", "Detección de fugas eléctricas", "Re-cableado completo", "Puesta a tierra", "Cambio de tableros eléctricos", "Cámaras de seguridad"],
    industrial: ["Equilibrado de fases", "Motores trifásicos", "Variadores de frecuencia", "Contactores y relés", "Bancos de capacitores", "Generadores industriales", "Tableros industriales MCC", "Canalizaciones EMT", "Sistemas de tierra industrial"],
  },
  {
    icon: Wrench, emoji: "🚰", label: "Gasfitería", tag: "ambos",
    color: "from-blue-500/10 to-transparent", border: "border-blue-500/20", iconColor: "text-blue-400",
    description: "Redes de agua potable, alcantarillado y gasfitería completa para hogares y plantas industriales. Urgencias 24/7.",
    residential: ["Reparación de filtraciones", "Destapes y desatascamientos", "Instalación y reparación de calefón", "Reparación de WC y griferías", "Termos eléctricos", "Bombas de agua", "Redes domiciliarias de agua y gas"],
    industrial: ["Redes completas de agua potable", "Sistemas de alcantarillado", "Cámaras de inspección", "Redes sanitarias industriales", "Conexiones y tuberías industriales", "Sistemas de vapor y aire comprimido"],
  },
  {
    icon: Paintbrush, emoji: "🎨", label: "Pintura", tag: "ambos",
    color: "from-orange-500/10 to-transparent", border: "border-orange-500/20", iconColor: "text-orange-400",
    description: "Pintura interior, exterior e industrial. Productos premium Sherwin-Williams y Sikkens con garantía de durabilidad.",
    residential: ["Pintura de muros y cielos", "Pintura de fachadas", "Pintura de techos", "Barnices y lacas", "Papel mural", "Rejas y portones"],
    industrial: ["Pintura epóxica de pisos", "Pintura intumescente (cortafuego)", "Anticorrosivos de alto espesor", "Demarcación vial y de piso", "Revestimientos industriales", "Aplicación con equipo Airless"],
  },
  {
    icon: HomeIcon, emoji: "🏠", label: "Techumbres", tag: "ambos",
    color: "from-slate-500/10 to-transparent", border: "border-slate-500/20", iconColor: "text-slate-300",
    description: "Instalación y reparación de techos residenciales e industriales. Sellamos goteras y garantizamos impermeabilidad.",
    residential: ["Reparación de goteras", "Cambio completo de techos", "Instalación de canaletas", "Aislación térmica y acústica", "Cerchas de madera y metal", "Lucarnas y tragaluces"],
    industrial: ["Paneles sándwich aislantes", "Cubiertas industriales y galpones", "Líneas de vida y acceso seguro", "Extractores eólicos y ventilación", "Impermeabilización de techos planos", "Refuerzos estructurales"],
  },
  {
    icon: Leaf, emoji: "🌿", label: "Jardinería", tag: "ambos",
    color: "from-green-500/10 to-transparent", border: "border-green-500/20", iconColor: "text-green-400",
    description: "Mantención y diseño de jardines residenciales y áreas verdes para condominios e industrias.",
    residential: ["Corte y mantención de césped", "Instalación de riego automático", "Poda de árboles y arbustos", "Fertilización y control plagas", "Diseño de jardines"],
    industrial: ["Mantención de áreas verdes", "Tala y poda de altura", "Control de malezas", "Xeropaisajismo (bajo consumo de agua)", "Limpieza de terrenos industriales"],
  },
  {
    icon: Building2, emoji: "🏗️", label: "Estructuras Metálicas", tag: "ambos",
    color: "from-zinc-500/10 to-transparent", border: "border-zinc-500/20", iconColor: "text-zinc-300",
    description: "Fabricación e instalación de estructuras metálicas para hogares y grandes proyectos industriales. Soldadura certificada.",
    residential: ["Rejas de seguridad", "Portones automáticos y manuales", "Escaleras metálicas", "Cobertizos y pérgolas", "Terrazas y decks metálicos", "Pasamanos y barandas"],
    industrial: ["Racks y estanterías industriales", "Plataformas y mesanines", "Pasarelas de acceso", "Protecciones para maquinaria", "Escaleras de servicio industrial", "Reparación de estructuras existentes"],
  },
  {
    icon: Briefcase, emoji: "🏢", label: "Construcción y Remodelación", tag: "ambos",
    color: "from-amber-500/10 to-transparent", border: "border-amber-500/20", iconColor: "text-amber-400",
    description: "Proyectos completos de construcción y remodelación. Desde quinchos y baños hasta plantas industriales y oficinas modulares.",
    residential: ["Ampliaciones de casas", "Remodelación de baños y cocinas", "Quinchos y terrazas", "Pisos y revestimientos", "Tabiques y divisiones", "Accesibilidad universal"],
    industrial: ["Oficinas modulares", "Comedores y salas de descanso", "Vestuarios y camarines", "Bases de maquinaria y fundaciones", "Cierres perimetrales y portones", "Accesibilidad y rampas normativas"],
  },
  {
    icon: Settings2, emoji: "⚙️", label: "Mantención Industrial", tag: "industrial",
    color: "from-red-500/10 to-transparent", border: "border-red-500/20", iconColor: "text-red-400",
    description: "Mantención preventiva, correctiva y predictiva para plantas industriales. Reducimos tiempos de parada y aumentamos la vida útil de sus equipos.",
    items: ["Mantención preventiva", "Mantención correctiva", "Mantención predictiva", "Paradas de planta", "Inspecciones técnicas", "Lubricación industrial", "Alineación de equipos", "Cambio de componentes", "Análisis de vibraciones", "Termografía infrarroja"],
  },
  {
    icon: Pipette, emoji: "🔧", label: "Piping Industrial", tag: "industrial",
    color: "from-cyan-500/10 to-transparent", border: "border-cyan-500/20", iconColor: "text-cyan-400",
    description: "Fabricación de spool, soldadura TIG/MIG y redes de tuberías industriales para todo tipo de fluidos.",
    items: ["Fabricación de spool", "Soldadura TIG/MIG", "Tuberías acero carbono", "Tuberías inoxidables", "Líneas de vapor", "Redes contra incendio", "Aire comprimido", "Líneas hidráulicas", "Aislación térmica", "Pruebas de presión"],
  },
  {
    icon: Layers, emoji: "🏭", label: "Obras Civiles Industriales", tag: "industrial",
    color: "from-stone-500/10 to-transparent", border: "border-stone-500/20", iconColor: "text-stone-300",
    description: "Radieres, fundaciones y obras civiles para plantas industriales, cumpliendo estándares estructurales.",
    items: ["Radieres industriales", "Dados de hormigón", "Fundaciones de maquinaria", "Excavaciones", "Enfierraduras", "Pavimentos industriales", "Muros de contención", "Canalizaciones", "Rampas industriales", "Zócalos y pisos epóxicos"],
  },
  {
    icon: Hammer, emoji: "🔩", label: "Montaje Industrial", tag: "industrial",
    color: "from-violet-500/10 to-transparent", border: "border-violet-500/20", iconColor: "text-violet-400",
    description: "Montaje de equipos, maquinaria pesada y estructuras industriales con alineamiento mecánico profesional.",
    items: ["Montaje de equipos", "Instalación de maquinaria", "Estructuras pesadas", "Alineamiento mecánico", "Izaje de cargas", "Desmontaje industrial", "Nivelación de equipos", "Anclajes y pernos de fundación"],
  },
  {
    icon: HardHat, emoji: "🦺", label: "Seguridad Industrial", tag: "industrial",
    color: "from-orange-500/10 to-transparent", border: "border-orange-500/20", iconColor: "text-orange-400",
    description: "Sistemas de seguridad industrial para trabajos en altura, espacios confinados y zonas de riesgo.",
    items: ["Líneas de vida certificadas", "Sistemas anticaídas", "Señalización normativa", "Demarcación de pisos", "Protecciones físicas", "Cierres perimetrales", "Accesos seguros", "Escaleras de acceso"],
  },
  {
    icon: Sun, emoji: "☀️", label: "Energías Renovables", tag: "industrial",
    color: "from-yellow-500/10 to-transparent", border: "border-yellow-500/20", iconColor: "text-yellow-300",
    description: "Instalación de paneles solares, sistemas de almacenamiento y cargadores de vehículos eléctricos.",
    items: ["Paneles solares fotovoltaicos", "Inversores string y micro", "Bancos de baterías", "Cargadores EV", "Sistemas híbridos", "Eficiencia energética", "Monitoreo inteligente", "Instalación residencial e industrial"],
  },
];

type FilterTag = "todos" | "residencial" | "industrial";

export default function Servicios() {
  const [filter, setFilter] = useState<FilterTag>("todos");

  const filtered = categories.filter((c) => {
    if (filter === "todos") return true;
    if (filter === "residencial") return c.tag === "residencial" || c.tag === "ambos";
    if (filter === "industrial") return c.tag === "industrial" || c.tag === "ambos";
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-14 text-center max-w-3xl mx-auto"
          >
            <span className="inline-block text-primary text-sm font-semibold tracking-widest uppercase mb-4">Catálogo completo</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Nuestros <span className="text-primary">Servicios</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              13 especialidades para el hogar, comercio e industria. Técnicos certificados con garantía escrita en cada trabajo.
            </p>
          </motion.div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-1 bg-card border border-border rounded-xl p-1">
              <Filter className="w-4 h-4 text-muted-foreground ml-2" />
              {(["todos", "residencial", "industrial"] as FilterTag[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    filter === f
                      ? "bg-primary text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f === "todos" ? "Todos" : f === "residencial" ? "Residencial / Comercial" : "Industrial Avanzado"}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-16"
            >
              {filtered.map((cat, i) => (
                <motion.section
                  key={cat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <div className={`flex items-start gap-4 mb-8 pb-5 border-b ${cat.border}`}>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} border ${cat.border} flex items-center justify-center text-2xl flex-shrink-0`}>
                      {cat.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <h2 className="text-2xl md:text-3xl font-bold">{cat.label}</h2>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                          cat.tag === "industrial"
                            ? "border-red-500/30 text-red-400 bg-red-500/5"
                            : cat.tag === "residencial"
                            ? "border-blue-500/30 text-blue-400 bg-blue-500/5"
                            : "border-primary/30 text-primary bg-primary/5"
                        }`}>
                          {cat.tag === "industrial" ? "Industrial" : cat.tag === "residencial" ? "Residencial" : "Residencial + Industrial"}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm max-w-2xl">{cat.description}</p>
                    </div>
                  </div>

                  {cat.items ? (
                    <div className={`bg-card border ${cat.border} rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2`}>
                      {cat.items.map((item) => (
                        <div key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground py-1">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${cat.iconColor} flex-shrink-0`} />
                          {item}
                        </div>
                      ))}
                      <div className="sm:col-span-2 md:col-span-4 mt-4 pt-4 border-t border-border">
                        <Link href="/cotizar">
                          <Button variant="outline" size="sm" className="border-border hover:border-primary group transition-all">
                            Solicitar Cotización
                            <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { title: "Residencial", items: cat.residential },
                        { title: "Industrial / Comercial", items: cat.industrial },
                      ].map((section) => (
                        <div key={section.title} className={`bg-card border ${cat.border} rounded-2xl p-6`}>
                          <h3 className={`font-bold text-base mb-4 ${cat.iconColor}`}>{section.title}</h3>
                          <ul className="space-y-2 mb-6">
                            {section.items?.map((item) => (
                              <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                                <CheckCircle2 className={`w-3.5 h-3.5 ${cat.iconColor} flex-shrink-0`} />
                                {item}
                              </li>
                            ))}
                          </ul>
                          <div className="pt-4 border-t border-border">
                            <Link href="/cotizar">
                              <Button variant="outline" size="sm" className="w-full border-border hover:border-primary group transition-all">
                                Solicitar Cotización
                                <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.section>
              ))}
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-24 bg-card border border-border rounded-2xl p-10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/8 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">¿Proyecto especial o industria?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Contamos con técnicos en muchas más áreas. Cuéntenos su proyecto y le damos una solución a la medida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/cotizar">
                  <Button size="lg" className="font-semibold px-8">
                    Cotizar Proyecto <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="border-green-500/40 text-green-400 hover:bg-green-500/10 px-8">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
