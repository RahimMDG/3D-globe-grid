import React, { useMemo, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

export function Stars({ 
  size = 1000 
}) {
  // Create a star texture
  const starTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 2048
    const ctx = canvas.getContext('2d')
    
    if (ctx) {
      // Fill background with deep black
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Generate stars
      const starsCount = 5000
      for (let i = 0; i < starsCount; i++) {
        // Random position
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        
        // Create star
        ctx.beginPath()
        
        // Varying star sizes
        const size = 0.2 + Math.random() * 0.5
        
        // Create radial gradient for softer star look
        const gradient = ctx.createRadialGradient(
          x, y, 0, 
          x, y, size
        )
        gradient.addColorStop(0, 'rgba(255,255,255,0.8)')
        gradient.addColorStop(1, 'rgba(255,255,255,0)')
        
        ctx.fillStyle = gradient
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    return new THREE.CanvasTexture(canvas)
  }, [])

  return (
    <mesh>
      <boxGeometry args={[size, size, size]} />
      <meshBasicMaterial 
        map={starTexture}
        side={THREE.BackSide}  // Render only the inside of the box
      />
    </mesh>
  )
}