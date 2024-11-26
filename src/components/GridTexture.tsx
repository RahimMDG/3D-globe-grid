import { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface GridTextureProps {
  resolution: number
  gridSize: number
  onTextureCreated: (texture: THREE.Texture) => void
}

export function GridTexture({ resolution, gridSize, onTextureCreated }: GridTextureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        canvas.width = resolution
        canvas.height = resolution
        
        // Fill the entire canvas with white
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, resolution, resolution)

        // Calculate padding (20% of height for top and bottom each)
        const paddingPercent = 0.1
        const paddingPixels = resolution * paddingPercent
        const usableHeight = resolution - (paddingPixels * 2)

        // Fill padding areas with a different color to indicate non-usable space
        ctx.fillStyle = '#f0f0f0' // Light grey for padding areas
        ctx.fillRect(0, 0, resolution, paddingPixels) // Top padding
        ctx.fillRect(0, resolution - paddingPixels, resolution, paddingPixels) // Bottom padding

        // Draw grid in the middle section
        ctx.strokeStyle = '#ccc'
        ctx.lineWidth = 1

        const cellSize = resolution / gridSize
        const usableCells = Math.floor(usableHeight / cellSize)
        const startY = paddingPixels

        // Draw vertical lines
        for (let i = 0; i <= resolution; i += cellSize) {
          ctx.beginPath()
          ctx.moveTo(i, startY)
          ctx.lineTo(i, resolution - paddingPixels)
          ctx.stroke()
        }

        // Draw horizontal lines
        for (let i = 0; i <= usableCells; i++) {
          const y = startY + (i * cellSize)
          if (y >= startY && y <= (resolution - paddingPixels)) {
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(resolution, y)
            ctx.stroke()
          }
        }

        const texture = new THREE.CanvasTexture(canvas)
        texture.needsUpdate = true
        onTextureCreated(texture)
      }
    }
  }, [resolution, gridSize, onTextureCreated])

  return <canvas ref={canvasRef} style={{ display: 'none' }} />
}