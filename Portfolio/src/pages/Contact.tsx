import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Calendar, Github, Linkedin, Twitter } from "lucide-react";

const Contact = () => {
  return (
    <main className="pt-20 min-h-screen">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Let's Work Together
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. 
            Whether you have a question or just want to say hi, I'll get back to you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Get In Touch
              </CardTitle>
              <CardDescription>
                Ready to start a conversation? Here are the best ways to reach me.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a 
                  href="mailto:your.email@example.com" 
                  className="text-foreground hover:text-primary transition-smooth"
                >
                  your.email@example.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Your City, Country</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Available for new projects</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Choose the best way to connect based on what you're looking for.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="nav-primary" className="w-full justify-start" asChild>
                <a href="mailto:your.email@example.com">
                  <Mail className="w-4 h-4" />
                  Send Email
                </a>
              </Button>
              
              <Button variant="nav" className="w-full justify-start" asChild>
                <a href="/path-to-resume.pdf" download>
                  <Calendar className="w-4 h-4" />
                  Download Resume
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Find Me Online
          </h2>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <Button variant="nav" size="lg" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </Button>
            
            <Button variant="nav" size="lg" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </Button>
            
            <Button variant="nav" size="lg" asChild>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-5 h-5" />
                Twitter
              </a>
            </Button>
          </div>
          
          <p className="text-muted-foreground mt-8 text-center">
            Thanks for visiting! I look forward to hearing from you.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Contact;