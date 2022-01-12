import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react/cjs/react.development"
import { OrderContext } from "../Orders/OrderProvider"
import {StatusContext} from "../Status/StatusProvider"
import {motion, AnimatePresence, m} from "framer-motion"
import { ProjectCardStatus } from "./StatusUpdate"



export const MyProjectCard = ({order}) => {
  const {orders, getOrders, updateOrderStatus, returnOrder} = useContext(OrderContext)
  const {status, getStatus} = useContext(StatusContext)

  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true)
 
  
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
  }

  //To patch order. Params are order id and current user
  const handleReturnOrder = () => {
    setIsLoading(true)
    returnOrder(order.id)
    .then(getOrders)
}

  //set state for the detail modal
  const [detailOpen, setDetailOpen] = useState(false)
  const close = () => setDetailOpen(false)
  const open = () => setDetailOpen(true)



  let currentTimestamp = order.orderDate
  let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)

   
  
  
  return (
  <>
  <div className="myProjectCards projectCards" id={order.id}>
  <motion.div onClick={close}>
  <div>Customer Name: {order.user.name}</div>
  <div>Order Number: {order.id}</div>
  <div>Wood Type: {order.woodType.name}</div>
  <div>Wood Color: {order.woodColor.name}</div>
  <div>Tail Type: {order.tailType.name}</div>
  <div>Note: {order.note}</div>
  <div>Order Date: {date}</div>
  <label htmlFor="status">Status: {order.status.name}</label><br></br>
  </motion.div>
  <div>
    <motion.button
    whileHover={{scale: 1.1}}
    whileTap={{scale: 0.9}}
    className="editButton"
    onClick={() => (detailOpen ? close() : open())}
    >

    <div className="editButton button">Edit Status</div>

    </motion.button>

    <AnimatePresence
      //Disable and initial animations on children that are present when the compent is first rendered
      initial={false}
      //Only render one component at a time.
      //The exiting componenet will finish its exit animation before entering component is rendered
      exitBeforeEnter={true}
      //Fires whel all exiting nodes have completed animating out
      
      >
      {detailOpen && <ProjectCardStatus detailOpen={detailOpen} handleClose={close} order={order} />}
      <button className="button" onClick={handleReturnOrder}>Return Project</button>
        
    </AnimatePresence>

    </div>
  
  </div>
  </>
  )
  
    
}