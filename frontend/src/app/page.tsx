import { RepositoryInput } from "@/components/repository-input";
import { SampleQuestions } from "@/components/sample-questions";
import { AnimatedIllustration } from "@/components/animated-illustration";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-[#F8F8F8] p-4 relative">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E1E1E_2px,transparent_1px),linear-gradient(to_bottom,#1E1E1E_2px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

      {/* Glowing orbs in background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#8A2BE2]/5 blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#9F5FFF]/5 blur-[100px]"></div>

      {/* Content */}
      <div className="flex-grow z-10 max-w-4xl w-full mx-auto space-y-10 text-center">
        <h1 className={`${orbitron.className} text-5xl md:text-6xl font-bold tracking-tight mt-8 md:mt-10`}>
          <span className="bg-gradient-to-r from-[#8A2BE2] to-[#9F5FFF] bg-clip-text text-transparent">
            RepoMind
          </span>
        </h1>

        <p className="text-xl md:text-2xl font-light">
          Understand any codebase in{" "}
          <span className="bg-gradient-to-r from-[#8A2BE2] to-[#9F5FFF] bg-clip-text text-transparent font-medium">
            minutes
          </span>
          , not days.
        </p>

        <div className="relative max-w-2xl mx-auto">
          <RepositoryInput />
        </div>

        <div className="h-64 md:h-80 relative">
          <AnimatedIllustration />
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-display">Ask anything about your codebase</h2>
          <SampleQuestions />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto text-center text-[#A0A0A0] text-sm">
        <p>© 2025 RepoMind. All rights reserved.</p>
      </footer>
    </main>
  );
}