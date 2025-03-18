"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function AnimatedIllustration() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particles
    const particles: Particle[] = []
    const particleCount = 50

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 2
        this.speedY = (Math.random() - 0.5) * 2

        // Purple gradient colors
        const colors = ["#8A2BE2", "#9F5FFF", "#B388FF", "#4D3B72"]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = 0.7
        ctx.fill()
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Draw code brain
    const drawCodeBrain = () => {
      // Brain outline
      ctx.beginPath()
      ctx.ellipse(canvas.width / 2, canvas.height / 2, canvas.width / 4, canvas.height / 3, 0, 0, Math.PI * 2)
      ctx.strokeStyle = "#8A2BE2"
      ctx.lineWidth = 2
      ctx.globalAlpha = 0.5
      ctx.stroke()

      // Brain inner details
      ctx.beginPath()
      ctx.ellipse(canvas.width / 2, canvas.height / 2, canvas.width / 5, canvas.height / 4, 0, 0, Math.PI * 2)
      ctx.strokeStyle = "#9F5FFF"
      ctx.lineWidth = 1
      ctx.globalAlpha = 0.3
      ctx.stroke()

      // Code blocks
      drawCodeBlocks()
    }

    // Draw code blocks
    const drawCodeBlocks = () => {
      const time = Date.now() / 1000

      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 + time * 0.2
        const x = canvas.width / 2 + Math.cos(angle) * (canvas.width / 3.5)
        const y = canvas.height / 2 + Math.sin(angle) * (canvas.height / 4.5)

        ctx.fillStyle = "#1E1E1E"
        ctx.globalAlpha = 0.8
        ctx.fillRect(x - 30, y - 20, 60, 40)

        ctx.strokeStyle = "#B388FF"
        ctx.lineWidth = 1
        ctx.globalAlpha = 0.8
        ctx.strokeRect(x - 30, y - 20, 60, 40)

        // Code lines
        ctx.fillStyle = "#9F5FFF"
        ctx.globalAlpha = 0.9
        for (let j = 0; j < 3; j++) {
          ctx.fillRect(x - 20, y - 10 + j * 10, 40 * Math.random(), 2)
        }
      }
    }

    // Connect particles
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = "#8A2BE2"
            ctx.globalAlpha = 0.1 * (1 - distance / 100)
            ctx.lineWidth = 1
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw brain
      drawCodeBrain()

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }

      // Connect particles
      connectParticles()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <div className="w-full h-full relative">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="w-24 h-24 rounded-full bg-[#8A2BE2]/10 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="w-16 h-16 rounded-full bg-[#9F5FFF]/20 flex items-center justify-center"
          >
            <div className="w-8 h-8 rounded-full bg-[#8A2BE2]/30"></div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

