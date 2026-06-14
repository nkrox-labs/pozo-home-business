import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-4">
              <span className="w-6 h-6 bg-primary rounded-sm inline-flex items-center justify-center text-background font-black text-sm">P</span>
              POZO
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Servicios premium para el hogar y la industria. Ingeniería, precisión y calidad en cada proyecto.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/cotizar" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Cotizar
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Contacto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@pozo.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Av. Industrial 123, Ciudad</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Pozo Home & Business. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
