import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAdminLogin, useGetAdminMe } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

export default function Login() {
  const [_, setLocation] = useLocation();
  const { data: admin, isLoading } = useGetAdminMe();
  const loginMutation = useAdminLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (isLoading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
  if (admin) {
    setLocation("/admin/dashboard");
    return null;
  }

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    loginMutation.mutate({ data: values }, {
      onSuccess: () => {
        toast.success("Bienvenido al panel de administración");
        setLocation("/admin/dashboard");
      },
      onError: (error) => {
        toast.error(error.error || "Credenciales inválidas");
      }
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card border border-border p-8 rounded-2xl shadow-2xl relative z-10"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Acceso Administrativo</h1>
          <p className="text-muted-foreground text-sm">Ingrese sus credenciales para acceder al sistema Pozo.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="admin@pozo.com" {...field} className="bg-background border-border h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} className="bg-background border-border h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : null}
              Iniciar Sesión
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
