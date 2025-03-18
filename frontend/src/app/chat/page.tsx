"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileCode, Send, Settings, X } from "lucide-react"
import { ChatMessage } from "@/components/chat-message"
import { Message } from "@/types/message"
import { FileTree } from "@/components/file-tree"
import { CommandPalette } from "@/components/command-palette"

// Mock file structure for demo
const mockFileStructure = {
  src: {
    components: {
      "Button.tsx": null,
      "Card.tsx": null,
      "Input.tsx": null,
      "Modal.tsx": null,
      "Navbar.tsx": null,
    },
    pages: {
      "index.tsx": null,
      "about.tsx": null,
      "contact.tsx": null,
      "_app.tsx": null,
    },
    styles: {
      "globals.css": null,
      "Home.module.css": null,
    },
    utils: {
      "api.ts": null,
      "helpers.ts": null,
    },
  },
  public: {
    images: {
      "logo.svg": null,
      "hero.jpg": null,
    },
    fonts: {},
  },
  "package.json": null,
  "tsconfig.json": null,
  "README.md": null,
}

// Mock chat messages for demo
const initialMessages: Message[] = [
  {
    id: "1",
    role: "system",
    content: "I've analyzed the repository. What would you like to know about the codebase?",
  },
]

export default function ChatPage() {
  const searchParams = useSearchParams()
  const repoUrl = searchParams.get("repo") || "example/repository"

  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette shortcut (Cmd/Ctrl + K)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsCommandPaletteOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const mockResponses = [
        {
          id: Date.now().toString(),
          role: "system",
          content:
            "The authentication flow in this application uses NextAuth.js for handling user sessions. The flow starts in `pages/api/auth/[...nextauth].js` where providers are configured. When a user logs in, the credentials are validated against the database, and if successful, a JWT token is generated and stored in cookies.",
          citations: [
            { file: "pages/api/auth/[...nextauth].js", lines: "12-45" },
            { file: "utils/auth.ts", lines: "23-56" },
          ],
          codeBlocks: [
            {
              language: "typescript",
              code: `// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../utils/auth';
import { connectToDatabase } from '../../../utils/db';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection('users');
        const user = await usersCollection.findOne({ email: credentials.email });
        
        if (!user) {
          throw new Error('No user found!');
        }
        
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        
        if (!isValid) {
          throw new Error('Could not log you in!');
        }
        
        return { email: user.email };
      },
    }),
  ],
});`,
            },
          ],
        },
        {
          id: Date.now().toString(),
          role: "system",
          content:
            "The main components in this architecture are organized in a typical Next.js project structure. The application follows a component-based architecture with reusable UI components in the `components` directory, page components in the `pages` directory, and utility functions in the `utils` directory.",
          citations: [
            { file: "components/Button.tsx", lines: "1-25" },
            { file: "pages/index.tsx", lines: "1-42" },
          ],
        },
        {
          id: Date.now().toString(),
          role: "system",
          content:
            "The database schema uses MongoDB with the following collections:\n\n1. **Users**: Stores user information including email, hashed password, and profile data.\n2. **Posts**: Contains blog posts with title, content, author reference, and timestamps.\n3. **Comments**: Stores comments related to posts with content, author reference, and timestamps.",
          citations: [{ file: "utils/db.ts", lines: "10-35" }],
          codeBlocks: [
            {
              language: "typescript",
              code: `// utils/db.ts
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}`,
            },
          ],
        },
      ]

      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]

      setMessages((prev) => [...prev, randomResponse as Message])
      setIsLoading(false)
    }, 2000)
  }

  return (
    <main className="flex h-screen bg-[#121212] text-[#F8F8F8] overflow-hidden">
      {/* Command Palette */}
      {isCommandPaletteOpen && <CommandPalette onClose={() => setIsCommandPaletteOpen(false)} />}

      {/* Sidebar */}
      <div className={`border-r border-[#2D2D2D] transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-0"}`}>
        {isSidebarOpen && (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-[#2D2D2D] flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#8A2BE2] mr-2"></div>
                <h2 className="font-display text-sm font-medium">Repository Files</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-[#A0A0A0] hover:text-[#F8F8F8]"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              <FileTree structure={mockFileStructure} />
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-[#2D2D2D] p-4 flex items-center justify-between">
          <div className="flex items-center">
            {!isSidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 h-8 w-8 text-[#A0A0A0] hover:text-[#F8F8F8]"
                onClick={() => setIsSidebarOpen(true)}
              >
                <FileCode className="h-5 w-5" />
              </Button>
            )}
            <h1 className="font-display font-medium">
              <span className="bg-gradient-to-r from-[#8A2BE2] to-[#9F5FFF] bg-clip-text text-transparent">
                RepoMind
              </span>
            </h1>
            <div className="mx-2 text-[#A0A0A0]">•</div>
            <span className="text-sm text-[#A0A0A0] truncate max-w-md">{repoUrl}</span>
          </div>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#A0A0A0] hover:text-[#F8F8F8]"
              onClick={() => setIsCommandPaletteOpen(true)}
            >
              <span className="text-xs mr-1">⌘</span>K
            </Button>
            <Button variant="ghost" size="icon" className="ml-2 h-8 w-8 text-[#A0A0A0] hover:text-[#F8F8F8]">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-[#A0A0A0]">
              <div className="w-2 h-2 rounded-full bg-[#8A2BE2] animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-[#9F5FFF] animate-pulse delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-[#B388FF] animate-pulse delay-200"></div>
              <span className="text-sm">RepoMind is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[#2D2D2D] p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="relative"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about the codebase..."
              className="pr-12 py-6 bg-[#2D2D2D] border-[#4D3B72] focus:border-[#9F5FFF] focus:ring-2 focus:ring-[#8A2BE2]/20 transition-all duration-300"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#8A2BE2] to-[#9F5FFF] hover:shadow-[0_0_5px_#4D3B72] transition-all duration-300"
              disabled={!inputValue.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="mt-2 text-[#A0A0A0] text-xs">
            Press <kbd className="px-1 py-0.5 bg-[#2D2D2D] rounded text-[#A0A0A0]">Enter</kbd> to send,{" "}
            <kbd className="px-1 py-0.5 bg-[#2D2D2D] rounded text-[#A0A0A0]">⌘K</kbd> for command palette
          </p>
        </div>
      </div>
    </main>
  )
}

