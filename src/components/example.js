 {/* Home render when http://localhost:3000/articles */}
 <Route exact path="articles/*" element={<ArticleList />} />
{/* Article form */}
<Route path="articles/create/*" element={<ArticleForm />} />

{/* editArticls form */}
<Route path="articles/edit/:articleId/*" element={<ArticleForm />} />

<Route path="tasks/*" element={<TaskList />} />
<Route path="tasks/create/*" element={<TaskForm />} />
<Route path="tasks/edit/:taskId/*" element={<TaskForm />} />

<Route path="events/*" element={<EventList />} />
<Route path="events/create/*" element={<EventForm />} />
<Route path="events/edit/:eventId/*" element={<EventForm />} />


import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/broom.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.MainStick_lambert2_0.geometry} material={materials.lambert2} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/broom.glb')