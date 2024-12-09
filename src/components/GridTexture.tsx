import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

interface GridTextureProps {
  resolution: number
  gridSize: number
  onTextureCreated: (texture: THREE.Texture) => void
}

export function GridTexture({ resolution, gridSize, onTextureCreated }: GridTextureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const existingPixels = useQuery(api.pixels.getPixels)

  useEffect(() => {
    if (canvasRef.current && existingPixels) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        canvas.width = resolution
        canvas.height = resolution
        
        // Fill the entire canvas with white
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, resolution, resolution)

        // Draw grid 
        ctx.strokeStyle = '#404040'
        ctx.lineWidth = 1/(gridSize/200)

        const cellSize = resolution / gridSize

        // Draw vertical lines
        for (let i = 0; i <= resolution; i += cellSize) {
          ctx.beginPath()
          ctx.moveTo(i, 0)
          ctx.lineTo(i, resolution)
          ctx.stroke()
        }

        // Draw horizontal lines
        for (let i = 0; i <= resolution; i += cellSize) {
          ctx.beginPath()
          ctx.moveTo(0, i)
          ctx.lineTo(resolution, i)
          ctx.stroke()
        }

        // Draw existing pixels
        existingPixels.forEach((pixel) => {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.onload = () => {
            const cellSize = resolution / gridSize
            ctx.drawImage(
              img, 
              pixel.x * cellSize, 
              pixel.y * cellSize, 
              pixel.width * cellSize, 
              pixel.height * cellSize
            )

            // Update the texture after drawing all images
            const texture = new THREE.CanvasTexture(canvas)
            texture.needsUpdate = true
            onTextureCreated(texture)
          }
          img.src = pixel.image
        })

        // If no pixels exist, create the texture immediately
        if (existingPixels.length === 0) {
          const texture = new THREE.CanvasTexture(canvas)
          texture.needsUpdate = true
          onTextureCreated(texture)
        }
      }
    }
  }, [resolution, gridSize, existingPixels, onTextureCreated])

  return <canvas ref={canvasRef} style={{ display: 'none' }} />
}