import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Users, Lock, Zap, Cloud, Menu } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
export default function LandingPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/signup'); // Use SPA navigation instead of window.open
  };
  return (
    <div className="flex flex-col min-h-screen overflow-y-auto">
      <header className="px-4 lg:px-6 h-auto flex items-center">
        <Link to="/" className="flex items-center justify-center">
          <FileText className="h-6 w-6" />
          <span className="sr-only">Docify</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="/about" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link to="/signup" className="text-sm font-medium hover:underline underline-offset-4">
            SignUp
          </Link>
        </nav>
      </header>
      <main className="flex-1 overflow-y-auto">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Create, Edit, Collaborate
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Docify brings the power of collaborative document editing to your fingertips. Create, edit, and share
                  documents with ease.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={handleClick}>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
