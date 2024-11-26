import { useEffect, useRef } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Extend OrbitControls so it can be used as a JSX element
extend({ OrbitControls });

const CustomOrbitControls = () => {
  const { camera, gl } = useThree(); // Access the camera and renderer from React Three Fiber
  const controlsRef = useRef<OrbitControls>();

  useEffect(() => {
    const controls = controlsRef.current;
    if (controls) {
      controls.enableDamping = true; // Optional: Add damping for smooth control
      controls.dampingFactor = 0.05;
    }
    return () => controls?.dispose(); // Cleanup controls on unmount
  }, []);

  // Update controls on every frame
  useFrame(() => controlsRef.current?.update());

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]} // Pass the camera and DOM element
    />
  );
};

export default CustomOrbitControls;
