import React, { useEffect, useState } from "react"
import { useContext } from "react/cjs/react.development"
import { OrderCard } from "./OrderCard"
import { OrderContext } from "./OrderProvider"
import {motion, AnimatePresence} from "framer-motion"
import { OrderDetail } from "./OrderDetail"


export const OrderList = () => {
    const {orders, getOrders} = useContext(OrderContext)

    //set state for the detail modal
    const [detailOpen, setDetailOpen] = useState(false)
    const close = () => setDetailOpen(false)
    const open = () => setDetailOpen(true)

    
    useEffect(() => {
        getOrders()
    }, [])
    
    
    return (
        <>
        <div className="myOrders">
            <h3>My Orders</h3>

        
        <div className="myOrderCardsContainer">{orders.filter(orders => +localStorage.activeUser === orders.userId).sort((a,b) => {return new Date(b.orderDate) - new Date(a.orderDate)}).map(order => {
        return (
            <>
        <div>        
        <OrderCard key={order.id} order={order} />
        </div>

        
        
        </>
        )
       })}
        
      

        </div>
        </div>
        
        </>
    )
}