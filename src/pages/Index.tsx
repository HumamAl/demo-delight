import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppDemo } from "@/components/AppDemo";
import { Challenges } from "@/components/Challenges";
import { Proposal } from "@/components/Proposal";
import { 
  Smartphone, 
  AlertTriangle, 
  FileText,
  Wrench
} from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("app");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 glow-effect">
                <Wrench className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-lg">PlumbPro MVP</h1>
                <p className="text-xs text-muted-foreground">Project Proposal</p>
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">Humam Al Rubaye</p>
              <p className="text-xs text-muted-foreground">Full-Stack Developer</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 py-6 md:py-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 h-12 mb-8 bg-muted/50">
            <TabsTrigger 
              value="app" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">App</span>
            </TabsTrigger>
            <TabsTrigger 
              value="challenges" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">Challenges</span>
            </TabsTrigger>
            <TabsTrigger 
              value="proposal" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Proposal</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="app" className="mt-0">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                <span className="gradient-text">Interactive Demo</span>
              </h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
                Experience the mobile field inspection form. Tap items to mark pass/fail, add photos, and generate PDF reports.
              </p>
            </div>
            <AppDemo />
          </TabsContent>

          <TabsContent value="challenges" className="mt-0">
            <Challenges />
          </TabsContent>

          <TabsContent value="proposal" className="mt-0">
            <Proposal />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 mt-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>Built with React, TypeScript, Tailwind, shadcn/ui</p>
            <p>© 2024 Humam Al Rubaye</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
