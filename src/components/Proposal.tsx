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
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Globe,
  Store,
  Sparkles
} from "lucide-react";

const timeline = [
  { week: "Week 1-2", phase: "Foundation", tasks: ["Database schema + RLS", "API architecture", "Mobile form UI shell"] },
  { week: "Week 3-4", phase: "Core Features", tasks: ["Inspection form logic", "Photo capture & storage", "Scoring engine"] },
  { week: "Week 5-6", phase: "PDF & Integration", tasks: ["PDF template + generation", "Email service", "GHL API sync"] },
  { week: "Week 7-8", phase: "Polish & Deploy", tasks: ["Admin dashboard basics", "Testing & bug fixes", "Production deployment"] },
];

const projects = [
  {
    name: "Marlo AI",
    type: "iOS App",
    description: "AI-powered companion app with conversational interface and personalization features.",
    icon: <Smartphone className="w-5 h-5" />,
    tags: ["iOS", "Swift", "AI/ML"]
  },
  {
    name: "QuantBook",
    type: "Web Platform",
    description: "Financial analytics platform with real-time data visualization and portfolio tracking.",
    icon: <Globe className="w-5 h-5" />,
    tags: ["React", "Python", "PostgreSQL"]
  },
  {
    name: "MapCanvas.store",
    type: "E-commerce",
    description: "Custom map art e-commerce platform with dynamic product generation.",
    icon: <Store className="w-5 h-5" />,
    tags: ["Next.js", "Stripe", "Canvas API"]
  },
  {
    name: "Cleaning Business Tools",
    type: "SaaS Suite",
    description: "Scheduling, invoicing, and client management tools for service businesses.",
    icon: <Sparkles className="w-5 h-5" />,
    tags: ["React", "Node.js", "Multi-tenant"]
  }
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
            <CardTitle className="text-lg">Understanding Your Problem</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            You're building a <strong className="text-foreground">scalable MVP for plumbing field technicians</strong> that captures structured job data on-site and generates branded PDF reports with photos and scoring. This isn't a Zapier automation—it's a <strong className="text-foreground">real backend system</strong> that needs to work reliably at scale.
          </p>
          <div className="grid md:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">Multi-client from Day 1</p>
                <p className="text-xs text-muted-foreground">Architecture that scales to hundreds of businesses</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">Database as Source of Truth</p>
                <p className="text-xs text-muted-foreground">CRM is secondary, not primary data store</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">Pixel-Perfect PDFs</p>
                <p className="text-xs text-muted-foreground">Photos in correct sections, consistent layouts</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">Mobile-First Field Experience</p>
                <p className="text-xs text-muted-foreground">Works on tablets in the field, slow networks</p>
              </div>
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
            <CardTitle className="text-lg">Solution Approach</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <h4 className="font-semibold text-sm mb-2">Frontend</h4>
              <p className="text-xs text-muted-foreground mb-3">React PWA with offline support</p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">React</Badge>
                <Badge variant="outline" className="text-xs">TypeScript</Badge>
                <Badge variant="outline" className="text-xs">Tailwind</Badge>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <h4 className="font-semibold text-sm mb-2">Backend</h4>
              <p className="text-xs text-muted-foreground mb-3">Node.js API with PostgreSQL</p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">Node.js</Badge>
                <Badge variant="outline" className="text-xs">PostgreSQL</Badge>
                <Badge variant="outline" className="text-xs">S3</Badge>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <h4 className="font-semibold text-sm mb-2">Services</h4>
              <p className="text-xs text-muted-foreground mb-3">PDF gen, email, CRM sync</p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">Puppeteer</Badge>
                <Badge variant="outline" className="text-xs">SendGrid</Badge>
                <Badge variant="outline" className="text-xs">GHL API</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="glass-card border-border/50 overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-lg">6-8 Week Timeline</CardTitle>
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
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">{item.week}</Badge>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      <span className="font-semibold text-sm">{item.phase}</span>
                    </div>
                    <ul className="space-y-1">
                      {item.tasks.map((task) => (
                        <li key={task} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
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
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div 
                key={project.name} 
                className="p-4 rounded-lg bg-muted/20 border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {project.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm truncate">{project.name}</h4>
                      <Badge variant="outline" className="text-xs shrink-0">{project.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="glass-card border-primary/30 glow-effect overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Let's Build This Together</h2>
            <p className="text-muted-foreground text-sm">
              Ready to discuss the project in detail
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
