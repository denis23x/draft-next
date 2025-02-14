"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

function Model() {
  // Load the GLTF file
  const { scene, animations } = useGLTF("/test.glb"); // Adjust path
  const { actions } = useAnimations(animations, scene);

  React.useEffect(() => {
    // Play the animation
    if (actions) {
      actions[animations[0].name]?.play();
      // actions["Waving"]?.play(); // Replace with your animation name
    }
  }, [actions]);

  return <primitive object={scene} scale={1.5} />;
}

export default function Test() {
  return (
    <Canvas camera={{position: [0, 2, 5]}} style={{width: "100%", height: "100vh"}}>
      <ambientLight intensity={2.5}/>
      <spotLight position={[10, 10, 10]} angle={0.15}/>
      <Suspense fallback={null}>
        <Model/>
      </Suspense>
      <OrbitControls target={[0, 1, 0]} maxDistance={5}/>
    </Canvas>
  );
}
