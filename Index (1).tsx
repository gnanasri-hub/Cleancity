import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin, Users, Shield, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-community.jpg";
import mapIcon from "@/assets/map-icon.png";
import communityChat from "@/assets/community-chat.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container relative py-20 md:py-32">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Your Voice, <span className="text-accent">Your City</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Report civic issues, connect with your community, and engage directly with government officials. Building cleaner, better cities together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity">
                  <Link to="/report">
                    Report an Issue <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/community">Join Community</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Community engagement" 
                className="rounded-2xl shadow-elevated w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Clearशहर Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete platform for civic engagement with multilingual support
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border hover:shadow-medium transition-shadow">
            <CardContent className="pt-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Report Issues</h3>
              <p className="text-sm text-muted-foreground">
                Upload photos/videos of civic problems with AI-powered department detection
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-medium transition-shadow">
            <CardContent className="pt-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">Location Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Pin exact locations on map with route warnings for travelers
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-medium transition-shadow">
            <CardContent className="pt-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold text-lg">Community Chat</h3>
              <p className="text-sm text-muted-foreground">
                Connect with neighbors in real-time with automatic translation
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-medium transition-shadow">
            <CardContent className="pt-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Direct to Officials</h3>
              <p className="text-sm text-muted-foreground">
                Issues route directly to relevant government departments
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <img 
                src={communityChat} 
                alt="Multilingual community" 
                className="rounded-2xl w-full"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Speak Your Language
              </h2>
              <p className="text-lg text-muted-foreground">
                Communicate seamlessly with people across India. Our platform supports 12 languages with automatic real-time translation, ensuring language is never a barrier to civic engagement.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-success/20 flex items-center justify-center mr-3 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-success" />
                  </div>
                  <span>Automatic message translation</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-success/20 flex items-center justify-center mr-3 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-success" />
                  </div>
                  <span>12 Indian languages supported</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-success/20 flex items-center justify-center mr-3 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-success" />
                  </div>
                  <span>Real-time community discussions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container py-20">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              See What's Happening
            </h2>
            <p className="text-lg text-muted-foreground">
              Interactive map view shows all reported issues in your area. Get route warnings and stay informed about civic problems on your daily commute.
            </p>
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
              <Link to="/map">
                Explore Map <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative">
            <img 
              src={mapIcon} 
              alt="Map view" 
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of citizens working together to build cleaner, better cities
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/report">
              Report Your First Issue <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
