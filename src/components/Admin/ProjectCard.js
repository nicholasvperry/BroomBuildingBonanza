import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react/cjs/react.development"
import { OrderContext } from "../Orders/OrderProvider"


export const ProjectCard = ({order}) => {
    const {orders, getOrders, takeOrder, getOrderById} = useContext(OrderContext)
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
    getOrderById()
    }, [])

    //To patch order. Params are order id and current user
    const handleTakeOrder = () => {
        setIsLoading(true)
        takeOrder(order.id, +localStorage.activeUser)
        .then(getOrders)
    }

    let currentTimestamp = order.orderDate
    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)

   
   
    
    return (
    <>
    <div className="projectCards" >
    <div>Customer Name: {order.user.name}</div>
    <div>Order Number: {order.id}</div>
    <div>Wood Type: {order.woodType.name}</div>
    <div>Wood Color: {order.woodColor.name}</div>
    <div>Tail Type: {order.tailType.name}</div>
    <div>Note: {order.note}</div>
    <div>Order Date: {date}</div>
    <button className="button" onClick={handleTakeOrder}>Take Project</button>

    </div>
    </>
   )
    
}