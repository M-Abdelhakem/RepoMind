"use client"

import { useEffect, useRef } from "react"

interface ProcessingAnimationProps {
  currentStage: number
}

export function ProcessingAnimation({ currentStage }: ProcessingAnimationProps) {
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

    // Animation variables
    const codeParticles: CodeParticle[] = []
    const particleCount = 50

    class CodeParticle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      targetX: number
      targetY: number
      stage: number

      constructor() {
        // Start from edges
        const side = Math.floor(Math.random() * 4)
        if (side === 0) {
          // top
          this.x = canvas ? Math.random() * canvas.width : 0
          this.y = 0
        } else if (side === 1) {
          // right
          this.x = canvas ? canvas.width : 0
          this.y = Math.random() * canvas!.height
        } else if (side === 2) {
          // bottom
          this.x = canvas ? Math.random() * canvas.width : 0
          this.y = canvas ? canvas.height : 0
        } else {
          // left
          this.x = 0
          this.y = canvas ? Math.random() * canvas.height : 0
        }

        this.size = Math.random() * 3 + 1
        this.speedX = 0
        this.speedY = 0

        // Purple gradient colors
        const colors = ["#8A2BE2", "#9F5FFF", "#B388FF"]
        this.color = colors[Math.floor(Math.random() * colors.length)]

        // Target is center initially
        this.targetX = canvas ? canvas.width / 2 : 0
        this.targetY = canvas ? canvas.height / 2 : 0

        // Current processing stage
        this.stage = 0
      }

      update(currentStage: number) {
        this.stage = currentStage

        // Update target based on stage
        if (currentStage === 0) {
          // Fetching
          this.targetX = canvas ? canvas.width / 2 : 0
          this.targetY = canvas ? canvas.height / 2 : 0
        } else if (currentStage === 1) {
          // Processing
          this.targetX = canvas ? canvas.width / 2 + (Math.random() - 0.5) * 100 : 0
          this.targetY = canvas ? canvas.height / 2 + (Math.random() - 0.5) * 100 : 0
        } else if (currentStage === 2) {
          // Embedding
          const angle = Math.random() * Math.PI * 2
          const radius = 100
          if (canvas) {
            this.targetX = canvas ? canvas.width / 2 + Math.cos(angle) * radius : 0
            this.targetY = canvas ? canvas.height / 2 + Math.sin(angle) * radius : 0
          }
        } else if (currentStage === 3) {
          // Building
          const gridX = Math.floor(Math.random() * 5)
          const gridY = Math.floor(Math.random() * 5)
          if (canvas) {
            this.targetX = canvas.width / 2 - 100 + gridX * 50
            this.targetY = canvas.height / 2 - 100 + gridY * 50
          }
        } else if (currentStage === 4) {
          // Complete
          const angle = Math.random() * Math.PI * 2
          const radius = 150
          this.targetX = canvas ? canvas.width / 2 + Math.cos(angle) * radius : 0
          this.targetY = canvas ? canvas.height / 2 + Math.sin(angle) * radius : 0
        }

        // Move towards target
        const dx = this.targetX - this.x
        const dy = this.targetY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > 0.1) {
          this.speedX = dx * 0.03
          this.speedY = dy * 0.03
        } else {
          this.speedX = 0
          this.speedY = 0
        }

        this.x += this.speedX
        this.y += this.speedY
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = 0.7
        ctx.fill()
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      codeParticles.push(new CodeParticle())
    }

    // Connect particles
    const connectParticles = () => {
      for (let i = 0; i < codeParticles.length; i++) {
        for (let j = i; j < codeParticles.length; j++) {
          const dx = codeParticles[i].x - codeParticles[j].x
          const dy = codeParticles[i].y - codeParticles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80) {
            ctx.beginPath()
            ctx.strokeStyle = "#8A2BE2"
            ctx.globalAlpha = 0.1 * (1 - distance / 80)
            ctx.lineWidth = 1
            ctx.moveTo(codeParticles[i].x, codeParticles[i].y)
            ctx.lineTo(codeParticles[j].x, codeParticles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Draw central hub
    const drawCentralHub = (currentStage: number) => {
      // Hub changes based on stage
      if (currentStage === 0) {
        // Fetching
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0, Math.PI * 2)
        ctx.fillStyle = "#8A2BE2"
        ctx.globalAlpha = 0.3
        ctx.fill()
      } else if (currentStage === 1) {
        // Processing
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, 40, 0, Math.PI * 2)
        ctx.fillStyle = "#9F5FFF"
        ctx.globalAlpha = 0.3
        ctx.fill()

        // Processing rings
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2)
        ctx.strokeStyle = "#8A2BE2"
        ctx.globalAlpha = 0.2
        ctx.lineWidth = 2
        ctx.stroke()
      } else if (currentStage === 2) {
        // Embedding
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2)
        ctx.fillStyle = "#B388FF"
        ctx.globalAlpha = 0.3
        ctx.fill()

        // Embedding rings
        for (let i = 0; i < 3; i++) {
          ctx.beginPath()
          ctx.arc(canvas.width / 2, canvas.height / 2, 60 + i * 15, 0, Math.PI * 2)
          ctx.strokeStyle = "#9F5FFF"
          ctx.globalAlpha = 0.1 - i * 0.03
          ctx.lineWidth = 2
          ctx.stroke()
        }
      } else if (currentStage === 3) {
        // Building
        // Knowledge base grid
        const gridSize = 5
        const cellSize = 20
        const startX = canvas.width / 2 - (gridSize * cellSize) / 2
        const startY = canvas.height / 2 - (gridSize * cellSize) / 2

        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            ctx.fillStyle = Math.random() > 0.7 ? "#9F5FFF" : "#4D3B72"
            ctx.globalAlpha = 0.3
            ctx.fillRect(startX + i * cellSize, startY + j * cellSize, cellSize - 2, cellSize - 2)
          }
        }
      } else if (currentStage === 4) {
        // Complete
        // Pulsing complete circle
        const time = Date.now() / 1000
        const pulseSize = 50 + Math.sin(time * 3) * 5

        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = "#8A2BE2"
        ctx.globalAlpha = 0.3
        ctx.fill()

        // Outer rings
        for (let i = 0; i < 3; i++) {
          ctx.beginPath()
          ctx.arc(canvas.width / 2, canvas.height / 2, pulseSize + 20 + i * 15, 0, Math.PI * 2)
          ctx.strokeStyle = "#B388FF"
          ctx.globalAlpha = 0.2 - i * 0.05
          ctx.lineWidth = 2
          ctx.stroke()
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw central hub
      drawCentralHub(currentStage)

      // Update and draw particles
      for (let i = 0; i < codeParticles.length; i++) {
        codeParticles[i].update(currentStage)
        codeParticles[i].draw()
      }

      // Connect particles
      connectParticles()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [currentStage])

  return (
    <div className="w-full h-full relative">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

