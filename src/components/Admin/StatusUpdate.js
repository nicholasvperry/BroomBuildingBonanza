import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react/cjs/react.development"
import { OrderContext } from "../Orders/OrderProvider"
import {StatusContext} from "../Status/StatusProvider"
import {motion} from "framer-motion"
import {ProjectBackdrop} from "./ProjectBackDrop"



export const ProjectCardStatus = ({order, handleClose}) => {
  const {orders, getOrders, updateOrderStatus} = useContext(OrderContext)
  const {status, getStatus} = useContext(StatusContext)
  
  
  const [orderStatus, setOrderStatus] = useState({
    orderStatus: order.status.id
  })

  
  useEffect(() => {
      getOrders()
      .then(getStatus)
  }, [])
  
  //To patch order. Params are order id and current user. Then close the modal
    const handleStatusUpdate = (statusId) => {
      updateOrderStatus(order.id, +statusId)
      .then(getOrders)
      .then(handleClose(false))
  }


//Modal Animation
const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        }
    },
    exit: {
        y: "100vh",
        opacity: 0,

    }
}
  
  
  return (
  <>
    <ProjectBackdrop onClick={handleClose}>

<motion.div
onClick={(e) => e.stopPropagation()}
className="orderDetailCard"
variants={dropIn}
initial="hidden"
animate="visible"
exit="exit"
>
<fieldset className="updateModal">
    <div className="status">
      <label htmlFor="status">Status: {order.status.name}</label><br></br>
      <select onChange={e=> {
        handleStatusUpdate(e.target.value)
      }} name="statusId" id="orderStatus" className="statusDropDown" >
        <option >Update Status</option>
        {status.map(s => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
          </select>
    </div>
</fieldset>
      

      
        
</motion.div>
</ProjectBackdrop>
  
  </>
  )
  
    
}