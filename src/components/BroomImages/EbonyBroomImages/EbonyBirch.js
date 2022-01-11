import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense } from 'react/cjs/react.production.min'
import { OrbitControls } from '@react-three/drei'

//useFrame rotates the broom automatically
//scale is the image size

const BroomImageSettings = ({ ...props }) => {
    const group = useRef()
    const { nodes, materials } = useGLTF('/pictures/ebonyBroomSticks/ebonyBirch.glb')
    //Make image rotate
    useFrame(() => {
        group.current.rotation.y -= -0.01
      })
    return (
      <group ref={group} {...props} dispose={null}>
        <mesh
          geometry={nodes.MainStick.geometry}
          material={materials['lambert2.003']}
          rotation={[1.75, 0, 9]}
          position={[0, -1.5, 0]}
          scale={0.35}
        />
      </group>
    )
  }
  

export const EbonyBirchBroom = () => {
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


useGLTF.preload('/pictures/ebonyBroomSticks/ebonyBirch.glb')