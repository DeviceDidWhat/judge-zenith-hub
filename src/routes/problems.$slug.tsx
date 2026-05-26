import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { motion } from "motion/react";
import { ArrowLeft, Lightbulb, Play, Send, Terminal, ThumbsUp } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { VerdictBadge } from "@/components/verdict-badge";
import { difficultyClass, languages, problems, type Problem, type Verdict } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/problems/$slug")({
  loader: ({ params }): Problem => {
    const p = problems.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  component: ProblemDetail,
});

function ProblemDetail() {
  const p = Route.useLoaderData() as Problem;
  const [lang, setLang] = useState("cpp");
  const [code, setCode] = useState(p.starterCode[lang] || "// start coding…");
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [customInput, setCustomInput] = useState(p.examples[0]?.input ?? "");

  const onRun = () => {
    setRunning(true); setOutput(null);
    setTimeout(() => {
      setRunning(false);
      setOutput(`Output:\n${p.examples[0]?.output ?? "[]"}\n\nExecution time: 12ms\nMemory: 6.4MB`);
    }, 900);
  };

  const onSubmit = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      const verdicts: Verdict[] = ["Accepted", "Accepted", "Accepted", "Wrong Answer", "TLE"];
      const v = verdicts[Math.floor(Math.random() * verdicts.length)];
      setVerdict(v);
      setShowResult(true);
      if (v === "Accepted") toast.success("Accepted! 🎉");
      else toast.error(`Verdict: ${v}`);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild><Link to="/problems"><ArrowLeft className="mr-1 h-4 w-4" />All problems</Link></Button>
          <h1 className="font-semibold">{p.id}. {p.title}</h1>
          <span className={`text-sm font-medium ${difficultyClass[p.difficulty]}`}>{p.difficulty}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onRun} disabled={running}>
            <Play className="mr-1.5 h-3.5 w-3.5" /> Run
          </Button>
          <Button size="sm" className="gradient-primary text-primary-foreground" onClick={onSubmit} disabled={running}>
            <Send className="mr-1.5 h-3.5 w-3.5" /> Submit
          </Button>
        </div>
      </div>

      <div className="grid flex-1 lg:grid-cols-2">
        {/* LEFT */}
        <div className="border-r border-border/60 overflow-y-auto">
          <Tabs defaultValue="problem" className="p-4">
            <TabsList className="bg-secondary/60">
              <TabsTrigger value="problem">Problem</TabsTrigger>
              <TabsTrigger value="hints">Hints</TabsTrigger>
              <TabsTrigger value="editorial">Editorial</TabsTrigger>
              <TabsTrigger value="discuss">Discussions</TabsTrigger>
            </TabsList>

            <TabsContent value="problem" className="space-y-6 pt-4 text-sm leading-relaxed">
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
              </div>
              <p className="whitespace-pre-line">{p.description}</p>

              <div>
                <h3 className="mb-2 font-semibold">Examples</h3>
                <div className="space-y-3">
                  {p.examples.map((ex, i) => (
                    <div key={i} className="rounded-lg border border-border/60 bg-secondary/40 p-3 font-mono text-xs">
                      <div><span className="text-muted-foreground">Input: </span>{ex.input}</div>
                      <div><span className="text-muted-foreground">Output: </span>{ex.output}</div>
                      {ex.explanation && <div className="mt-1 text-muted-foreground">Explanation: {ex.explanation}</div>}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Constraints</h3>
                <ul className="space-y-1 text-muted-foreground">
                  {p.constraints.map((c, i) => <li key={i} className="font-mono text-xs">• {c}</li>)}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="hints" className="space-y-3 pt-4">
              {p.hints.map((h, i) => (
                <div key={i} className="flex gap-3 rounded-lg border border-border/60 bg-warning/5 p-3">
                  <Lightbulb className="h-4 w-4 shrink-0 text-warning" />
                  <p className="text-sm">{h}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="editorial" className="pt-4 text-sm">
              <h3 className="font-semibold mb-2">Approach 1 — Hash Map (Optimal)</h3>
              <p className="text-muted-foreground">
                We can iterate through the array once. For each element, we check whether
                the complement (<code className="font-mono text-foreground">target - nums[i]</code>) has been seen before.
                A hash map gives us O(1) average lookup, so the total time complexity is O(n).
              </p>
            </TabsContent>

            <TabsContent value="discuss" className="space-y-3 pt-4">
              {[1,2,3].map((i) => (
                <div key={i} className="rounded-lg border border-border/60 p-3">
                  <div className="text-sm font-medium">Clean {i === 1 ? "C++" : i === 2 ? "Python" : "Java"} solution beats 99%</div>
                  <div className="mt-1 text-xs text-muted-foreground">by tourist · 2h ago</div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> {248 - i * 30}</span>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-2 border-b border-border/60 px-4 py-2">
            <Select value={lang} onValueChange={(v) => { setLang(v); setCode(p.starterCode[v] || ""); }}>
              <SelectTrigger className="h-8 w-40 bg-card/50"><SelectValue /></SelectTrigger>
              <SelectContent>
                {languages.map((l) => <SelectItem key={l.id} value={l.id}>{l.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground font-mono">Auto-saved</span>
          </div>

          <div className="flex-1 min-h-[300px]">
            <Editor
              theme="vs-dark"
              language={languages.find((l) => l.id === lang)?.monaco || "plaintext"}
              value={code}
              onChange={(v) => setCode(v ?? "")}
              options={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 12 },
              }}
            />
          </div>

          <div className="border-t border-border/60">
            <Tabs defaultValue="testcase" className="p-3">
              <TabsList className="bg-secondary/60">
                <TabsTrigger value="testcase">Testcase</TabsTrigger>
                <TabsTrigger value="output"><Terminal className="mr-1.5 h-3.5 w-3.5" />Output</TabsTrigger>
              </TabsList>
              <TabsContent value="testcase" className="pt-3">
                <Textarea value={customInput} onChange={(e) => setCustomInput(e.target.value)}
                  className="h-24 font-mono text-xs bg-secondary/40" />
              </TabsContent>
              <TabsContent value="output" className="pt-3">
                <pre className="h-24 overflow-auto rounded-md border border-border/60 bg-background p-3 font-mono text-xs">
                  {running ? <span className="text-warning animate-pulse">▸ Executing on judge node #7…</span> :
                   output ?? <span className="text-muted-foreground">Run your code to see output.</span>}
                </pre>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {verdict && <VerdictBadge verdict={verdict} />}
              <span>Submission Result</span>
            </DialogTitle>
            <DialogDescription>Submission #SUB-{Math.floor(Math.random() * 9000 + 1000)}</DialogDescription>
          </DialogHeader>
          {verdict === "Accepted" ? (
            <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-border/60 p-3"><div className="text-xs text-muted-foreground">Runtime</div><div className="text-lg font-semibold text-success">8 ms</div><div className="text-xs text-muted-foreground">Beats 96.2%</div></div>
                <div className="rounded-lg border border-border/60 p-3"><div className="text-xs text-muted-foreground">Memory</div><div className="text-lg font-semibold text-success">6.4 MB</div><div className="text-xs text-muted-foreground">Beats 87.1%</div></div>
              </div>
              <div className="text-xs text-muted-foreground">All 87 / 87 testcases passed.</div>
            </motion.div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Testcase 14 / 87 failed.
              <pre className="mt-2 rounded-md bg-secondary/60 p-3 font-mono text-xs">Input: [3,2,4,0]{"\n"}Expected: [1,2]{"\n"}Got: [0,2]</pre>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
