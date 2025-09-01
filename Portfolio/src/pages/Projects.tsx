import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution built with React and Node.js, featuring real-time inventory management and secure payment processing.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      github: "https://github.com",
      demo: "https://demo.example.com",
      status: "Completed"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and advanced filtering.",
      tech: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
      github: "https://github.com",
      demo: "https://demo.example.com",
      status: "In Progress"
    },
    {
      title: "Data Visualization Dashboard",
      description: "An interactive dashboard for analyzing business metrics with beautiful charts and real-time data updates.",
      tech: ["React", "D3.js", "Python", "FastAPI"],
      github: "https://github.com",
      demo: "https://demo.example.com",
      status: "Completed"
    }
  ];

  return (
    <main className="pt-20 min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            My Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A collection of projects I've worked on, showcasing my skills in web development, 
            design, and problem-solving. Each project represents a unique challenge and learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="hover:shadow-medium transition-smooth border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.status === "Completed" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                  }`}>
                    {project.status}
                  </span>
                </div>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex gap-2">
                <Button variant="nav" size="sm" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </Button>
                <Button variant="nav-primary" size="sm" asChild>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Want to see more?
          </h2>
          <p className="text-muted-foreground mb-6">
            Check out my GitHub for more projects and contributions.
          </p>
          <Button variant="nav-primary" size="lg" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              View All Projects
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Projects;