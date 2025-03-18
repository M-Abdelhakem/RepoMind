"use client"

import { useState, useEffect, useRef } from "react"
import { Command } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Command as CommandPrimitive } from "@/components/ui/command"

interface CommandPaletteProps {
  onClose: () => void
}

export function CommandPalette({ onClose }: CommandPaletteProps) {
  const [open, setOpen] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        onClose()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [onClose])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  const handleSelect = (action: string) => {
    setOpen(false)
    onClose()
    // Handle different actions here
    console.log("Selected action:", action)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) onClose()
      }}
    >
      <DialogContent className="p-0 gap-0 max-w-2xl border-[#4D3B72]/30 bg-[#121212]">
        <CommandPrimitive className="rounded-lg border-none bg-transparent">
          <div className="flex items-center border-b border-[#4D3B72]/30 px-3">
            <Command className="mr-2 h-4 w-4 text-[#9F5FFF]" />
            <CommandPrimitive.Input
              ref={inputRef}
              placeholder="Type a command or search..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-[#A0A0A0] disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandPrimitive.List className="max-h-[300px] overflow-y-auto p-2">
            <CommandPrimitive.Empty className="py-6 text-center text-sm text-[#A0A0A0]">
              No results found.
            </CommandPrimitive.Empty>

            <CommandPrimitive.Group heading="Actions">
              <CommandPrimitive.Item
                onSelect={() => handleSelect("new-chat")}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-[#4D3B72]/10 aria-selected:bg-[#4D3B72]/20"
              >
                <span className="mr-2 text-[#9F5FFF]">+</span>
                <span>New Chat</span>
              </CommandPrimitive.Item>
              <CommandPrimitive.Item
                onSelect={() => handleSelect("clear-chat")}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-[#4D3B72]/10 aria-selected:bg-[#4D3B72]/20"
              >
                <span className="mr-2 text-[#9F5FFF]">🗑️</span>
                <span>Clear Chat</span>
              </CommandPrimitive.Item>
              <CommandPrimitive.Item
                onSelect={() => handleSelect("toggle-sidebar")}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-[#4D3B72]/10 aria-selected:bg-[#4D3B72]/20"
              >
                <span className="mr-2 text-[#9F5FFF]">⬅️</span>
                <span>Toggle Sidebar</span>
              </CommandPrimitive.Item>
            </CommandPrimitive.Group>

            <CommandPrimitive.Separator className="my-2 h-px bg-[#4D3B72]/30" />

            <CommandPrimitive.Group heading="Files">
              <CommandPrimitive.Item
                onSelect={() => handleSelect("open-file")}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-[#4D3B72]/10 aria-selected:bg-[#4D3B72]/20"
              >
                <span className="mr-2 text-[#9F5FFF]">📄</span>
                <span>Open File</span>
              </CommandPrimitive.Item>
              <CommandPrimitive.Item
                onSelect={() => handleSelect("search-code")}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-[#4D3B72]/10 aria-selected:bg-[#4D3B72]/20"
              >
                <span className="mr-2 text-[#9F5FFF]">🔍</span>
                <span>Search in Code</span>
              </CommandPrimitive.Item>
            </CommandPrimitive.Group>

            <CommandPrimitive.Separator className="my-2 h-px bg-[#4D3B72]/30" />

            <CommandPrimitive.Group heading="Help">
              <CommandPrimitive.Item
                onSelect={() => handleSelect("keyboard-shortcuts")}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-[#4D3B72]/10 aria-selected:bg-[#4D3B72]/20"
              >
                <span className="mr-2 text-[#9F5FFF]">⌨️</span>
                <span>Keyboard Shortcuts</span>
              </CommandPrimitive.Item>
              <CommandPrimitive.Item
                onSelect={() => handleSelect("documentation")}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-[#4D3B72]/10 aria-selected:bg-[#4D3B72]/20"
              >
                <span className="mr-2 text-[#9F5FFF]">📚</span>
                <span>Documentation</span>
              </CommandPrimitive.Item>
            </CommandPrimitive.Group>
          </CommandPrimitive.List>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  )
}

