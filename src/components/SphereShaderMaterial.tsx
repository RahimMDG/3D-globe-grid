import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

const SphereShaderMaterial = shaderMaterial(
  {
    time: 0,
    texture: null as THREE.Texture | null,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform sampler2D texture;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;

    void main() {
      // Improved UV mapping to reduce pole distortion
      vec2 uv = vec2(
        atan(vPosition.z, vPosition.x) / (2.0 * 3.14159) + 0.5,
        acos(vPosition.y / length(vPosition)) / 3.14159
      );

      vec4 texColor = texture2D(texture, uv);

      // Day-night cycle based on world position
      float dayNight = 0.5 + 0.5 * sin(time * 0.1 + vPosition.x);
      
      // Add shading based on normal and day-night cycle
      float shading = max(0.1, dot(vNormal, normalize(vec3(cos(time * 0.1), 1.0, sin(time * 0.1)))));
      
      vec3 color = mix(texColor.rgb * 0.2, texColor.rgb, dayNight * shading);

      gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ SphereShaderMaterial })

export { SphereShaderMaterial }

