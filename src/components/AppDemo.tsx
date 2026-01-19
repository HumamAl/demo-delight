import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Camera, 
  Upload, 
  FileText, 
  Send, 
  CheckCircle2, 
  Wrench,
  Droplets,
  Gauge,
  ThermometerSun,
  ClipboardCheck,
  Star,
  X,
  AlertTriangle
} from "lucide-react";

interface InspectionItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: "pending" | "pass" | "fail" | "na";
  notes: string;
  photos: string[];
}

const initialItems: InspectionItem[] = [
  { id: "1", name: "Water Heater Condition", icon: <ThermometerSun className="w-4 h-4" />, status: "pending", notes: "", photos: [] },
  { id: "2", name: "Pipe Integrity", icon: <Droplets className="w-4 h-4" />, status: "pending", notes: "", photos: [] },
  { id: "3", name: "Water Pressure", icon: <Gauge className="w-4 h-4" />, status: "pending", notes: "", photos: [] },
  { id: "4", name: "Drain Function", icon: <Wrench className="w-4 h-4" />, status: "pending", notes: "", photos: [] },
  { id: "5", name: "Fixtures Check", icon: <ClipboardCheck className="w-4 h-4" />, status: "pending", notes: "", photos: [] },
];

const mockPhotos = [
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23334155' width='100' height='100'/%3E%3Ctext fill='%2394a3b8' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='12'%3EPhoto 1%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23334155' width='100' height='100'/%3E%3Ctext fill='%2394a3b8' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='12'%3EPhoto 2%3C/text%3E%3C/svg%3E",
];

