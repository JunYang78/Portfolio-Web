import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";


const Index = () => {
  return (
    <main className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Jun Yang
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl">
            A passionate developer crafting digital experiences with modern technologies. 
            I build beautiful, functional websites and applications that make a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button variant="nav-primary" size="lg" asChild>
              <Link to="/projects" className="group">
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button variant="nav" size="lg" asChild>
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:your.email@example.com">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-foreground mb-12">What I Work With</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "React", "TypeScript", "Node.js", "Python",
            "TailwindCSS", "Next.js", "PostgreSQL", "AWS"
          ].map((skill) => (
            <div
              key={skill}
              className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-medium transition-smooth"
            >
              <p className="font-medium text-card-foreground">{skill}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Index;