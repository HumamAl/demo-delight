import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Database,
  FileText,
  Image,
  Users,
  Smartphone,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Code2,
  ChevronDown,
  ChevronUp,
  Shield,
  Zap
} from "lucide-react";

interface Challenge {
  id: string;
  problem: string;
  icon: React.ReactNode;
  clientConcern: string;
  whyTeamsFail: string;
  mySolution: string;
  techUsed: string[];
  codeSnippet?: {
    language: string;
    code: string;
    description: string;
  };
}

const challenges: Challenge[] = [
  {
    id: "1",
    problem: "Multi-tenant database architecture",
    icon: <Database className="w-5 h-5" />,
    clientConcern: "How would you structure this system to support multiple clients later?",
    whyTeamsFail: "Build single-tenant first, then face painful rewrites. Or over-engineer with complex sharding that delays MVP by months.",
    mySolution: "Row-level security (RLS) with tenant_id from day one. Every table includes org_id, and PostgreSQL enforces isolation automatically. Zero code changes needed to onboard client #2 or #200.",
    techUsed: ["PostgreSQL RLS", "Supabase", "JWT Claims"],
    codeSnippet: {
      language: "sql",
      description: "Automatic tenant isolation - every query is filtered",
      code: `-- Enable RLS on inspections table
ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;

-- Policy: Users only see their organization's data
CREATE POLICY tenant_isolation ON inspections
  USING (org_id = current_setting('app.org_id')::uuid);

-- Set context on each request (middleware)
SET app.org_id = 'client-uuid-here';`
    }
  },
  {
    id: "2",
    problem: "Pixel-perfect PDF generation",
    icon: <FileText className="w-5 h-5" />,
    clientConcern: "How would you generate PDFs with photos placed in specific sections?",
    whyTeamsFail: "Use jsPDF or basic HTML-to-PDF libraries that break layouts, misalign photos, and produce inconsistent results. Client complains 'this doesn't look professional.'",
    mySolution: "Puppeteer renders a templated HTML page with full CSS support. Photos are pre-sized and positioned exactly where they belong. Page breaks are controlled with CSS. Output is identical every time.",
    techUsed: ["Puppeteer", "Handlebars", "CSS @page"],
    codeSnippet: {
      language: "typescript",
      description: "PDF generation with Puppeteer - pixel-perfect output",
      code: `async function generatePDF(inspection: Inspection) {
  // Render HTML template with inspection data
  const html = await renderTemplate('report.hbs', {
    ...inspection,
    beforePhotos: inspection.photos.filter(p => p.section === 'before'),
    afterPhotos: inspection.photos.filter(p => p.section === 'after'),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  return page.pdf({ format: 'Letter', printBackground: true });
}`
    }
  },
  {
    id: "3",
    problem: "Photo placement in specific sections",
    icon: <Image className="w-5 h-5" />,
    clientConcern: "Photos must appear in specific sections (e.g. 'Before Photos')",
    whyTeamsFail: "Photos dumped at the end of the document in a generic gallery. No context about which inspection item they relate to. Technicians waste time re-organizing.",
    mySolution: "Each photo is tagged with section ('before', 'after', 'issue') and linked to its inspection item. Template groups photos by section and renders them inline with context.",
    techUsed: ["S3 Metadata", "Handlebars Helpers", "Lazy Loading"],
    codeSnippet: {
      language: "typescript",
      description: "Photo upload with section tagging",
      code: `interface InspectionPhoto {
  id: string;
  inspection_id: string;
  item_id: string;        // Links to specific checklist item
  section: 'before' | 'after' | 'issue';
  s3_key: string;
  caption?: string;
}

// Upload handler tags photo with context
async function uploadPhoto(file: File, context: PhotoContext) {
  const key = \`\${context.org_id}/\${context.inspection_id}/\${context.section}_\${Date.now()}.jpg\`;
  await s3.upload({ Key: key, Body: file, Metadata: context });
  return db.photos.create({ ...context, s3_key: key });
}`
    }
  },
  {
    id: "4",
    problem: "GoHighLevel CRM sync",
    icon: <Users className="w-5 h-5" />,
    clientConcern: "What would you use as source of truth: CRM or database, and why?",
    whyTeamsFail: "Make GHL the source of truth. When GHL API is slow or rate-limited, app breaks. When GHL changes field names, everything breaks. Tight coupling = fragile system.",
    mySolution: "Database is always source of truth. GHL sync is async, one-way push via background jobs. If GHL is down, app works fine and syncs when GHL recovers. CRM is a 'nice to have', not a dependency.",
    techUsed: ["BullMQ", "Retry Logic", "Webhooks"],
    codeSnippet: {
      language: "typescript",
      description: "Decoupled CRM sync - database-first architecture",
      code: `// After inspection completes - add to sync queue
async function onInspectionComplete(inspection: Inspection) {
  // 1. Save to OUR database first (already done)
  // 2. Queue async GHL sync - NEVER block on this
  await syncQueue.add('ghl-sync', {
    action: 'update_contact',
    contactEmail: inspection.customer_email,
    customFields: {
      last_inspection_date: inspection.created_at,
      inspection_score: inspection.score,
      pdf_url: inspection.pdf_url
    }
  }, { attempts: 5, backoff: { type: 'exponential' } });
}`
    }
  },
  {
    id: "5",
    problem: "Mobile-first field experience",
    icon: <Smartphone className="w-5 h-5" />,
    clientConcern: "Mobile-friendly field form (phones/tablets) that works on slow networks",
    whyTeamsFail: "Desktop app 'scaled down' to mobile. Tiny buttons, horizontal scrolling, slow on 3G, completely unusable offline. Technicians hate it.",
    mySolution: "PWA designed mobile-first with large touch targets, offline form submission via IndexedDB, and camera integration. Works in basements with no signal.",
    techUsed: ["React PWA", "Service Workers", "IndexedDB"],
    codeSnippet: {
      language: "typescript",
      description: "Offline-capable form with background sync",
      code: `// Save form data locally when offline
async function saveInspection(data: InspectionData) {
  if (navigator.onLine) {
    return api.post('/inspections', data);
  }

  // Store in IndexedDB for later sync
  await localDB.inspections.add({
    ...data,
    syncStatus: 'pending',
    savedAt: Date.now()
  });

  // Register for background sync when online
  await registration.sync.register('sync-inspections');
}`
    }
  }
];