export function AppDemo() {
  const [items, setItems] = useState<InspectionItem[]>(initialItems);
  const [customerName, setCustomerName] = useState("John Smith");
  const [address, setAddress] = useState("123 Main St, Garden Grove, CA");
  const [currentStep, setCurrentStep] = useState<"form" | "review" | "complete">("form");
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const updateItem = (id: string, updates: Partial<InspectionItem>) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const addPhotoToItem = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item && item.photos.length < 2) {
      updateItem(id, { photos: [...item.photos, mockPhotos[item.photos.length]] });
    }
  };

  const calculateScore = () => {
    const scored = items.filter(i => i.status !== "pending" && i.status !== "na");
    const passed = items.filter(i => i.status === "pass").length;
    if (scored.length === 0) return 0;
    return Math.round((passed / scored.length) * 100);
  };

  const completedCount = items.filter(i => i.status !== "pending").length;
  const progress = (completedCount / items.length) * 100;
  const score = calculateScore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const handleSubmit = () => {
    setCurrentStep("review");
  };

  const handleSendPdf = () => {
    setCurrentStep("complete");
  };

  const resetDemo = () => {
    setItems(initialItems);
    setCurrentStep("form");
    setActiveItemId(null);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 animate-fade-in">
      {/* Phone Frame */}
      <div className="relative mx-auto glass-card rounded-[2.5rem] p-2 glow-effect">
        <div className="bg-background rounded-[2rem] overflow-hidden min-h-[600px]">
          {/* Status Bar */}
          <div className="flex items-center justify-between px-6 py-2 bg-muted/50">
            <span className="text-xs text-muted-foreground">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 bg-primary rounded-sm" />
            </div>
          </div>

          {/* Header */}
          <div className="px-4 py-3 border-b border-border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-foreground">Field Inspection</h2>
                <p className="text-xs text-muted-foreground">PlumbPro MVP Demo</p>
              </div>
              <Badge variant="outline" className="text-primary border-primary">
                {currentStep === "form" ? "In Progress" : currentStep === "review" ? "Review" : "Complete"}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
            {currentStep === "form" && (
              <>
                {/* Customer Info */}
                <Card className="glass-card border-border/50">
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Customer Info</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4 space-y-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Name</Label>
                      <Input 
                        value={customerName} 
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="h-9 bg-input border-border/50"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Address</Label>
                      <Input 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)}
                        className="h-9 bg-input border-border/50"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Inspection Progress</span>
                    <span className="text-primary font-medium">{completedCount}/{items.length}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Inspection Items */}
                <div className="space-y-2">
                  {items.map((item) => (
                    <Card 
                      key={item.id} 
                      className={`glass-card border-border/50 cursor-pointer transition-all ${activeItemId === item.id ? 'ring-1 ring-primary' : ''}`}
                      onClick={() => setActiveItemId(activeItemId === item.id ? null : item.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-md bg-muted">
                              {item.icon}
                            </div>
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {item.photos.length > 0 && (
                              <Badge variant="secondary" className="text-xs px-1.5">
                                <Camera className="w-3 h-3 mr-1" />
                                {item.photos.length}
                              </Badge>
                            )}
                            {item.status === "pass" && <CheckCircle2 className="w-5 h-5 text-success" />}
                            {item.status === "fail" && <X className="w-5 h-5 text-destructive" />}
                            {item.status === "na" && <span className="text-xs text-muted-foreground">N/A</span>}
                          </div>
                        </div>

                        {activeItemId === item.id && (
                          <div className="mt-3 pt-3 border-t border-border/50 space-y-3 animate-fade-in">
                            {/* Status Buttons */}
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant={item.status === "pass" ? "default" : "outline"}
                                className="flex-1 h-8"
                                onClick={(e) => { e.stopPropagation(); updateItem(item.id, { status: "pass" }); }}
                              >
                                <CheckCircle2 className="w-3 h-3 mr-1" /> Pass
                              </Button>
                              <Button 
                                size="sm" 
                                variant={item.status === "fail" ? "destructive" : "outline"}
                                className="flex-1 h-8"
                                onClick={(e) => { e.stopPropagation(); updateItem(item.id, { status: "fail" }); }}
                              >
                                <AlertTriangle className="w-3 h-3 mr-1" /> Fail
                              </Button>
                              <Button 
                                size="sm" 
                                variant={item.status === "na" ? "secondary" : "outline"}
                                className="h-8 px-3"
                                onClick={(e) => { e.stopPropagation(); updateItem(item.id, { status: "na" }); }}
                              >
                                N/A
                              </Button>
                            </div>

                            {/* Notes */}
                            <Textarea 
                              placeholder="Add notes..."
                              value={item.notes}
                              onChange={(e) => updateItem(item.id, { notes: e.target.value })}
                              className="h-16 text-sm bg-input border-border/50"
                              onClick={(e) => e.stopPropagation()}
                            />

                            {/* Photos */}
                          <div className="flex items-center gap-2">
                            {item.photos.map((photo, idx) => (
                              <img key={idx} src={photo} alt={`Photo ${idx + 1}`} className="w-12 h-12 rounded-md object-cover bg-muted" />
                            ))}
                            {item.photos.length < 2 && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="w-12 h-12 p-0"
                                onClick={(e) => { e.stopPropagation(); addPhotoToItem(item.id); }}
                              >
                                <Camera className="w-4 h-4" />
                              </Button>
                            )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Submit Button */}
                <Button 
                  className="w-full h-12 glow-effect" 
                  onClick={handleSubmit}
                  disabled={completedCount < items.length}
                >
                  <ClipboardCheck className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </>
            )}

            {currentStep === "review" && (
              <div className="space-y-4 animate-slide-up">
                {/* Score Card */}
                <Card className="glass-card border-primary/30 glow-effect">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="w-6 h-6 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">Inspection Score</span>
                    </div>
                    <div className={`text-5xl font-bold ${getScoreColor(score)}`}>
                      {score}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {score >= 80 ? "Excellent Condition" : score >= 60 ? "Needs Attention" : "Requires Repair"}
                    </p>
                  </CardContent>
                </Card>

                {/* PDF Preview */}
                <Card className="glass-card border-border/50">
                  <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">PDF Preview</CardTitle>
                    <FileText className="w-4 h-4 text-primary" />
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="bg-muted/50 rounded-lg p-4 space-y-3 text-sm">
                      <div className="flex justify-between border-b border-border/50 pb-2">
                        <span className="text-muted-foreground">Customer</span>
                        <span className="font-medium">{customerName}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-2">
                        <span className="text-muted-foreground">Address</span>
                        <span className="font-medium text-right text-xs">{address}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-2">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium">{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Items Checked</span>
                        <span className="font-medium">{items.length}</span>
                      </div>
                      <div className="pt-2 space-y-1">
                        {items.map(item => (
                          <div key={item.id} className="flex justify-between text-xs">
                            <span className="text-muted-foreground">{item.name}</span>
                            <span className={
                              item.status === "pass" ? "text-success" : 
                              item.status === "fail" ? "text-destructive" : 
                              "text-muted-foreground"
                            }>
                              {item.status.toUpperCase()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button className="w-full h-12 glow-effect" onClick={handleSendPdf}>
                    <Send className="w-4 h-4 mr-2" />
                    Email PDF to Customer
                  </Button>
                  <Button variant="outline" className="w-full h-10" onClick={() => setCurrentStep("form")}>
                    Back to Edit
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "complete" && (
              <div className="space-y-6 py-8 text-center animate-slide-up">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center glow-effect">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Report Sent!</h3>
                  <p className="text-sm text-muted-foreground">
                    PDF inspection report has been emailed to {customerName} and synced with GoHighLevel CRM.
                  </p>
                </div>
                <div className="space-y-3 pt-4">
                  <Card className="glass-card border-border/50">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-success/20">
                          <FileText className="w-4 h-4 text-success" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium">inspection_report.pdf</p>
                          <p className="text-xs text-muted-foreground">Sent to customer</p>
                        </div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </CardContent>
                  </Card>
                  <Card className="glass-card border-border/50">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-info/20">
                          <Upload className="w-4 h-4 text-info" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium">GHL Contact Updated</p>
                          <p className="text-xs text-muted-foreground">Custom fields synced</p>
                        </div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </CardContent>
                  </Card>
                </div>
                <Button variant="outline" className="mt-4" onClick={resetDemo}>
                  Start New Inspection
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Demo Instructions */}
      <p className="text-center text-xs text-muted-foreground px-4">
        Interactive demo: Tap items to inspect, mark pass/fail, add photos & notes.
      </p>
    </div>
  );
}
