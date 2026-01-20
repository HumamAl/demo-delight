import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Target,
  Lightbulb,
  Calendar,
  Briefcase,
  Mail,
  Phone,
  Linkedin,
  Github,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Globe,
  FileText,
  Sparkles,
  XCircle,
  Shield,
  Database,
  Zap
} from "lucide-react";

// Timeline with specific 2026 dates
const timeline = [
  {
    week: "Jan 27 - Feb 7",
    phase: "Foundation",
    tasks: [
      "PostgreSQL schema with RLS multi-tenancy",
      "Node.js/Express API architecture",
      "React PWA shell with offline support",
      "S3 bucket setup for photos/PDFs"
    ],
    deliverable: "Working API + empty mobile form"
  },
  {
    week: "Feb 10 - Feb 21",
    phase: "Core Features",
    tasks: [
      "Mobile inspection form with validation",
      "Camera integration + photo upload to S3",
      "Scoring engine (pass/fail calculation)",
      "Local storage for offline inspections"
    ],
    deliverable: "Functional field form (no PDF yet)"
  },
  {
    week: "Feb 24 - Mar 7",
    phase: "PDF & Email",
    tasks: [
      "HTML template with branding placeholders",
      "Puppeteer PDF generation service",
      "Photo placement in Before/After sections",
      "SendGrid email delivery"
    ],
    deliverable: "Complete inspection -> PDF -> email flow"
  },
  {
    week: "Mar 10 - Mar 21",
    phase: "Polish & Deploy",
    tasks: [
      "Admin dashboard (view/regenerate reports)",
      "GHL API integration (Phase 2 prep)",
      "Testing + bug fixes",
      "Production deployment (Railway/Vercel)"
    ],
    deliverable: "Production-ready MVP"
  },
];

const projects = [
  {
    name: "Service Business Suite",
    type: "Multi-tenant SaaS",
    description: "Scheduling, invoicing, and client management for service businesses. Built with the exact multi-tenant patterns this project needs.",
    icon: <Sparkles className="w-5 h-5" />,
    tags: ["React", "Node.js", "PostgreSQL RLS", "Multi-tenant"],
    relevance: "Same architecture pattern"
  },
  {
    name: "Field Report Generator",
    type: "Internal Tool",
    description: "PDF generation system for property inspections with photo placement in specific sections. Puppeteer + HTML templates.",
    icon: <FileText className="w-5 h-5" />,
    tags: ["Puppeteer", "S3", "PDF Generation"],
    relevance: "Same PDF approach"
  },
  {
    name: "Mobile Data Collection",
    type: "PWA",
    description: "Offline-capable mobile forms for field workers. IndexedDB caching, background sync, camera integration.",
    icon: <Smartphone className="w-5 h-5" />,
    tags: ["React PWA", "IndexedDB", "Service Workers"],
    relevance: "Same mobile-first UX"
  },
  {
    name: "CRM Integration Layer",
    type: "API Service",
    description: "Async sync service connecting custom databases to various CRMs. Webhook handling, retry logic, decoupled architecture.",
    icon: <Globe className="w-5 h-5" />,
    tags: ["BullMQ", "Webhooks", "GHL API"],
    relevance: "Same CRM sync pattern"
  }
];

// What the client explicitly said they DON'T want
const notThisProject = [
  "GoHighLevel-only builds",
  "Zapier-first architectures",
  "WordPress-based solutions",
  "Forms + automation without a real backend"
];

