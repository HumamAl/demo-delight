import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
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
  AlertTriangle,
  Loader2,
  Wifi,
  WifiOff,
  RefreshCw
} from "lucide-react";

interface InspectionItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: "pending" | "pass" | "fail" | "na";
  notes: string;
  photos: string[];
  photoLabels: string[];
}

const initialItems: InspectionItem[] = [
  {
    id: "1",
    name: "Water Heater Condition",
    description: "Check for corrosion, leaks, and proper venting",
    icon: <ThermometerSun className="w-4 h-4" />,
    status: "pending",
    notes: "",
    photos: [],
    photoLabels: []
  },
  {
    id: "2",
    name: "Pipe Integrity",
    description: "Inspect visible pipes for damage, corrosion, or leaks",
    icon: <Droplets className="w-4 h-4" />,
    status: "pending",
    notes: "",
    photos: [],
    photoLabels: []
  },
  {
    id: "3",
    name: "Water Pressure Test",
    description: "Verify PSI is within 40-80 range at main",
    icon: <Gauge className="w-4 h-4" />,
    status: "pending",
    notes: "",
    photos: [],
    photoLabels: []
  },
  {
    id: "4",
    name: "Drain Function",
    description: "Test all drains for proper flow and check for clogs",
    icon: <Wrench className="w-4 h-4" />,
    status: "pending",
    notes: "",
    photos: [],
    photoLabels: []
  },
  {
    id: "5",
    name: "Fixtures & Faucets",
    description: "Check all fixtures for leaks, proper operation",
    icon: <ClipboardCheck className="w-4 h-4" />,
    status: "pending",
    notes: "",
    photos: [],
    photoLabels: []
  },
];

