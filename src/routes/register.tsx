import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — CodeArena" }] }),
  component: Register,
});

function Register() {
  return (
    <div className="grid min-h-screen place-items-center p-6 gradient-hero">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl border border-border/60 glass p-8 shadow-elegant">
        <Link to="/" className="mb-6 flex items-center gap-2 text-lg font-semibold">
          <div className="grid h-9 w-9 place-items-center rounded-lg gradient-primary shadow-glow">
            <Code2 className="h-5 w-5 text-primary-foreground" />
          </div>
          CodeArena
        </Link>
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Start your competitive programming journey.</p>

        <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Account created — welcome!"); }}>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label>First name</Label><Input defaultValue="Alex" /></div>
            <div className="space-y-2"><Label>Last name</Label><Input defaultValue="Carter" /></div>
          </div>
          <div className="space-y-2"><Label>Username</Label><Input defaultValue="alex_codes" /></div>
          <div className="space-y-2"><Label>Email</Label><Input type="email" defaultValue="alex@codearena.dev" /></div>
          <div className="space-y-2"><Label>Password</Label><Input type="password" defaultValue="password" /></div>
          <Button className="w-full gradient-primary text-primary-foreground shadow-glow">Create account</Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
