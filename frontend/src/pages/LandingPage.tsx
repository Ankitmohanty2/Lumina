import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LandingNavbar } from "@/component/LandingNavbar";

const LandingPage = () => {
  const navigate = useNavigate();
  const bgImageUrl = "/image.jpg";

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat font-sans"
      style={{ backgroundImage: `url('${bgImageUrl}')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />
      <div className="relative z-10">
        <LandingNavbar />

        <main className="container mx-auto mt-16 flex flex-col items-center px-4 text-center sm:mt-24">
          <h1 className="max-w-4xl text-3xl font-medium tracking-tight text-gray-900 sm:text-3xl md:text-6xl">
            Building the future of <br className="hidden md:block" />
            AI-Native education
          </h1>
          <p className="mt-6 max-w-md text-lg text-black md:text-md">
            Helping student unlock the full power of AI - adopt it confidently,
            scale it efficiently, and manage it effortlessly.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button onClick={() => navigate("/signup")} className="h-12 rounded-lg bg-black px-8 text-base text-white hover:bg-gray-800">
              Get Started
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
