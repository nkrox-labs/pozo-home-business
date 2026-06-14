import { HeroBackground } from "@/components/3d/hero-background";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, Wrench, Building2, HardHat } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
          <HeroBackground />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
                Ingeniería y <span className="text-primary">Precisión</span>
              </h1>
              <p className="mt-4 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 font-light">
                Servicios premium para el hogar y la industria. Cuando el trabajo debe hacerse bien, somos la única opción.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/cotizar">
                  <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 font-semibold">
                    Cotizar Proyecto <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/servicios">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-14 px-8 border-border hover:bg-secondary">
                    Explorar Servicios
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">El Estándar Pozo</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                No somos contratistas comunes. Somos un equipo de especialistas dedicados a la excelencia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: ShieldCheck, title: "Garantía Total", desc: "Cada trabajo está respaldado por nuestra promesa de calidad absoluta." },
                { icon: HardHat, title: "Expertos Certificados", desc: "Personal altamente capacitado con años de experiencia en el sector." },
                { icon: Wrench, title: "Materiales Premium", desc: "Utilizamos exclusivamente insumos de la más alta calidad en el mercado." }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  className="bg-background border border-border p-8 rounded-xl hover:border-primary/50 transition-colors"
                >
                  <feature.icon className="h-12 w-12 text-primary mb-6" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">¿Listo para comenzar?</h2>
            <p className="text-xl text-muted-foreground mb-10">
              Transforme su visión en realidad con la confianza que solo Pozo puede brindar.
            </p>
            <Link href="/cotizar">
              <Button size="lg" className="text-lg h-14 px-10">
                Solicitar Cotización Ahora
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
