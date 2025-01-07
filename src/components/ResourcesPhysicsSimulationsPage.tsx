import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const ResourcesPhysicsSimulationsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Physics Simulations</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Projectile Motion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              {isLoading && <Loader2 className="h-8 w-8 animate-spin" />}
              <iframe 
                src="https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html"
                className="w-full h-full"
                onLoad={() => setIsLoading(false)}
                title="Projectile Motion Simulation"
              />
            </div>
            <Button className="w-full mt-4">
              Open in Full Screen
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Wave Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              {isLoading && <Loader2 className="h-8 w-8 animate-spin" />}
              <iframe 
                src="https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html"
                className="w-full h-full"
                onLoad={() => setIsLoading(false)}
                title="Wave Properties Simulation"
              />
            </div>
            <Button className="w-full mt-4">
              Open in Full Screen
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Circuit Construction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              {isLoading && <Loader2 className="h-8 w-8 animate-spin" />}
              <iframe 
                src="https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html"
                className="w-full h-full"
                onLoad={() => setIsLoading(false)}
                title="Circuit Construction Simulation"
              />
            </div>
            <Button className="w-full mt-4">
              Open in Full Screen
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};