import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense } from 'react/cjs/react.production.min'
import { OrbitControls } from '@react-three/drei'

//useFrame rotates the broom automatically
//scale is the image size

const BroomImageSettings = ({ ...props }) => {
    const group = useRef()
    const { nodes, materials } = useGLTF('/pictures/ebonyBroomSticks/ebonyLightning.glb')
    useFrame(() => {
        group.current.rotation.y += 0.01
      })
      return (
        <group ref={group} {...props} dispose={null}>
          <mesh
            geometry={nodes.MainStick.geometry}
            material={materials['lambert2.002']}
            rotation={[1.64, 0.27, 0.27]}
            scale={0.25}
          />
        </group>
      )
    }
  

export const EbonyLightningBroom = () => {
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


useGLTF.preload('/pictures/ebonyBroomSticks/ebonyLightning.glb')