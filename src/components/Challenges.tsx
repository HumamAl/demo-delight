import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Database, 
  FileText, 
  Users, 
  Zap,
  CheckCircle2,
  XCircle,
  Lightbulb
} from "lucide-react";

interface Challenge {
  id: string;
  problem: string;
  icon: React.ReactNode;
  whyTeamsFail: string;
  mySolution: string;
  techUsed: string[];
}

const challenges: Challenge[] = [
  {
    id: "1",
    problem: "Multi-tenant database architecture",
    icon: <Database className="w-5 h-5" />,
    whyTeamsFail: "Build single-tenant first, painful rewrites later. Or over-engineer with complex sharding from day one.",
    mySolution: "Row-level security with tenant_id from the start. Simple to implement, scales to thousands of clients without schema changes.",
    techUsed: ["PostgreSQL RLS", "Supabase", "Tenant Context"]
  },
  {
    id: "2",
    problem: "Pixel-perfect PDF generation",
    icon: <FileText className="w-5 h-5" />,
    whyTeamsFail: "Use basic HTML-to-PDF libraries that break layouts, misplace photos, and produce inconsistent results across devices.",
    mySolution: "Puppeteer with templated HTML/CSS. Precise control over page breaks, photo placement, and consistent rendering.",
    techUsed: ["Puppeteer", "HTML Templates", "S3 Storage"]
  },
  {
    id: "3",
    problem: "Photo placement in specific sections",
    icon: <Zap className="w-5 h-5" />,
    whyTeamsFail: "Photos dumped at end of document, or basic grid layouts. No context linking photos to inspection items.",
    mySolution: "Photos tagged with section IDs, rendered inline with their inspection items. 'Before Photos' section auto-generated.",
    techUsed: ["Metadata Tagging", "Template Engine", "Lazy Loading"]
  },
  {
    id: "4",
    problem: "GoHighLevel CRM integration",
    icon: <Users className="w-5 h-5" />,
    whyTeamsFail: "Make GHL the source of truth. Data inconsistencies when GHL API is slow or fields change. Tight coupling breaks features.",
    mySolution: "Database is source of truth. GHL sync is async, one-way push. Decoupled architecture means CRM changes don't break core app.",
    techUsed: ["REST API", "Webhook Queues", "Retry Logic"]
  },
  {
    id: "5",
    problem: "Mobile-first field experience",
    icon: <AlertTriangle className="w-5 h-5" />,
    whyTeamsFail: "Desktop app 'scaled down' to mobile. Tiny buttons, horizontal scrolling, slow on 3G, no offline capability.",
    mySolution: "PWA designed mobile-first. Large touch targets, offline-capable forms, camera integration, works on slow networks.",
    techUsed: ["React PWA", "Service Workers", "IndexedDB"]
  }
];

export function Challenges() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Project Challenges</h2>
        <p className="text-muted-foreground">
          Key technical challenges for this MVP and how I'd approach them
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-hidden glass-card rounded-xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-primary" />
                  Problem
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  Why Teams Fail
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-warning" />
                  My Solution
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Tech Used
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {challenges.map((challenge, index) => (
              <tr 
                key={challenge.id} 
                className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${index % 2 === 0 ? 'bg-muted/10' : ''}`}
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {challenge.icon}
                    </div>
                    <span className="font-medium text-sm">{challenge.problem}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {challenge.whyTeamsFail}
                  </p>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm text-foreground leading-relaxed">
                    {challenge.mySolution}
                  </p>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-1.5">
                    {challenge.techUsed.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="text-xs font-normal"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="glass-card border-border/50 overflow-hidden">
            <CardContent className="p-0">
              {/* Header */}
              <div className="flex items-center gap-3 p-4 bg-muted/30 border-b border-border/50">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {challenge.icon}
                </div>
                <h3 className="font-medium text-sm">{challenge.problem}</h3>
              </div>
              
              {/* Content */}
              <div className="p-4 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4 text-destructive" />
                    <span className="text-xs font-semibold text-destructive uppercase tracking-wide">Why Teams Fail</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{challenge.whyTeamsFail}</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-warning" />
                    <span className="text-xs font-semibold text-warning uppercase tracking-wide">My Solution</span>
                  </div>
                  <p className="text-sm text-foreground">{challenge.mySolution}</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="text-xs font-semibold text-success uppercase tracking-wide">Tech Used</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {challenge.techUsed.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="text-xs font-normal"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
