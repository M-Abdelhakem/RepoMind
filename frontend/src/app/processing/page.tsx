"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { Check, Database, FileCode, GitBranch, Server } from "lucide-react"
import { ProcessingAnimation } from "@/components/processing-animation"

const stages = [
  { id: "fetching", label: "Fetching repository files", icon: GitBranch },
  { id: "processing", label: "Processing code structure", icon: FileCode },
  { id: "embedding", label: "Generating embeddings", icon: Database },
  { id: "building", label: "Building knowledge base", icon: Server },
  { id: "complete", label: "Repo is ready Let's chat!", icon: Check },
]

export default function ProcessingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const repoUrl = searchParams.get("repo") || ""

  const [currentStage, setCurrentStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [statusMessages, setStatusMessages] = useState<string[]>([])

  useEffect(() => {
    if (!repoUrl) {
      router.push("/")
      return
    }

    // Simulate processing stages
    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev >= stages.length - 1) {
          clearInterval(stageInterval)
          setTimeout(() => {
            router.push(`/chat?repo=${encodeURIComponent(repoUrl)}`)
          }, 1000)
          return prev
        }
        return prev + 1
      })
    }, 3000)

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const target = (currentStage / (stages.length - 1)) * 100
        const step = Math.min(target - prev, 2)
        const newProgress = prev + step

        if (newProgress >= 100) {
          clearInterval(progressInterval)
          return 100
        }

        return newProgress
      })
    }, 100)

    // Simulate status messages
    const messages = [
      "Cloning repository...",
      "Analyzing file structure...",
      "Processing JavaScript files...",
      "Processing TypeScript files...",
      "Processing CSS and styling...",
      "Analyzing dependencies...",
      "Generating code embeddings...",
      "Building semantic index...",
      "Analyzing code relationships...",
      "Finalizing knowledge graph...",
    ]

    const messageInterval = setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      setStatusMessages((prev) => [...prev, randomMessage].slice(-5))
    }, 1500)

    return () => {
      clearInterval(stageInterval)
      clearInterval(progressInterval)
      clearInterval(messageInterval)
    }
  }, [repoUrl, router, currentStage])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#121212] text-[#F8F8F8] p-4 relative overflow-hidden">
  {/* Background grid pattern */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E1E1E_1px,transparent_1px),linear-gradient(to_bottom,#1E1E1E_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

  {/* Glowing orbs in background */}
  <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#8A2BE2]/5 blur-[100px]"></div>
  <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#9F5FFF]/5 blur-[100px]"></div>

  <div className="z-10 max-w-4xl w-full space-y-6 md:space-y-12 flex flex-col items-center justify-center h-full">
    <div className="text-center mt-6 md:mt-12 mb-2 md:mb-4">
      <h1 className="text-2xl md:text-4xl font-display font-bold tracking-tight mb-2">
        <span className="bg-gradient-to-r from-[#8A2BE2] to-[#9F5FFF] bg-clip-text text-transparent">
          Processing Repository
        </span>
      </h1>
      <p className="text-[#A0A0A0] text-sm md:text-base">{repoUrl}</p>
    </div>

    <div className="space-y-0 md:space-y-4 w-full">
      {/* <Progress
        value={progress}
        className="h-2 bg-[#2D2D2D]"
        indicatorClassName="bg-gradient-to-r from-[#8A2BE2] to-[#9F5FFF]"
      /> */}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
        {stages.map((stage, index) => {
          const Icon = stage.icon
          const isActive = index === currentStage
          const isComplete = index < currentStage

          return (
            <div
              key={stage.id}
              className={`flex flex-col items-center p-2 md:p-4 rounded-lg border transition-all duration-300 ${
                isActive
                  ? "border-[#8A2BE2] bg-[#4D3B72]/10 shadow-[0_0_5px_#4D3B72]"
                  : isComplete
                    ? "border-[#4D3B72] bg-[#4D3B72]/5"
                    : "border-[#2D2D2D] bg-[#1E1E1E]"
              }`}
            >
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-1 md:mb-2 ${
                  isActive
                    ? "bg-[#8A2BE2] text-white"
                    : isComplete
                      ? "bg-[#4D3B72] text-white"
                      : "bg-[#2D2D2D] text-[#A0A0A0]"
                }`}
              >
                <Icon className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span
                className={`text-xs md:text-sm text-center ${
                  isActive ? "text-[#F8F8F8]" : isComplete ? "text-[#F8F8F8]" : "text-[#A0A0A0]"
                }`}
              >
                {stage.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>

    <div className="h-40 md:h-64 relative">
      <ProcessingAnimation currentStage={currentStage} />
    </div>

    {/* Terminal-shaped part */}
    <div className="bg-[#2D2D2D] rounded-lg border border-[#2D2D2D] p-2 md:p-4 font-code text-xs md:text-sm w-full h-32 md:h-40 overflow-hidden">
      <div className="flex items-center mb-2">
        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 mr-1"></div>
        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500 mr-1"></div>
        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 mr-1"></div>
        <span className="text-[#A0A0A0] ml-2 text-xs">Terminal</span>
      </div>
      <div className="space-y-1">
        {statusMessages.map((message, index) => (
          <div key={index} className="flex">
            <span className="text-[#9F5FFF] mr-2">$</span>
            <span className="text-[#F8F8F8]">{message}</span>
            {index === statusMessages.length - 1 && <span className="animate-pulse ml-1">_</span>}
          </div>
        ))}
      </div>
    </div>
  </div>
</main>
  )
}

