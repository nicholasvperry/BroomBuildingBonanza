import React, { useEffect } from "react"
import { useContext } from "react/cjs/react.development"
import { OrderCard } from "./OrderCard"
import { OrderContext } from "./OrderProvider"


export const OrderList = () => {
    const {orders, getOrders} = useContext(OrderContext)
    
    useEffect(() => {
        getOrders()
    }, [])
    
    
    return (
        <>
        <div className="orders">
            <h3>My Orders</h3>

        <div className="myOrderCardsContainer">{orders.filter(orders => +localStorage.activeUser === orders.userId).sort((a,b) => {return new Date(b.orderDate) - new Date(a.orderDate)}).map(order => {
        return <OrderCard key={order.id} order={order} />
       })}

        </div>
        </div>
        
        </>
    )
}