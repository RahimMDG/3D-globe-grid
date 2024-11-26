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
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, resolution, resolution)
        ctx.strokeStyle = '#ccc'
        ctx.lineWidth = 1

        const cellSize = resolution / gridSize

        for (let i = 0; i <= resolution; i += cellSize) {
          ctx.beginPath()
          ctx.moveTo(i, 0)
          ctx.lineTo(i, resolution)
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(0, i)
          ctx.lineTo(resolution, i)
          ctx.stroke()
        }

        const texture = new THREE.CanvasTexture(canvas)
        texture.needsUpdate = true
        onTextureCreated(texture)
      }
    }
  }, [resolution, gridSize, onTextureCreated])

  return <canvas ref={canvasRef} style={{ display: 'none' }} />
}

