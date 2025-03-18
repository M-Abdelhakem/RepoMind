"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const questions = [
  "How does the authentication flow work?",
  "What are the main components in this architecture?",
  "Explain the database schema and relationships",
  "How is state management implemented?",
  "What testing frameworks are used and how?",
  "Explain the API endpoints and their functionality",
]

export function SampleQuestions() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % questions.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-16 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg md:text-xl font-code"
        >
          <span className="text-[#9F5FFF]">{">"}</span>{" "}
          <span className="bg-gradient-to-r from-[#8A2BE2] to-[#9F5FFF] bg-clip-text text-transparent">
            {questions[currentIndex]}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

