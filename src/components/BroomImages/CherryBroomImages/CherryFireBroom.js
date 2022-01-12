import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense } from 'react/cjs/react.production.min'
import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export const BroomImageSettings = ({ ...props }) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/pictures/cherryBroomSticks/cherryFire.glb')
  useFrame(() => {
    group.current.rotation.y -= -0.01
  })

  
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.MainStick.geometry}
        material={materials['lambert2.002']}
        rotation={[1.26, 0, 9]}
        position={[0, -1.6, 0]}
        scale={0.35}
      />
    </group>
  )
}

export const CherryFireBroom = () => {
  return (
    <Canvas>
      <OrbitControls />
      <directionalLight intensity={0.5} />
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <BroomImageSettings />
      </Suspense>
    </Canvas>
  )

}


useGLTF.preload('/pictures/cherryBroomSticks/cherryFire.glb')