export function Proposal() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Understanding Section */}
      <Card className="glass-card border-border/50 overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-lg">I Read Your Posting Carefully</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            You're building a <strong className="text-foreground">scalable MVP for plumbing field technicians</strong> that captures job data on-site and generates branded PDF reports with photos and scoring. This is <strong className="text-foreground">not</strong> a Zapier automation or GHL-dependent system—it's a <strong className="text-foreground">real custom backend</strong> where your database is the source of truth.
          </p>

          {/* What they want */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">Multi-client Ready from Day 1</p>
                <p className="text-xs text-muted-foreground">RLS-based tenant isolation, not a rewrite later</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">Database = Source of Truth</p>
                <p className="text-xs text-muted-foreground">GHL is optional sync target, not a dependency</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">Pixel-Perfect PDF Generation</p>
                <p className="text-xs text-muted-foreground">Photos in correct sections, branded layout</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">Mobile-First Field Experience</p>
                <p className="text-xs text-muted-foreground">Works on tablets, slow networks, offline</p>
              </div>
            </div>
          </div>

          {/* What they DON'T want */}
          <div className="bg-destructive/5 rounded-lg p-4 border border-destructive/20">
            <p className="text-xs font-semibold text-destructive uppercase tracking-wide mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              What You Said You Don't Want
            </p>
            <div className="flex flex-wrap gap-2">
              {notThisProject.map((item) => (
                <Badge key={item} variant="outline" className="text-xs text-destructive border-destructive/30">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Solution Approach */}
      <Card className="glass-card border-border/50 overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-lg">Recommended Stack</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Based on your requirements, here's what I'd use. Open to alternatives if you have preferences.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-sm">Frontend</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-3">React PWA with offline support</p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">React</Badge>
                <Badge variant="outline" className="text-xs">TypeScript</Badge>
                <Badge variant="outline" className="text-xs">Tailwind</Badge>
                <Badge variant="outline" className="text-xs">IndexedDB</Badge>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-sm">Backend</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Node.js API with PostgreSQL</p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">Node.js</Badge>
                <Badge variant="outline" className="text-xs">Express</Badge>
                <Badge variant="outline" className="text-xs">PostgreSQL</Badge>
                <Badge variant="outline" className="text-xs">Prisma</Badge>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-sm">Services</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-3">PDF, email, file storage, CRM</p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">Puppeteer</Badge>
                <Badge variant="outline" className="text-xs">SendGrid</Badge>
                <Badge variant="outline" className="text-xs">S3</Badge>
                <Badge variant="outline" className="text-xs">GHL API</Badge>
              </div>
            </div>
          </div>

          {/* Key Architecture Decisions */}
          <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Key Architecture Decisions
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span>Single PostgreSQL database with Row-Level Security (scales to 1000s of clients)</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span>JSONB for flexible inspection templates (each client can customize)</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span>Presigned S3 URLs for photo upload (secure, scalable, cheap)</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span>GHL sync via async job queue (never blocks core functionality)</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="glass-card border-border/50 overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-lg">8-Week Timeline</CardTitle>
            </div>
            <Badge variant="outline" className="text-xs">
              Jan 27 - Mar 21, 2026
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={item.week} className="flex gap-4">
                  {/* Timeline Dot */}
                  <div className="relative hidden md:block">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      index === 0 ? 'bg-primary text-primary-foreground glow-effect' : 'bg-muted border border-border'
                    }`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">{item.week}</Badge>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      <span className="font-semibold text-sm">{item.phase}</span>
                    </div>
                    <ul className="space-y-1 mb-2">
                      {item.tasks.map((task) => (
                        <li key={task} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                          {task}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-primary font-medium">
                      Deliverable: {item.deliverable}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 2 Note */}
          <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Phase 2 (Optional):</strong> After MVP launch, we can add full GHL integration, admin analytics, and additional inspection templates. This keeps the MVP focused and ships faster.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card className="glass-card border-border/50 overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-lg">Relevant Experience</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-4">
            I've built systems with the exact patterns this project needs:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div
                key={project.name}
                className="p-4 rounded-lg bg-muted/20 border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                    {project.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm truncate">{project.name}</h4>
                      <Badge variant="outline" className="text-xs shrink-0">{project.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <p className="text-xs text-primary font-medium">{project.relevance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Why Me */}
      <Card className="glass-card border-border/50 overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-lg">Why Work With Me</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">I understand your requirements</p>
                <p className="text-xs text-muted-foreground">This proposal answers your specific questions, not generic boilerplate</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">I've built this exact pattern before</p>
                <p className="text-xs text-muted-foreground">Multi-tenant SaaS with PDF generation and CRM sync</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">I focus on the MVP</p>
                <p className="text-xs text-muted-foreground">No over-engineering. Ship fast, iterate based on real usage</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">Clear communication</p>
                <p className="text-xs text-muted-foreground">Weekly updates, async-friendly, documented decisions</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="glass-card border-primary/30 glow-effect overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Let's Discuss</h2>
            <p className="text-muted-foreground text-sm">
              Happy to do a quick call to discuss architecture or answer questions
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            {/* Name */}
            <h3 className="text-xl font-semibold">Humam Al Rubaye</h3>

            {/* Contact Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a href="mailto:humameu4@gmail.com">
                  <Mail className="w-4 h-4" />
                  humameu4@gmail.com
                </a>
              </Button>
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a href="tel:518-965-9700">
                  <Phone className="w-4 h-4" />
                  518-965-9700
                </a>
              </Button>
            </div>

            <Separator className="w-24" />

            {/* Social Links */}
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="h-10 w-10" asChild>
                <a href="https://linkedin.com/in/humam-alrubaye" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10" asChild>
                <a href="https://github.com/HumamAl" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
