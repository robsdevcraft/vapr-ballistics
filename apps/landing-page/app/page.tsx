import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Calculator, Zap, Globe } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/50 topo-background">
      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <Image 
              src="/vapr-ballistics.svg" 
              alt="VAPR Ballistics" 
              width={120}
              height={32}
              className="h-8 w-auto transition-opacity hover:opacity-80"
              priority
            />
          </a>
        </div>
        <ThemeToggle />
      </header>
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Free & Open Source • Privacy First
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Open Source Ballistics
            <span className="block text-primary">Built for Privacy</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Free and open-source ballistics calculators under active development. 
            Your data stays on your device. No tracking, no accounts, no compromises.
          </p>
          
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Button size="lg" className="h-12 px-8">
              <Calculator className="mr-2 h-5 w-5" />
              Launch Calculator
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8">
              <Globe className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Open Source Matters</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transparent, community-driven, and always improving. Built by shooters who value privacy and accuracy.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-muted">
            <CardHeader>
              <Target className="h-8 w-8 text-primary mb-2" />
              <CardTitle>100% Free Forever</CardTitle>
              <CardDescription>
                Open source under MIT license. No subscriptions, no paywalls, no premium tiers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Fully open source code</li>
                <li>• Community contributions</li>
                <li>• Free updates for life</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-muted">
            <CardHeader>
              <Calculator className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Privacy by Default</CardTitle>
              <CardDescription>
                All calculations run locally. Zero tracking, no analytics, no data collection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• No account required</li>
                <li>• Works offline</li>
                <li>• Your data never leaves your device</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-muted">
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Active Development</CardTitle>
              <CardDescription>
                Continuously improved with new features, bug fixes, and community feedback.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Regular updates</li>
                <li>• Community-driven roadmap</li>
                <li>• Transparent development</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground">
            Join the open-source ballistics community. No signup, no tracking, just accurate calculations.
          </p>
          
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Button size="lg" className="h-12 px-8">
              Launch Calculator
            </Button>
            <Button variant="ghost" size="lg" className="h-12 px-8">
              Contribute on GitHub
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 VAPR Ballistics. Open source, privacy-first, always free.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
