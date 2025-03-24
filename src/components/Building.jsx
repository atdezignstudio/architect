
import React from 'react';
import { useFrame } from '@react-three/fiber';

export const Building = () => {
  const buildingRef = React.useRef();

  useFrame(() => {
    if (buildingRef.current) {
      buildingRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={buildingRef}>

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 4, 2]} />
        <meshPhongMaterial color="#FFBF00" />
      </mesh>
      
   
      {[-0.5, 0.5].map((x) =>
        [-0.5, 0.5, 1.5].map((y) =>
          <mesh key={`${x}-${y}`} position={[x, y, 1.01]}>
            <boxGeometry args={[0.3, 0.3, 0.1]} />
            <meshPhongMaterial color="#000000" />
          </mesh>
        )
      )}
      
  
      <mesh position={[0, 2.2, 0]}>
        <coneGeometry args={[1.5, 1, 4]} />
        <meshPhongMaterial color="#000000" />
      </mesh>
    </group>

  );
};

export default Building;
 