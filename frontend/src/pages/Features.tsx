import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, MessageSquare, ClipboardList, BarChart3, Bookmark, FileQuestion } from "lucide-react";
import { LandingNavbar } from "@/component/LandingNavbar";

const features = [
  { icon: FileQuestion, title: "Practice questions", description: "Subject-wise practice (Maths, Physics, Chemistry) with instant feedback and detailed solutions. Track what you've attempted and how you're doing." },
  { icon: MessageSquare, title: "AI tutor & chat", description: "Ask questions in natural language and get step-by-step explanations. Use your own solved questions and notes as context for personalized help." },
  { icon: Bookmark, title: "Bookmarks", description: "Save questions for later and revisit them from one place. Build a personal question bank that grows with you." },
  { icon: ClipboardList, title: "Todos", description: "Keep a simple to-do list tied to your account. Plan your study sessions and tick tasks off as you go." },
  { icon: BookOpen, title: "Notes", description: "Capture notes in the app and reference them when chatting with the AI. Your notes become part of your learning context." },
  { icon: BarChart3, title: "Progress & analytics", description: "See how many questions you've solved over time and where you stand. Data-driven insights without the clutter." },
];

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans">
      <LandingNavbar />

      <section
        className="relative flex min-h-[42vh] items-center justify-center bg-cover bg-center bg-no-repeat sm:min-h-[48vh]"
        style={{ backgroundImage: "url('/river.webp')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-400 sm:text-sm">Product</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">Features</h1>
          <p className="mt-2 text-base text-white/95 sm:text-lg">Everything you need to practice, learn, and track progress—in one place.</p>
        </div>
      </section>

      <main
        className="relative min-h-[60vh] bg-cover bg-center bg-no-repeat px-6 py-16 sm:py-24"
        style={{ backgroundImage: "url('/river.webp')" }}
      >
        <div className="absolute inset-0 bg-white/88" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="grid gap-10 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, description }, i) => (
              <div key={i} className="flex gap-4">
                <span className="mt-1 shrink-0 text-red-500">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                  <p className="mt-2 text-slate-700">{description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Button onClick={() => navigate("/signup")} className="rounded-lg bg-slate-900 px-6 hover:bg-slate-800">
              Get started with Lumina
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Features;
