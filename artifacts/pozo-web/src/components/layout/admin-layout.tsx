import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useGetAdminMe, useAdminLogout } from "@workspace/api-client-react";
import { LayoutDashboard, ListTodo, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [_, setLocation] = useLocation();
  const { data: admin, isLoading, isError } = useGetAdminMe();
  const logout = useAdminLogout();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !admin) {
    setLocation("/admin");
    return null;
  }

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        toast.success("Sesión cerrada correctamente");
        setLocation("/admin");
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-border flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-border">
          <Link href="/admin/dashboard" className="text-xl font-bold tracking-tighter flex items-center gap-2 text-foreground">
            <span className="w-8 h-8 bg-primary rounded-sm inline-flex items-center justify-center text-background font-black">P</span>
            POZO ADMIN
          </Link>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-2">
          <Link href="/admin/dashboard">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-secondary">
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/cotizaciones">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-secondary">
              <ListTodo className="mr-3 h-5 w-5" />
              Cotizaciones
            </Button>
          </Link>
        </div>

        <div className="p-4 border-t border-border">
          <div className="mb-4 px-2">
            <p className="text-sm font-medium text-foreground">{admin.name}</p>
            <p className="text-xs text-muted-foreground truncate">{admin.email}</p>
          </div>
          <Button 
            variant="destructive" 
            className="w-full justify-start bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={handleLogout}
            disabled={logout.isPending}
          >
            {logout.isPending ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <LogOut className="mr-3 h-5 w-5" />}
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
