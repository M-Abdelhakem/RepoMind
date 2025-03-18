"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, File, Folder, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileTreeProps {
  structure: Record<string, any>
  level?: number
}

export function FileTree({ structure, level = 0 }: FileTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({})

  const toggleFolder = (folder: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folder]: !prev[folder],
    }))
  }

  return (
    <div className="font-code text-sm">
      {Object.entries(structure).map(([name, children]) => {
        const isFolder = children !== null
        const isExpanded = expandedFolders[name] || false
        const path = name

        return (
          <div key={name}>
            <div
              className={cn(
                "flex items-center py-1 px-2 rounded-md hover:bg-[#2D2D2D] cursor-pointer",
                level > 0 && "ml-4",
              )}
              onClick={() => isFolder && toggleFolder(path)}
            >
              {isFolder ? (
                <>
                  {isExpanded ? (
                    <ChevronDown className="h-3.5 w-3.5 mr-1 text-[#9F5FFF]" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 mr-1 text-[#A0A0A0]" />
                  )}
                  {isExpanded ? (
                    <FolderOpen className="h-4 w-4 mr-2 text-[#9F5FFF]" />
                  ) : (
                    <Folder className="h-4 w-4 mr-2 text-[#A0A0A0]" />
                  )}
                </>
              ) : (
                <>
                  <span className="w-3.5 mr-1" />
                  <File className="h-4 w-4 mr-2 text-[#A0A0A0]" />
                </>
              )}
              <span className={isFolder ? "font-medium" : ""}>{name}</span>
            </div>

            {isFolder && isExpanded && <FileTree structure={children} level={level + 1} />}
          </div>
        )
      })}
    </div>
  )
}

