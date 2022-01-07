import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react/cjs/react.development"
import { OrderContext } from "../Orders/OrderProvider"
import {StatusContext} from "../Status/StatusProvider"
import { Box, Grommet, Layer, Button } from 'grommet'



export const MyProjectCard = ({order}) => {
  const {orders, getOrders, updateOrderStatus} = useContext(OrderContext)
  const {status, getStatus} = useContext(StatusContext)
  const navigate = useNavigate()
  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true)
  
  const [orderStatus, setOrderStatus] = useState({
    orderStatus: order.status.id
  })

  //State for modal
  const [show, setShow] = useState()

  useEffect(() => {
      getOrders()
      .then(getStatus)
  }, [])
  
  //To patch order. Params are order id and current user. Then close the modal
    const handleStatusUpdate = (statusId) => {
      updateOrderStatus(order.id, +statusId)
      .then(getOrders)
      .then(setShow(false))
  }


  let currentTimestamp = order.orderDate
  let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)

   
  
  
  return (
  <>
  <div className="myProjectCards projectCards" id={order.id}>
  <div>Customer Name: {order.user.name}</div>
  <div>Order Number: {order.id}</div>
  <div>Wood Type: {order.woodType.name}</div>
  <div>Wood Color: {order.woodColor.name}</div>
  <div>Tail Type: {order.tailType.name}</div>
  <div>Note: {order.note}</div>
  <div>Order Date: {date}</div>
  <label htmlFor="status">Status: {order.status.name}</label><br></br>
  <div className="updateModal">
  <Box>  
    <Button className="button" label="Update Status" onClick={() => setShow(true)} />
    {show && (
      <Layer
      onEsc={() => setShow(false)}
      onClickOutside={() => setShow(false)}>
      
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
      </Layer>
        
    )}
  
  </Box>
  </div>
  
  </div>
  </>
  )
  
    
}