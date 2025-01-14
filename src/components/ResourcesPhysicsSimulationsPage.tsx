import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BackButton } from "@/components/ui/back-button";

export const ResourcesPhysicsSimulationsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const simulations = {
    mechanics: [
      {
        title: "Projectile Motion",
        url: "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html",
        description: "Investigate the factors affecting projectile motion"
      },
      {
        title: "Forces and Motion",
        url: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_en.html",
        description: "Explore the relationship between forces and motion"
      },
      {
        title: "Gravity and Orbits",
        url: "https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_en.html",
        description: "Learn about gravitational forces and orbital motion"
      }
    ],
    waves: [
      {
        title: "Wave Properties",
        url: "https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html",
        description: "Study wave characteristics and behavior"
      },
      {
        title: "Sound Waves",
        url: "https://phet.colorado.edu/sims/html/waves-intro/latest/waves-intro_en.html",
        description: "Explore sound wave properties and phenomena"
      },
      {
        title: "Wave Interference",
        url: "https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_en.html",
        description: "Investigate wave interference patterns"
      }
    ],
    electricity: [
      {
        title: "Circuit Construction",
        url: "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html",
        description: "Build and analyze DC circuits"
      },
      {
        title: "Ohm's Law",
        url: "https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law_en.html",
        description: "Explore the relationship between voltage, current, and resistance"
      },
      {
        title: "Capacitor Lab",
        url: "https://phet.colorado.edu/sims/html/capacitor-lab-basics/latest/capacitor-lab-basics_en.html",
        description: "Learn about capacitors and electric fields"
      }
    ],
    modern: [
      {
        title: "Quantum Wave Function",
        url: "https://phet.colorado.edu/sims/html/quantum-wave-function/latest/quantum-wave-function_en.html",
        description: "Visualize quantum mechanical wave functions"
      },
      {
        title: "Photoelectric Effect",
        url: "https://phet.colorado.edu/sims/html/photoelectric/latest/photoelectric_en.html",
        description: "Study the photoelectric effect and quantum nature of light"
      },
      {
        title: "Nuclear Fission",
        url: "https://phet.colorado.edu/sims/html/nuclear-fission/latest/nuclear-fission_en.html",
        description: "Explore nuclear fission reactions"
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <h1 className="text-3xl font-bold text-center mb-8">Physics Interactive Simulations</h1>
      
      <Tabs defaultValue="mechanics" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2">
          <TabsTrigger value="mechanics">Mechanics</TabsTrigger>
          <TabsTrigger value="waves">Waves</TabsTrigger>
          <TabsTrigger value="electricity">Electricity</TabsTrigger>
          <TabsTrigger value="modern">Modern Physics</TabsTrigger>
        </TabsList>

        {Object.entries(simulations).map(([category, sims]) => (
          <TabsContent key={category} value={category} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sims.map((sim) => (
                <Card key={sim.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{sim.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{sim.description}</p>
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      {isLoading && <Loader2 className="h-8 w-8 animate-spin" />}
                      <iframe 
                        src={sim.url}
                        className="w-full h-full"
                        onLoad={() => setIsLoading(false)}
                        title={`${sim.title} Simulation`}
                      />
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => window.open(sim.url, '_blank')}
                    >
                      Open in Full Screen
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};