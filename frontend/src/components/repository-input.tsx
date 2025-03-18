"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Github } from "lucide-react"
import { useRouter } from "next/navigation"

export function RepositoryInput() {
  const [repoUrl, setRepoUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!repoUrl) return

    setIsLoading(true)
    // In a real app, we would validate the URL here
    setTimeout(() => {
      router.push(`/processing?repo=${encodeURIComponent(repoUrl)}`)
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <div className="absolute left-3 text-[#A0A0A0]">
          <Github className="h-5 w-5" />
        </div>
        <Input
          type="text"
          placeholder="github.com/username/repository"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="pl-10 pr-32 py-6 bg-[#2D2D2D] border-[#4D3B72] focus:border-[#9F5FFF] focus:ring-2 focus:ring-[#8A2BE2]/20 transition-all duration-300 text-[#F8F8F8] placeholder:text-[#A0A0A0]"
        />
        <Button
          type="submit"
          disabled={isLoading || !repoUrl}
          className="absolute right-2 bg-gradient-to-r from-[#8A2BE2] to-[#9F5FFF] hover:shadow-[0_0_5px_#4D3B72] transition-all duration-300 hover:scale-105"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse delay-100"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse delay-200"></div>
            </div>
          ) : (
            <>
              Analyze <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      <p className="mt-2 text-[#A0A0A0] text-sm text-left">Enter a public GitHub repository URL</p>
    </form>
  )
}

