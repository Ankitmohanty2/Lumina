import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LandingNavbar } from "@/component/LandingNavbar";

const Story = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans">
      <LandingNavbar />

      <section
        className="relative flex min-h-[42vh] items-center justify-center bg-cover bg-center bg-no-repeat sm:min-h-[48vh]"
        style={{ backgroundImage: "url('/ice.webp')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-400 sm:text-sm">Our story</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">Why we built Lumina</h1>
          <p className="mt-2 text-base text-white/95 sm:text-lg">Education should evolve with technology, not lag behind it.</p>
        </div>
      </section>

      <article
        className="relative min-h-[60vh] bg-cover bg-center bg-no-repeat px-6 py-16 sm:py-24"
        style={{ backgroundImage: "url('/ice.webp')" }}
      >
        <div className="absolute inset-0 bg-white/88" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="text-slate-700">
            Lumina started from a simple observation: students were already using AI to learn—through chatbots, search, and apps—but in scattered, unguided ways. We saw an opportunity to build a learning platform that puts AI at the center, instead of bolting it on later.
          </p>
          <p className="mt-4 text-slate-700">
            We talked to hundreds of students and educators. The same themes kept coming up: the need for practice that adapts, explanations that stick, and tools that feel native to how people actually study today. That feedback shaped Lumina into an AI-native education product.
          </p>
          <p className="mt-4 text-slate-700">
            We believe the future of education is personalized, interactive, and powered by AI that augments—not replaces—human teaching. Lumina is our contribution to that future.
          </p>
          <div className="mt-10">
            <Button onClick={() => navigate("/signup")} className="rounded-lg bg-slate-900 px-6 hover:bg-slate-800">
              Get started with Lumina
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Story;
