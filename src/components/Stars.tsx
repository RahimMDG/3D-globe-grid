import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Stars({ count = 5000 }) {
  const mesh = useRef<THREE.Points>(null)
  
  // Create positions and material in useMemo to avoid recreating on each render
  const [positions, starMaterial] = useMemo(() => {
    // Create positions array
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    
    // Create circular texture for points
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
      gradient.addColorStop(0, 'rgba(255,255,255,1)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(16, 16, 16, 0, Math.PI * 2)
      ctx.fill()
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    const material = new THREE.PointsMaterial({
      size: 0.025, // Reduced from 0.1 to make stars smaller
      map: texture,
      transparent: true,
      color: '#ffffff',
      sizeAttenuation: true,
    })
    
    return [positions, material]
  }, [count])

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0001
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <primitive object={starMaterial} />
    </points>
  )
}

