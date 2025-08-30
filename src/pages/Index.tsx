import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [websiteUrl, setWebsiteUrl] = useState("https://www.google.com");
  const [currentUrl, setCurrentUrl] = useState("https://www.google.com");

  const handleLoadWebsite = () => {
    setCurrentUrl(websiteUrl);
  };

  return (
    <div className="h-screen bg-background">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={40} minSize={30}>
          <Card className="h-full rounded-none border-0 border-r">
            <CardHeader>
              <CardTitle>Website Panel</CardTitle>
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="Enter website URL..."
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLoadWebsite()}
                />
                <Button onClick={handleLoadWebsite}>Load</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-full">
              <iframe
                src={currentUrl}
                className="w-full h-full border-0"
                title="Website Panel"
                sandbox="allow-scripts allow-same-origin allow-forms allow-top-navigation"
              />
            </CardContent>
          </Card>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Welcome to Your App</h1>
              <p className="text-xl text-muted-foreground mb-4">
                Use the left panel to browse websites while working on your app.
              </p>
              <p className="text-sm text-muted-foreground">
                Drag the handle between panels to resize them.
              </p>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Index;
