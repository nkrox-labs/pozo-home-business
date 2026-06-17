import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Preloader } from "@/components/layout/preloader";

import Home from "@/pages/home";
import Servicios from "@/pages/servicios";
import Cotizar from "@/pages/cotizar";
import Login from "@/pages/admin/login";
import Dashboard from "@/pages/admin/dashboard";
import Cotizaciones from "@/pages/admin/cotizaciones";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        const status = (error as { status?: number })?.status;
        if (status && status >= 400 && status < 500) return false;
        return failureCount < 2;
      },
      staleTime: 30_000,
    },
  },
});

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/servicios" component={Servicios} />
      <Route path="/cotizar" component={Cotizar} />
      <Route path="/admin" component={Login} />
      <Route path="/admin/dashboard" component={Dashboard} />
      <Route path="/admin/cotizaciones" component={Cotizaciones} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Preloader onComplete={() => setPreloaderDone(true)} />
        {preloaderDone && (
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <ScrollToTop />
            <Router />
            <WhatsAppButton />
          </WouterRouter>
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
