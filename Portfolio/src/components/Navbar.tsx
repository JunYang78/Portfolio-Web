import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-bold text-foreground hover:text-primary transition-smooth"
          >
            Er Jun Yang
          </Link>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="nav-primary" 
              size="nav" 
              asChild
            >
              <Link to="/projects">Projects</Link>
            </Button>
            
            <Button 
              variant="nav-primary" 
              size="nav" 
              asChild
            >
              <Link to="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;