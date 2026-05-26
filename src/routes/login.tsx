import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Code2, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — CodeArena" }] }),
  component: Login,
});

function Login() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative flex h-full flex-col justify-between p-10">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
            <div className="grid h-9 w-9 place-items-center rounded-lg gradient-primary shadow-glow">
              <Code2 className="h-5 w-5 text-primary-foreground" />
            </div>
            CodeArena
          </Link>
          <div>
            <blockquote className="text-2xl font-medium leading-snug">
              "CodeArena turned daily practice into a habit I actually look forward to."
            </blockquote>
            <div className="mt-4 text-sm text-muted-foreground">— Riya, SWE @ Stripe</div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to continue solving.</p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => { e.preventDefault(); toast.success("Welcome back, Alex!"); }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" defaultValue="alex@codearena.dev" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" defaultValue="password" />
            </div>
            <Button className="w-full gradient-primary text-primary-foreground shadow-glow">Sign in</Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" /><span className="text-xs text-muted-foreground">OR</span><Separator className="flex-1" />
          </div>
          <div className="space-y-2">
            <Button variant="outline" className="w-full"><Github className="mr-2 h-4 w-4" /> Continue with GitHub</Button>
            <Button variant="outline" className="w-full"><Mail className="mr-2 h-4 w-4" /> Continue with Google</Button>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here? <Link to="/register" className="text-primary hover:underline">Create an account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
