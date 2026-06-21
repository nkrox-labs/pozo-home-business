import { HeroBackground } from "@/components/3d/hero-background";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ChevronRight, ShieldCheck, Wrench, Award, Zap, Paintbrush,
  Home as HomeIcon, Leaf, Building2, Briefcase, Star, Quote,
  Phone, Mail, Clock, MapPin, Users, Trophy, CheckCircle2,
  ChevronDown, ChevronUp, Factory, Sun, HardHat, Pipette,
  Layers, Settings2, ArrowRight, FileText, Search, Hammer,
  Package, Shield, PhoneCall,
} from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const heroIndicators = [
  "Atención residencial", "Condominios", "Empresas", "Industria", "Emergencias 24/7",
];

const services7 = [
  { icon: Zap, emoji: "⚡", label: "Electricidad", color: "from-yellow-500/20 to-yellow-500/5", border: "border-yellow-500/30", text: "text-yellow-400", desc: "Residencial e industrial" },
  { icon: Wrench, emoji: "🚰", label: "Gasfitería", color: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/30", text: "text-blue-400", desc: "Agua, gas y sanitarios" },
  { icon: Paintbrush, emoji: "🎨", label: "Pintura", color: "from-orange-500/20 to-orange-500/5", border: "border-orange-500/30", text: "text-orange-400", desc: "Interior, exterior e industrial" },
  { icon: HomeIcon, emoji: "🏠", label: "Techumbres", color: "from-slate-500/20 to-slate-500/5", border: "border-slate-500/30", text: "text-slate-300", desc: "Goteras, cubiertas y más" },
  { icon: Leaf, emoji: "🌿", label: "Jardinería", color: "from-green-500/20 to-green-500/5", border: "border-green-500/30", text: "text-green-400", desc: "Diseño y mantención" },
  { icon: Building2, emoji: "🏗️", label: "Estructuras Metálicas", color: "from-zinc-500/20 to-zinc-500/5", border: "border-zinc-500/30", text: "text-zinc-300", desc: "Rejas, racks y plataformas" },
  { icon: Briefcase, emoji: "🏢", label: "Construcción", color: "from-amber-500/20 to-amber-500/5", border: "border-amber-500/30", text: "text-amber-400", desc: "Remodelación y obra civil" },
];

const industrialServices = [
  { icon: Settings2, emoji: "⚙️", label: "Mantención Industrial", color: "from-red-500/15 to-red-500/5", border: "border-red-500/25", text: "text-red-400", desc: "Preventiva, correctiva y predictiva" },
  { icon: Pipette, emoji: "🔧", label: "Piping Industrial", color: "from-cyan-500/15 to-cyan-500/5", border: "border-cyan-500/25", text: "text-cyan-400", desc: "Fabricación y soldadura TIG/MIG" },
  { icon: Layers, emoji: "🏭", label: "Obras Civiles", color: "from-stone-500/15 to-stone-500/5", border: "border-stone-500/25", text: "text-stone-300", desc: "Radieres, fundaciones y pavimentos" },
  { icon: Hammer, emoji: "🔩", label: "Montaje Industrial", color: "from-violet-500/15 to-violet-500/5", border: "border-violet-500/25", text: "text-violet-400", desc: "Equipos, maquinaria y estructuras" },
  { icon: HardHat, emoji: "🦺", label: "Seguridad Industrial", color: "from-orange-500/15 to-orange-500/5", border: "border-orange-500/25", text: "text-orange-400", desc: "Líneas de vida, EPP y demarcación" },
  { icon: Sun, emoji: "☀️", label: "Energías Renovables", color: "from-yellow-500/15 to-yellow-500/5", border: "border-yellow-500/25", text: "text-yellow-300", desc: "Paneles solares y cargadores EV" },
];

const seals = [
  { icon: ShieldCheck, label: "Seguridad Laboral" },
  { icon: Award, label: "Calidad Garantizada" },
  { icon: PhoneCall, label: "Atención Rápida" },
  { icon: HardHat, label: "Personal Certificado" },
  { icon: FileText, label: "Cumplimiento Normativo" },
];

const timeline = [
  { step: "01", label: "Diagnóstico", desc: "Evaluación técnica gratuita en sitio" },
  { step: "02", label: "Diseño", desc: "Propuesta técnica con materiales y plazos" },
  { step: "03", label: "Ejecución", desc: "Trabajo con técnicos certificados" },
  { step: "04", label: "Entrega", desc: "Inspección final y verificación" },
  { step: "05", label: "Postventa", desc: "Garantía y soporte post-proyecto" },
];

const process = [
  { icon: PhoneCall, step: "1", label: "Solicitud", desc: "Nos contactas por web o WhatsApp" },
  { icon: Search, step: "2", label: "Visita Técnica", desc: "Evaluamos el proyecto en terreno" },
  { icon: FileText, step: "3", label: "Cotización", desc: "Presupuesto detallado en 24h" },
  { icon: Hammer, step: "4", label: "Ejecución", desc: "Trabajo profesional certificado" },
  { icon: Package, step: "5", label: "Entrega", desc: "Revisión y recepción conforme" },
  { icon: Shield, step: "6", label: "Garantía", desc: "Respaldo post-proyecto escrito" },
];

const coverageAreas = [
  { name: "Región Metropolitana", desc: "Cobertura total RM", color: "border-primary/40 bg-primary/5" },
  { name: "Valparaíso", desc: "Incluye Viña del Mar", color: "border-blue-500/40 bg-blue-500/5" },
  { name: "San Antonio", desc: "Puerto y zona industrial", color: "border-cyan-500/40 bg-cyan-500/5" },
  { name: "Rancagua – O'Higgins", desc: "Zona minera y agrícola", color: "border-green-500/40 bg-green-500/5" },
  { name: "Proyectos Nacionales", desc: "Para grandes industrias", color: "border-amber-500/40 bg-amber-500/5" },
];

const faqs = [
  { q: "¿Realizan emergencias fuera de horario?", a: "Sí. Contamos con servicio de urgencias 24/7 para electricidad, gasfitería y trabajos industriales críticos. Atendemos fines de semana y festivos." },
  { q: "¿Atienden industrias y plantas de producción?", a: "Sí. Contamos con técnicos especializados en mantención industrial, piping, obras civiles y montaje de equipos para plantas de todo rubro." },
  { q: "¿Hacen visita técnica antes de cotizar?", a: "Sí. La visita técnica de evaluación es gratuita y sin compromiso. Nuestro equipo evalúa el proyecto en terreno y entrega la propuesta en 24 horas." },
  { q: "¿Trabajan fines de semana?", a: "Sí, atendemos de lunes a domingo. Para proyectos industriales y condominios podemos coordinar horarios nocturnos para minimizar el impacto operacional." },
  { q: "¿Ofrecen garantía por los trabajos realizados?", a: "Todos nuestros trabajos incluyen garantía escrita. El plazo varía según el tipo de servicio: desde 3 meses para reparaciones menores hasta 2 años para instalaciones eléctricas e industriales." },
  { q: "¿Tienen certificación SEC para trabajos eléctricos?", a: "Sí. Contamos con instaladores eléctricos con registro SEC vigente para instalaciones residenciales, comerciales e industriales, incluyendo empalmes y conexiones al sistema eléctrico." },
];

const testimonials = [
  { name: "Carlos Mendoza", role: "Propietario, San Bernardo", text: "Excelente trabajo en la instalación eléctrica completa de mi casa. Puntuales, prolijos y con muy buen precio. 100% recomendados.", stars: 5 },
  { name: "Ana Torres", role: "Administradora, Condominio Los Olivos", text: "Llevan 2 años manteniendo nuestro condominio. Siempre disponibles para emergencias. La calidad del trabajo no tiene comparación.", stars: 5 },
  { name: "Roberto Fuentes", role: "Gerente de Planta, Industrias del Sur", text: "Realizaron toda la instalación industrial de nuestra planta. Cumplieron los plazos y entregaron certificación SEC. Muy profesionales.", stars: 5 },
  { name: "Valentina Rojas", role: "Arquitecta, Estudio VR", text: "Los recomiendo para proyectos de remodelación. Entienden perfectamente los planos y ejecutan con precisión. Gran equipo.", stars: 5 },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      className="border border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/40 transition-colors"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between gap-4 p-5 bg-card">
        <span className="font-medium text-sm sm:text-base">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        </motion.span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border bg-background/30">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          <HeroBackground />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              <motion.span
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="inline-block text-primary text-sm font-semibold tracking-widest uppercase mb-6 border border-primary/30 rounded-full px-4 py-1.5"
              >
                Pozo Home & Business
              </motion.span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4 leading-tight">
                Soluciones Integrales para{" "}
                <span className="text-primary">Hogares, Empresas</span>{" "}
                e Industrias
              </h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 font-light leading-relaxed">
                Desde una reparación doméstica hasta proyectos industriales de gran escala.
                Técnicos certificados, garantía escrita, atención 24/7.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link href="/cotizar">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-semibold">
                    Solicitar Cotización <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="https://wa.me/56912345678?text=Hola%2C%20me%20interesa%20una%20cotizaci%C3%B3n" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 border-green-500/50 text-green-400 hover:bg-green-500/10">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    WhatsApp
                  </Button>
                </a>
                <Link href="/servicios">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto h-14 px-8 text-muted-foreground hover:text-foreground">
                    Ver Servicios <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                className="flex flex-wrap justify-center gap-2"
              >
                {heroIndicators.map((ind, i) => (
                  <motion.span
                    key={ind}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="inline-flex items-center gap-1.5 text-xs bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 text-muted-foreground"
                  >
                    <CheckCircle2 className="w-3 h-3 text-primary" />
                    {ind}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
        </section>

        {/* ── STATS + SELLOS ── */}
        <section className="py-20 bg-card relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-14">
              {[
                { value: 500, suffix: "+", label: "Proyectos", color: "text-primary" },
                { value: 100, suffix: "+", label: "Clientes", color: "text-blue-400" },
                { value: 10, suffix: "+", label: "Años", color: "text-green-400" },
                { value: 24, suffix: "/7", label: "Soporte", color: "text-orange-400" },
                { value: 100, suffix: "%", label: "Compromiso", color: "text-primary" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-background border border-border rounded-2xl p-5 text-center hover:border-primary/30 transition-colors"
                >
                  <div className={`text-3xl md:text-4xl font-bold ${s.color} mb-1`}>
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-muted-foreground text-xs">{s.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {seals.map((seal, i) => (
                <motion.div
                  key={seal.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex flex-col items-center gap-2 bg-background/60 border border-border rounded-xl py-4 px-3 text-center hover:border-primary/30 transition-colors"
                >
                  <seal.icon className="w-6 h-6 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">{seal.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUIÉNES SOMOS + TIMELINE ── */}
        <section className="py-28 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">Quiénes Somos</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
                Una empresa construida<br />sobre la <span className="text-primary">confianza</span>
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
                Pozo Home & Business ofrece soluciones integrales para viviendas, condominios, empresas e industrias,
                integrando construcción, electricidad, estructuras metálicas, mantención industrial y servicios especializados
                bajo altos estándares de seguridad y calidad.
              </p>
            </motion.div>

            <div className="relative">
              <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                {timeline.map((t, i) => (
                  <motion.div
                    key={t.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.12 }}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-card border-2 border-border group-hover:border-primary/50 transition-colors flex flex-col items-center justify-center mb-4 relative z-10 bg-background shadow-lg shadow-black/20">
                      <span className="text-primary font-bold text-sm">{t.step}</span>
                    </div>
                    <h3 className="font-bold text-base mb-1">{t.label}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{t.desc}</p>
                    {i < timeline.length - 1 && (
                      <div className="md:hidden mt-4 h-6 w-0.5 bg-border mx-auto" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICIOS RESIDENCIALES ── */}
        <section className="py-28 bg-card relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">Para tu hogar</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Servicios Residenciales</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Soluciones para casas, departamentos, oficinas y condominios.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {services7.map((svc, i) => (
                <motion.div
                  key={svc.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`group bg-gradient-to-br ${svc.color} border ${svc.border} rounded-2xl p-6 transition-all duration-300 cursor-pointer`}
                >
                  <Link href="/servicios">
                    <div className="text-3xl mb-4">{svc.emoji}</div>
                    <h3 className="font-bold text-base mb-1">{svc.label}</h3>
                    <p className="text-muted-foreground text-xs mb-4">{svc.desc}</p>
                    <span className={`text-xs font-semibold ${svc.text} flex items-center gap-1 group-hover:gap-2 transition-all`}>
                      Ver detalles <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICIOS INDUSTRIALES AVANZADOS ── */}
        <section className="py-28 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-red-500/5 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-3 border border-red-500/30 rounded-full px-4 py-1 text-red-400">
                <Factory className="w-4 h-4" />
                Para la industria
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Servicios Industriales Avanzados</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Capacidad técnica para plantas, galpones y proyectos de gran escala.
                Nuestro equipo industrial trabaja con los más altos estándares de seguridad.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {industrialServices.map((svc, i) => (
                <motion.div
                  key={svc.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`group bg-gradient-to-br ${svc.color} border ${svc.border} rounded-2xl p-7 transition-all duration-300 backdrop-blur-sm`}
                >
                  <div className="text-4xl mb-5">{svc.emoji}</div>
                  <h3 className="font-bold text-lg mb-2">{svc.label}</h3>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{svc.desc}</p>
                  <Link href="/servicios">
                    <span className={`text-xs font-semibold ${svc.text} flex items-center gap-1 group-hover:gap-2 transition-all`}>
                      Ver detalles <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESO DE TRABAJO ── */}
        <section className="py-28 bg-card relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">Cómo trabajamos</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Proceso de Trabajo</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-lg">Claro, simple y sin sorpresas.</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {process.map((p, i) => (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.1 }}
                  className="relative group"
                >
                  {i < process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0" style={{ width: "calc(100% - 4px)", left: "calc(50% + 28px)" }} />
                  )}
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-background border border-border group-hover:border-primary/50 transition-colors flex items-center justify-center mb-3 shadow-lg shadow-black/20">
                      <p.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-primary text-xs font-bold mb-1">Paso {p.step}</span>
                    <h3 className="font-bold text-sm mb-1">{p.label}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COBERTURA ── */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">Dónde operamos</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Áreas de Cobertura</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                Presencia en la zona central de Chile con capacidad de desplazamiento nacional para proyectos industriales.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {coverageAreas.map((area, i) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`border rounded-2xl p-5 text-center ${area.color} hover:scale-105 transition-transform duration-300`}
                >
                  <MapPin className="w-6 h-6 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-sm mb-1">{area.name}</h3>
                  <p className="text-muted-foreground text-xs">{area.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIOS ── */}
        <section className="py-28 bg-card relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">Testimonios</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Lo que dicen nuestros clientes</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-background/60 backdrop-blur-sm border border-border rounded-2xl p-8 hover:border-primary/30 transition-all relative"
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/15" />
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-28 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">FAQ</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Preguntas Frecuentes</h2>
              <p className="text-muted-foreground text-lg">Todo lo que necesitas saber antes de contactarnos.</p>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <FaqItem q={faq.q} a={faq.a} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL PREMIUM ── */}
        <section className="py-32 bg-card relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-primary/5 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">¿Listo para comenzar?</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                ¿Necesitas una solución<br />
                <span className="text-primary">profesional</span>?
              </h2>
              <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Contáctenos hoy y recibe un presupuesto sin costo en menos de 24 horas.
                Atendemos hogares, condominios, empresas e industrias.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/cotizar">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-base font-semibold shadow-2xl shadow-primary/30">
                      Solicitar Cotización <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
                <a href="https://wa.me/56948072210?text=Hola%2C%20quiero%20hablar%20con%20un%20especialista" target="_blank" rel="noopener noreferrer">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-10 text-base border-green-500/50 text-green-400 hover:bg-green-500/10">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                      Hablar por WhatsApp
                    </Button>
                  </motion.div>
                </a>
              </div>

              <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                {[
                  { icon: PhoneCall, label: "+56948072210" },
                  { icon: Mail, label: "contacto.pozohomebusiness@gmail.com" },
                  { icon: Clock, label: "Lunes a Domingo 08:00–20:00" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
