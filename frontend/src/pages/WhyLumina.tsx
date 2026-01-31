import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { LandingNavbar } from "@/component/LandingNavbar";

const reasons = [
  { title: "AI-native, not AI-tacked-on", body: "Lumina was designed from the ground up with AI at the core. Practice, explanations, and tutoring feel seamless instead of clunky add-ons." },
  { title: "Built for how students actually learn", body: "Adaptive practice, step-by-step explanations, and context from your own notes and past answers. Study smarter, not harder." },
  { title: "One place for practice, notes, and progress", body: "Questions, bookmarks, todos, and AI chat live in a single dashboard. No juggling tabs or tools." },
  { title: "Privacy and control", body: "Your data stays yours. We use AI to help you learn, not to mine or sell your information." },
];

const WhyLumina = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans">
      <LandingNavbar />

      <section
        className="relative flex min-h-[42vh] items-center justify-center bg-cover bg-center bg-no-repeat sm:min-h-[48vh]"
        style={{ backgroundImage: "url('/sand.webp')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-400 sm:text-sm">Why choose us</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">Why Lumina</h1>
          <p className="mt-2 text-base text-white/95 sm:text-lg">A learning platform designed for the way you study—with AI that actually helps.</p>
        </div>
      </section>

      <main
        className="relative min-h-[60vh] bg-cover bg-center bg-no-repeat px-6 py-16 sm:py-24"
        style={{ backgroundImage: "url('/sand.webp')" }}
      >
        <div className="absolute inset-0 bg-white/88" />
        <div className="relative z-10 mx-auto max-w-3xl space-y-10">
          {reasons.map((item, i) => (
            <div key={i} className="flex gap-4">
              <span className="mt-1 shrink-0 text-red-500">
                <CheckCircle2 className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-slate-700">{item.body}</p>
              </div>
            </div>
          ))}
          <div className="pt-4">
            <Button onClick={() => navigate("/signup")} className="rounded-lg bg-slate-900 px-6 hover:bg-slate-800">
              Get started with Lumina
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WhyLumina;
