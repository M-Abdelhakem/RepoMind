"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Message } from "@/types/message"


interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-3xl rounded-lg p-4",
          message.role === "user"
            ? "bg-[#2D2D2D] text-[#F8F8F8]"
            : "bg-gradient-to-br from-[#1E1E1E] to-[#2D2D2D] border border-[#4D3B72]/30",
        )}
      >
        {/* Message content */}
        <div className="prose prose-invert max-w-none">
          {message.content.split("\n").map((paragraph, i) => (
            <p key={i} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Code blocks */}
        {message.codeBlocks?.map((block, index) => (
          <div key={index} className="mt-4 rounded-md overflow-hidden border border-[#4D3B72]/30 bg-[#121212]">
            <div className="flex items-center justify-between px-4 py-2 bg-[#2D2D2D] border-b border-[#4D3B72]/30">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1.5"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1.5"></div>
                <span className="ml-2 text-xs text-[#A0A0A0]">{block.language}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#A0A0A0] hover:text-[#F8F8F8]"
                onClick={() => copyToClipboard(block.code, index)}
              >
                {copiedIndex === index ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="font-code text-sm text-[#F8F8F8]">{block.code}</code>
            </pre>
          </div>
        ))}

        {/* Citations */}
        {message.citations && message.citations.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs text-[#A0A0A0]">Citations:</p>
            <div className="flex flex-wrap gap-2">
              {message.citations.map((citation, index) => (
                <div
                  key={index}
                  className="flex items-center bg-[#4D3B72]/10 text-[#9F5FFF] text-xs px-2 py-1 rounded-md border border-[#4D3B72]/30"
                >
                  <span className="mr-1">{citation.file}</span>
                  <span className="text-[#A0A0A0]">({citation.lines})</span>
                  <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 text-[#9F5FFF] hover:text-[#B388FF]">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

