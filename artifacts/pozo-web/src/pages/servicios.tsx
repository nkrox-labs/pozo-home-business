import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useListServices } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Home as HomeIcon, Building2, Factory } from "lucide-react";

export default function Servicios() {
  const { data: services, isLoading } = useListServices();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "residential": return <HomeIcon className="h-6 w-6 text-primary" />;
      case "commercial": return <Building2 className="h-6 w-6 text-primary" />;
      case "industrial": return <Factory className="h-6 w-6 text-primary" />;
      default: return <HomeIcon className="h-6 w-6 text-primary" />;
    }
  };

  const categories = [
    { id: "residential", label: "Residencial", desc: "Soluciones de alta gama para su hogar" },
    { id: "commercial", label: "Comercial", desc: "Mantenimiento y desarrollo para negocios" },
    { id: "industrial", label: "Industrial", desc: "Operaciones de gran escala y precisión" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Nuestros Servicios</h1>
            <p className="text-lg text-muted-foreground">
              Ofrecemos un catálogo completo de servicios especializados, ejecutados por profesionales certificados bajo los más altos estándares de calidad.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-64 w-full rounded-xl bg-card" />
              ))}
            </div>
          ) : (
            <div className="space-y-24">
              {categories.map((cat, categoryIndex) => {
                const categoryServices = services?.filter(s => s.category === cat.id) || [];
                if (categoryServices.length === 0) return null;

                return (
                  <motion.div 
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-border">
                      {getCategoryIcon(cat.id)}
                      <div>
                        <h2 className="text-2xl font-bold">{cat.label}</h2>
                        <p className="text-sm text-muted-foreground">{cat.desc}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryServices.map((service, i) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.4 }}
                          className="bg-card border border-border p-6 rounded-xl hover:border-primary/50 transition-all group"
                        >
                          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{service.name}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {service.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
