import { HeroBackground } from "@/components/3d/hero-background";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ChevronRight, ShieldCheck, HardHat, Wrench, Award,
  Zap, Paintbrush, Home as HomeIcon, Leaf, Building2, Construction,
  Star, Quote, Phone, Mail, Clock, MapPin,
  Users, Briefcase, Trophy, CheckCircle2,
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
    }, 25);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const services7 = [
  { icon: Zap, label: "Electricidad", color: "from-yellow-500/20 to-yellow-500/5", border: "border-yellow-500/30", text: "text-yellow-400", desc: "Residencial e industrial" },
  { icon: Wrench, label: "Gasfitería", color: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/30", text: "text-blue-400", desc: "Agua, gas y sanitarios" },
  { icon: Paintbrush, label: "Pintura", color: "from-orange-500/20 to-orange-500/5", border: "border-orange-500/30", text: "text-orange-400", desc: "Interior, exterior e industrial" },
  { icon: HomeIcon, label: "Techumbres", color: "from-slate-500/20 to-slate-500/5", border: "border-slate-500/30", text: "text-slate-300", desc: "Goteras, cubiertas y más" },
  { icon: Leaf, label: "Jardinería", color: "from-green-500/20 to-green-500/5", border: "border-green-500/30", text: "text-green-400", desc: "Diseño y mantención" },
  { icon: Building2, label: "Estructuras Metálicas", color: "from-zinc-500/20 to-zinc-500/5", border: "border-zinc-500/30", text: "text-zinc-300", desc: "Rejas, racks y plataformas" },
  { icon: Briefcase, label: "Construcción", color: "from-amber-500/20 to-amber-500/5", border: "border-amber-500/30", text: "text-amber-400", desc: "Remodelación y obra civil" },
];

const proyectos = [
  { label: "Electricidad", color: "bg-yellow-500/10 border-yellow-500/20", icon: Zap, iconColor: "text-yellow-400" },
  { label: "Gasfitería", color: "bg-blue-500/10 border-blue-500/20", icon: Wrench, iconColor: "text-blue-400" },
  { label: "Construcción", color: "bg-amber-500/10 border-amber-500/20", icon: Briefcase, iconColor: "text-amber-400" },
  { label: "Techumbres", color: "bg-slate-500/10 border-slate-500/20", icon: HomeIcon, iconColor: "text-slate-300" },
  { label: "Pintura", color: "bg-orange-500/10 border-orange-500/20", icon: Paintbrush, iconColor: "text-orange-400" },
  { label: "Estructuras", color: "bg-zinc-500/10 border-zinc-500/20", icon: Building2, iconColor: "text-zinc-300" },
];

const testimonials = [
  { name: "Carlos Mendoza", role: "Propietario, San Bernardo", text: "Excelente trabajo en la instalación eléctrica completa de mi casa. Puntuales, prolijos y con muy buen precio. 100% recomendados.", stars: 5 },
  { name: "Ana Torres", role: "Administradora, Condominio Los Olivos", text: "Llevan 2 años manteniendo nuestro condominio. Siempre disponibles para emergencias. La calidad del trabajo no tiene comparación.", stars: 5 },
  { name: "Roberto Fuentes", role: "Gerente de Planta, Industrias del Sur", text: "Realizaron toda la instalación industrial de nuestra planta. Cumplieron los plazos y entregaron certificación SEC. Muy profesionales.", stars: 5 },
  { name: "Valentina Rojas", role: "Arquitecta, Estudio VR", text: "Los recomiendo para proyectos de remodelación. Entienden perfectamente los planos y ejecutan con precisión. Gran equipo.", stars: 5 },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30">
      <Navbar />

      <main className="flex-1">
        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          <HeroBackground />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-block text-primary text-sm font-semibold tracking-widest uppercase mb-6 border border-primary/30 rounded-full px-4 py-1.5"
              >
                Pozo Home & Business
              </motion.span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-tight">
                Soluciones Integrales para{" "}
                <span className="text-primary">Hogares, Empresas</span>{" "}
                y Condominios
              </h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 font-light leading-relaxed">
                Electricidad, Gasfitería, Construcción, Estructuras Metálicas, Techumbres, Pintura y Jardinería.
                Desde reparaciones menores hasta proyectos industriales completos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/cotizar">
                  <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 font-semibold">
                    Solicitar Cotización <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/56912345678?text=Hola%2C%20me%20interesa%20una%20cotizaci%C3%B3n"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-base h-14 px-8 border-green-500/50 text-green-400 hover:bg-green-500/10 hover:border-green-400"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Contactar por WhatsApp
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
        </section>

        {/* ── QUIÉNES SOMOS + STATS ── */}
        <section className="py-28 bg-card relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">Quiénes Somos</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                  Pozo Home &<br /><span className="text-primary">Business</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Somos una empresa especializada en mantenimiento, reparación, construcción y servicios industriales.
                  Entregamos soluciones profesionales para hogares, condominios, comercios, galpones y plantas industriales,
                  garantizando calidad, seguridad y cumplimiento de normas técnicas.
                </p>
                <ul className="space-y-3">
                  {[
                    "Personal técnico certificado y con experiencia",
                    "Garantía escrita en todos nuestros trabajos",
                    "Atención de urgencias 24/7",
                    "Presupuestos sin costo y sin compromiso",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  { icon: Trophy, value: 500, suffix: "+", label: "Proyectos Realizados", color: "text-primary" },
                  { icon: Users, value: 100, suffix: "+", label: "Clientes Satisfechos", color: "text-blue-400" },
                  { icon: Award, value: 10, suffix: "+", label: "Años de Experiencia", color: "text-green-400" },
                  { icon: ShieldCheck, value: 100, suffix: "%", label: "Compromiso Total", color: "text-orange-400" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-background border border-border rounded-2xl p-6 text-center hover:border-primary/30 transition-colors"
                  >
                    <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                    <div className={`text-4xl font-bold ${stat.color} mb-1`}>
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SERVICIOS OVERVIEW ── */}
        <section className="py-28 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">Lo que hacemos</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Nuestros Servicios</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Soluciones profesionales para cada necesidad, desde reparaciones del hogar hasta grandes proyectos industriales.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {services7.map((svc, i) => (
                <motion.div
                  key={svc.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08 }}
                  className={`group bg-gradient-to-br ${svc.color} border ${svc.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer`}
                >
                  <Link href="/servicios">
                    <svc.icon className={`w-8 h-8 ${svc.text} mb-4`} />
                    <h3 className="font-bold text-base mb-1">{svc.label}</h3>
                    <p className="text-muted-foreground text-xs">{svc.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/servicios">
                <Button variant="outline" size="lg" className="border-border hover:border-primary">
                  Ver catálogo completo <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── PROYECTOS ── */}
        <section className="py-28 bg-card relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">Nuestro Trabajo</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Proyectos Realizados</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Más de 500 proyectos exitosos en todo tipo de industrias y hogares a lo largo del país.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {proyectos.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1 }}
                  className={`${p.color} border rounded-2xl aspect-video flex flex-col items-center justify-center gap-3 hover:scale-105 transition-all duration-300 group cursor-pointer`}
                >
                  <div className="w-14 h-14 rounded-xl bg-background/40 flex items-center justify-center group-hover:bg-background/60 transition-colors">
                    <p.icon className={`w-7 h-7 ${p.iconColor}`} />
                  </div>
                  <span className="font-semibold text-sm tracking-wide">{p.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIOS ── */}
        <section className="py-28 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">Testimonios</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Lo que dicen nuestros clientes</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                La confianza de nuestros clientes es nuestro mayor activo.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-colors relative"
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
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

        {/* ── CONTACTO / CTA ── */}
        <section className="py-28 bg-card relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">Contacto</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
                  ¿Listo para <span className="text-primary">comenzar</span>?
                </h2>
                <ul className="space-y-5">
                  {[
                    { icon: Phone, label: "+56 9 XXXX XXXX", sub: "Llamadas y WhatsApp" },
                    { icon: Mail, label: "contacto@pozohomebusiness.cl", sub: "Respondemos en menos de 24h" },
                    { icon: Clock, label: "Lunes a Domingo, 08:00 – 20:00", sub: "Urgencias 24/7" },
                    { icon: MapPin, label: "Región Metropolitana y alrededores", sub: "Cobertura nacional en proyectos industriales" },
                  ].map(({ icon: Icon, label, sub }) => (
                    <li key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{label}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{sub}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-background border border-border rounded-2xl p-8 text-center"
              >
                <h3 className="text-2xl font-bold mb-3">Cotización sin costo</h3>
                <p className="text-muted-foreground mb-8">
                  Cuéntenos su proyecto y le enviamos un presupuesto detallado en menos de 24 horas.
                </p>
                <div className="space-y-3">
                  <Link href="/cotizar">
                    <Button size="lg" className="w-full font-semibold h-12">
                      Solicitar Cotización Online
                    </Button>
                  </Link>
                  <a
                    href="https://wa.me/56912345678?text=Hola%2C%20me%20interesa%20una%20cotizaci%C3%B3n"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-green-500/40 text-green-400 hover:bg-green-500/10 h-12 mt-3"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2 fill-current">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Escribir por WhatsApp
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
