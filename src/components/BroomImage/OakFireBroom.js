import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense } from 'react/cjs/react.production.min'
import { OrbitControls } from '@react-three/drei'

export const OakFireBroomHtml = ({ ...props }) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/pictures/BroomSticks/broomstick3.glb')
  useFrame(() => {
    group.current.rotation.y += 0.01
  })
  
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.MainStick.geometry}
        material={materials['lambert2.001']}
        position={[6.35, -3.32, 2.78]}
        rotation={[0.93, -0.33, 2.03]}
        scale={0.94}
      />
      <mesh
        geometry={nodes.Main_Exhaust.geometry}
        material={materials['Material.001']}
        rotation={[0, 0, -Math.PI / 2]}
      />
      <mesh
        geometry={nodes.Inner_Burst.geometry}
        material={nodes.Inner_Burst.material}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.86, 0.68, 0.86]}
      />
      <mesh
        geometry={nodes.End_Wave.geometry}
        material={nodes.End_Wave.material}
        position={[-7.64, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[0.86, 0.16, 0.86]}
      />
      <mesh
        geometry={nodes.Bell_Wave.geometry}
        material={nodes.Bell_Wave.material}
        position={[-0.69, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[1, 0.19, 1]}
      />
    </group>
  )
}


export const OakFireBroom = () => {
    return(
    <Canvas>
      <OrbitControls />
      <directionalLight intensity={0.5} />
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <OakFireBroomHtml />
      </Suspense>
    </Canvas>
    )
}


useGLTF.preload('/pictures/BroomSticks/broomstick3.glb')