export function Challenges() {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    if (expandedIds.length === challenges.length) {
      setExpandedIds([]);
    } else {
      setExpandedIds(challenges.map(c => c.id));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Technical Challenges</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your job posting asked specific questions. Here are my answers with code examples.
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={expandAll}
          className="mt-4 text-primary"
        >
          {expandedIds.length === challenges.length ? "Collapse All" : "Show All Code Snippets"}
          {expandedIds.length === challenges.length ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
        </Button>
      </div>

      {/* Key Principles Banner */}
      <Card className="glass-card border-primary/30 glow-effect">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Database = Source of Truth</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>Multi-tenant from Day 1</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-primary" />
              <span>Mobile-first, Offline-capable</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-hidden glass-card rounded-xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  Challenge
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  Common Mistakes
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  My Approach
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground w-36">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-info" />
                  Code
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {challenges.map((challenge, index) => (
              <>
                <tr
                  key={challenge.id}
                  className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${index % 2 === 0 ? 'bg-muted/10' : ''}`}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                        {challenge.icon}
                      </div>
                      <div>
                        <span className="font-medium text-sm block">{challenge.problem}</span>
                        <span className="text-xs text-primary/80 mt-1 block italic">"{challenge.clientConcern}"</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {challenge.whyTeamsFail}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm text-foreground leading-relaxed mb-2">
                      {challenge.mySolution}
                    </p>
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
                  <td className="px-6 py-5">
                    {challenge.codeSnippet && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleExpanded(challenge.id)}
                        className="gap-1"
                      >
                        <Code2 className="w-3 h-3" />
                        {expandedIds.includes(challenge.id) ? "Hide" : "View"}
                      </Button>
                    )}
                  </td>
                </tr>
                {expandedIds.includes(challenge.id) && challenge.codeSnippet && (
                  <tr key={`${challenge.id}-code`} className="bg-muted/20">
                    <td colSpan={4} className="px-6 py-4">
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">{challenge.codeSnippet.description}</p>
                        <pre className="bg-background/80 rounded-lg p-4 overflow-x-auto text-xs">
                          <code className="text-foreground/90">{challenge.codeSnippet.code}</code>
                        </pre>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="glass-card border-border/50 overflow-hidden">
            <CardHeader className="py-4 px-4 bg-muted/30 border-b border-border/50">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  {challenge.icon}
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">{challenge.problem}</CardTitle>
                  <p className="text-xs text-primary/80 mt-1 italic">"{challenge.clientConcern}"</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  <span className="text-xs font-semibold text-destructive uppercase tracking-wide">Common Mistakes</span>
                </div>
                <p className="text-sm text-muted-foreground">{challenge.whyTeamsFail}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="text-xs font-semibold text-success uppercase tracking-wide">My Approach</span>
                </div>
                <p className="text-sm text-foreground">{challenge.mySolution}</p>
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

              {challenge.codeSnippet && (
                <div className="pt-2 border-t border-border/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(challenge.id)}
                    className="w-full justify-between text-primary"
                  >
                    <span className="flex items-center gap-2">
                      <Code2 className="w-4 h-4" />
                      {expandedIds.includes(challenge.id) ? "Hide Code Example" : "View Code Example"}
                    </span>
                    {expandedIds.includes(challenge.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>

                  {expandedIds.includes(challenge.id) && (
                    <div className="mt-3 space-y-2 animate-fade-in">
                      <p className="text-xs text-muted-foreground">{challenge.codeSnippet.description}</p>
                      <pre className="bg-background/80 rounded-lg p-3 overflow-x-auto text-xs">
                        <code className="text-foreground/90">{challenge.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Note */}
      <Card className="glass-card border-border/50">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground">
            These aren't theoretical solutions - they're patterns I've implemented in production systems.
            The code snippets above are simplified but represent the actual architecture I'd use.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
