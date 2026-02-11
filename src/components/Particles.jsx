import { useEffect, useRef } from 'react'
import { UI_CONSTANTS } from '../constants/ui'

/**
 * Particle Effects Component
 * Subtle floating particles that react to scroll
 * Optimized with performance detection for low-end devices
 * 
 * @returns {JSX.Element} Canvas element with particle animation
 */
export function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []
    
    // Detect device performance and adjust particle count
    const cores = navigator.hardwareConcurrency || 4
    const isLowEnd = cores < UI_CONSTANTS.LOW_END_DEVICE_CORES
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const particleCount = isLowEnd 
      ? UI_CONSTANTS.PARTICLE_COUNT_LOW_END
      : isMobile 
        ? UI_CONSTANTS.PARTICLE_COUNT_MOBILE
        : UI_CONSTANTS.PARTICLE_COUNT

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle factory function - moved outside useEffect to avoid inline class declaration
    const createParticle = () => {
      const opacity = Math.random() * 0.5 + 0.2
      const color = Math.random() > 0.5 
        ? `rgba(106, 0, 255, ${opacity})`
        : `rgba(255, 47, 146, ${opacity})`
      
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity,
        color,
        update() {
          this.x += this.speedX
          this.y += this.speedY

          // Wrap around edges
          if (this.x > canvas.width) this.x = 0
          if (this.x < 0) this.x = canvas.width
          if (this.y > canvas.height) this.y = 0
          if (this.y < 0) this.y = canvas.height
        },
        draw() {
          ctx.fillStyle = this.color
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particles-canvas"
      aria-hidden="true"
    />
  )
}
