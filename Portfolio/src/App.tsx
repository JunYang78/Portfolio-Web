import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FullScreenLoader from "@/components/FullScreenLoader";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PageRipple from "./components/ui/Ripple";

const queryClient = new QueryClient();

const App = () => {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* {showLoader && (
          <FullScreenLoader onComplete={() => setShowLoader(false)} />
        )} */}
        <BrowserRouter>
        <PageRipple>
          <div className="dark min-h-screen bg-gradient-bg">
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </PageRipple>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;