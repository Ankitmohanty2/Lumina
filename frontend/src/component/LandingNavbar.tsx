import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AlignRight } from "lucide-react";

export function LandingNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const linkClass = (to: string) =>
    `text-sm font-medium transition hover:text-gray-900 md:text-base ${
      path === to ? "text-gray-900 underline underline-offset-4" : "text-gray-600"
    }`;

  return (
    <nav className="sticky top-0 z-20 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-sm">
      <div className="relative flex w-full items-center justify-between px-6 py-4 md:px-8 md:py-5">
        <Link
          to="/"
          className="flex items-center gap-3 text-gray-900 hover:opacity-90 transition-opacity"
        >
          <img src="/luminaalogo.png" alt="Lumina" className="h-9 w-auto md:h-10" />
          <span className="text-xl font-bold tracking-tight md:text-2xl">Lumina</span>
        </Link>
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          <Link to="/story" className={linkClass("/story")}>
            Story
          </Link>
          <Link to="/why-lumina" className={linkClass("/why-lumina")}>
            Why Lumina
          </Link>
          <Link to="/features" className={linkClass("/features")}>
            Features
          </Link>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Button
            onClick={() => navigate("/signup")}
            variant="outline"
            className="rounded-lg border-gray-300 bg-transparent px-6 text-gray-900 hover:bg-gray-50"
          >
            Signup
          </Button>
          <Button
            onClick={() => navigate("/signin")}
            className="rounded-lg bg-black px-6 text-white hover:bg-gray-800"
          >
            Login
          </Button>
        </div>
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <AlignRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