// More realistic photo placeholders simulating actual field photos
const mockPhotoData = [
  { url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='90'%3E%3Crect fill='%231e293b' width='120' height='90'/%3E%3Crect fill='%23334155' x='10' y='10' width='100' height='70' rx='4'/%3E%3Ctext fill='%2394a3b8' x='60' y='50' text-anchor='middle' font-size='10'%3EBefore%3C/text%3E%3C/svg%3E", label: "Before" },
  { url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='90'%3E%3Crect fill='%231e293b' width='120' height='90'/%3E%3Crect fill='%23334155' x='10' y='10' width='100' height='70' rx='4'/%3E%3Ctext fill='%2394a3b8' x='60' y='50' text-anchor='middle' font-size='10'%3EAfter%3C/text%3E%3C/svg%3E", label: "After" },
];

export function AppDemo() {
  const [items, setItems] = useState<InspectionItem[]>(initialItems);
  const [customerName, setCustomerName] = useState("John Smith");
  const [customerEmail, setCustomerEmail] = useState("john.smith@email.com");
  const [address, setAddress] = useState("123 Main St, Garden Grove, CA 92840");
  const [currentStep, setCurrentStep] = useState<"form" | "review" | "sending" | "complete">("form");
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [sendingProgress, setSendingProgress] = useState(0);
  const { toast } = useToast();

  // Simulate network status
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly toggle "syncing" to show realistic behavior
      if (Math.random() > 0.95) {
        setIsSyncing(true);
        setTimeout(() => setIsSyncing(false), 1500);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateItem = (id: string, updates: Partial<InspectionItem>) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updates } : item));

    // Show toast for status changes
    if (updates.status && updates.status !== "pending") {
      const item = items.find(i => i.id === id);
      const statusText = updates.status === "pass" ? "Passed" : updates.status === "fail" ? "Failed" : "N/A";
      toast({
        title: `${item?.name}`,
        description: `Marked as ${statusText}`,
        duration: 1500,
      });
    }
  };

  const addPhotoToItem = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item && item.photos.length < 2) {
      const photoData = mockPhotoData[item.photos.length];
      updateItem(id, {
        photos: [...item.photos, photoData.url],
        photoLabels: [...item.photoLabels, photoData.label]
      });
      toast({
        title: "Photo Added",
        description: `${photoData.label} photo captured`,
        duration: 1500,
      });
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
  const passedCount = items.filter(i => i.status === "pass").length;
  const failedCount = items.filter(i => i.status === "fail").length;
  const naCount = items.filter(i => i.status === "na").length;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good Condition";
    if (score >= 60) return "Needs Attention";
    return "Requires Repair";
  };

  const handleSubmit = () => {
    setCurrentStep("review");
    toast({
      title: "Report Generated",
      description: "Review before sending to customer",
    });
  };

  const handleSendPdf = async () => {
    setCurrentStep("sending");
    setSendingProgress(0);

    // Simulate PDF generation and sending
    const steps = [
      { progress: 20, message: "Generating PDF..." },
      { progress: 45, message: "Uploading photos..." },
      { progress: 70, message: "Sending email..." },
      { progress: 90, message: "Syncing with CRM..." },
      { progress: 100, message: "Complete!" },
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setSendingProgress(step.progress);
    }

    await new Promise(resolve => setTimeout(resolve, 400));
    setCurrentStep("complete");
    toast({
      title: "Success!",
      description: "Report sent to customer",
    });
  };

  const resetDemo = () => {
    setItems(initialItems);
    setCurrentStep("form");
    setActiveItemId(null);
    setSendingProgress(0);
    toast({
      title: "Demo Reset",
      description: "Ready for new inspection",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 animate-fade-in">
      {/* Phone Frame */}
      <div className="relative mx-auto glass-card rounded-[2.5rem] p-2 glow-effect">
        <div className="bg-background rounded-[2rem] overflow-hidden min-h-[600px]">
          {/* Status Bar */}
          <div className="flex items-center justify-between px-6 py-2 bg-muted/50">
            <span className="text-xs text-muted-foreground">9:41 AM</span>
            <div className="flex items-center gap-2">
              {isSyncing ? (
                <RefreshCw className="w-3 h-3 text-primary animate-spin" />
              ) : isOnline ? (
                <Wifi className="w-3 h-3 text-success" />
              ) : (
                <WifiOff className="w-3 h-3 text-destructive" />
              )}
              <div className="w-5 h-2.5 bg-success rounded-sm relative">
                <div className="absolute right-0 top-0.5 w-0.5 h-1.5 bg-success rounded-r-sm translate-x-0.5" />
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="px-4 py-3 border-b border-border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-foreground">Field Inspection</h2>
                <p className="text-xs text-muted-foreground">PlumbPro MVP Demo</p>
              </div>
              <Badge variant="outline" className={`text-xs ${
                currentStep === "form" ? "text-primary border-primary" :
                currentStep === "review" ? "text-warning border-warning" :
                currentStep === "sending" ? "text-info border-info" :
                "text-success border-success"
              }`}>
                {currentStep === "form" ? "In Progress" :
                 currentStep === "review" ? "Review" :
                 currentStep === "sending" ? "Sending..." :
                 "Complete"}
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
                      <Label className="text-xs text-muted-foreground">Email</Label>
                      <Input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
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
                    <span className="text-primary font-medium">{completedCount}/{items.length} items</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  {completedCount > 0 && (
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span className="text-success">{passedCount} passed</span>
                      {failedCount > 0 && <span className="text-destructive">{failedCount} failed</span>}
                      {naCount > 0 && <span>{naCount} N/A</span>}
                    </div>
                  )}
                </div>

                {/* Inspection Items */}
                <div className="space-y-2">
                  {items.map((item) => (
                    <Card
                      key={item.id}
                      className={`glass-card border-border/50 cursor-pointer transition-all ${
                        activeItemId === item.id ? 'ring-1 ring-primary' : ''
                      } ${
                        item.status === "pass" ? 'border-l-2 border-l-success' :
                        item.status === "fail" ? 'border-l-2 border-l-destructive' :
                        item.status === "na" ? 'border-l-2 border-l-muted' : ''
                      }`}
                      onClick={() => setActiveItemId(activeItemId === item.id ? null : item.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className={`p-1.5 rounded-md ${
                              item.status === "pass" ? 'bg-success/20' :
                              item.status === "fail" ? 'bg-destructive/20' :
                              'bg-muted'
                            }`}>
                              {item.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-medium block truncate">{item.name}</span>
                              {activeItemId !== item.id && (
                                <span className="text-xs text-muted-foreground truncate block">{item.description}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 ml-2">
                            {item.photos.length > 0 && (
                              <Badge variant="secondary" className="text-xs px-1.5">
                                <Camera className="w-3 h-3 mr-1" />
                                {item.photos.length}
                              </Badge>
                            )}
                            {item.status === "pass" && <CheckCircle2 className="w-5 h-5 text-success" />}
                            {item.status === "fail" && <X className="w-5 h-5 text-destructive" />}
                            {item.status === "na" && <span className="text-xs text-muted-foreground font-medium">N/A</span>}
                          </div>
                        </div>

                        {activeItemId === item.id && (
                          <div className="mt-3 pt-3 border-t border-border/50 space-y-3 animate-fade-in">
                            <p className="text-xs text-muted-foreground">{item.description}</p>

                            {/* Status Buttons */}
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant={item.status === "pass" ? "default" : "outline"}
                                className={`flex-1 h-9 ${item.status === "pass" ? "bg-success hover:bg-success/90" : ""}`}
                                onClick={(e) => { e.stopPropagation(); updateItem(item.id, { status: "pass" }); }}
                              >
                                <CheckCircle2 className="w-3 h-3 mr-1" /> Pass
                              </Button>
                              <Button
                                size="sm"
                                variant={item.status === "fail" ? "destructive" : "outline"}
                                className="flex-1 h-9"
                                onClick={(e) => { e.stopPropagation(); updateItem(item.id, { status: "fail" }); }}
                              >
                                <AlertTriangle className="w-3 h-3 mr-1" /> Fail
                              </Button>
                              <Button
                                size="sm"
                                variant={item.status === "na" ? "secondary" : "outline"}
                                className="h-9 px-3"
                                onClick={(e) => { e.stopPropagation(); updateItem(item.id, { status: "na" }); }}
                              >
                                N/A
                              </Button>
                            </div>

                            {/* Notes */}
                            <Textarea
                              placeholder="Add inspection notes..."
                              value={item.notes}
                              onChange={(e) => updateItem(item.id, { notes: e.target.value })}
                              className="h-16 text-sm bg-input border-border/50"
                              onClick={(e) => e.stopPropagation()}
                            />

                            {/* Photos */}
                            <div>
                              <Label className="text-xs text-muted-foreground mb-2 block">
                                Photos ({item.photos.length}/2)
                              </Label>
                              <div className="flex items-center gap-2">
                                {item.photos.map((photo, idx) => (
                                  <div key={idx} className="relative">
                                    <img src={photo} alt={`Photo ${idx + 1}`} className="w-14 h-14 rounded-md object-cover bg-muted" />
                                    <Badge variant="secondary" className="absolute -bottom-1 -right-1 text-[10px] px-1 py-0">
                                      {item.photoLabels[idx]}
                                    </Badge>
                                  </div>
                                ))}
                                {item.photos.length < 2 && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-14 h-14 p-0 border-dashed"
                                    onClick={(e) => { e.stopPropagation(); addPhotoToItem(item.id); }}
                                  >
                                    <Camera className="w-5 h-5" />
                                  </Button>
                                )}
                              </div>
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
                  {completedCount < items.length
                    ? `Complete ${items.length - completedCount} more items`
                    : "Generate Report"
                  }
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
                    <p className="text-sm text-muted-foreground mt-2">{getScoreLabel(score)}</p>
                    <div className="flex justify-center gap-4 mt-3 text-xs">
                      <span className="text-success">{passedCount} passed</span>
                      {failedCount > 0 && <span className="text-destructive">{failedCount} failed</span>}
                      {naCount > 0 && <span className="text-muted-foreground">{naCount} N/A</span>}
                    </div>
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
                        <span className="text-muted-foreground">Email</span>
                        <span className="font-medium text-xs">{customerEmail}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-2">
                        <span className="text-muted-foreground">Address</span>
                        <span className="font-medium text-right text-xs max-w-[150px]">{address}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-2">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium">{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-2">
                        <span className="text-muted-foreground">Technician</span>
                        <span className="font-medium">Demo Tech</span>
                      </div>
                      <div className="pt-2 space-y-1.5">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">INSPECTION ITEMS</p>
                        {items.map(item => (
                          <div key={item.id} className="flex justify-between items-center text-xs py-1 border-b border-border/30 last:border-0">
                            <span className="text-muted-foreground">{item.name}</span>
                            <div className="flex items-center gap-2">
                              {item.photos.length > 0 && (
                                <Camera className="w-3 h-3 text-muted-foreground" />
                              )}
                              <span className={`font-medium ${
                                item.status === "pass" ? "text-success" :
                                item.status === "fail" ? "text-destructive" :
                                "text-muted-foreground"
                              }`}>
                                {item.status.toUpperCase()}
                              </span>
                            </div>
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
                    Email PDF to {customerName.split(' ')[0]}
                  </Button>
                  <Button variant="outline" className="w-full h-10" onClick={() => setCurrentStep("form")}>
                    Back to Edit
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "sending" && (
              <div className="space-y-6 py-12 text-center animate-slide-up">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Processing Report</h3>
                  <p className="text-sm text-muted-foreground">
                    {sendingProgress < 25 && "Generating PDF..."}
                    {sendingProgress >= 25 && sendingProgress < 50 && "Uploading photos to S3..."}
                    {sendingProgress >= 50 && sendingProgress < 75 && "Sending email..."}
                    {sendingProgress >= 75 && sendingProgress < 100 && "Syncing with GoHighLevel..."}
                    {sendingProgress === 100 && "Complete!"}
                  </p>
                </div>
                <div className="px-8">
                  <Progress value={sendingProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">{sendingProgress}%</p>
                </div>
              </div>
            )}

            {currentStep === "complete" && (
              <div className="space-y-6 py-8 text-center animate-slide-up">
                <div className="w-20 h-20 mx-auto rounded-full bg-success/20 flex items-center justify-center glow-effect">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Report Sent!</h3>
                  <p className="text-sm text-muted-foreground">
                    PDF inspection report emailed to {customerEmail}
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
                          <p className="text-sm font-medium">inspection_{customerName.toLowerCase().replace(' ', '_')}.pdf</p>
                          <p className="text-xs text-muted-foreground">Sent to {customerEmail}</p>
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
                          <p className="text-sm font-medium">CRM Contact Updated</p>
                          <p className="text-xs text-muted-foreground">Score & PDF synced to GHL</p>
                        </div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </CardContent>
                  </Card>
                  <Card className="glass-card border-border/50">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-primary/20">
                          <Star className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium">Inspection Score: {score}%</p>
                          <p className="text-xs text-muted-foreground">{getScoreLabel(score)}</p>
                        </div>
                      </div>
                      <Badge variant={score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive"} className={score >= 80 ? "bg-success" : ""}>
                        {score}%
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
                <Button variant="outline" className="mt-4" onClick={resetDemo}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Start New Inspection
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Demo Instructions */}
      <div className="text-center space-y-1 px-4">
        <p className="text-xs text-muted-foreground">
          Interactive demo: Tap items to inspect, mark pass/fail, add photos & notes.
        </p>
        <p className="text-xs text-primary">
          All data is simulated - no real backend calls
        </p>
      </div>
    </div>
  );
}
