import React from "react"
import { useContext, useEffect } from "react/cjs/react.development"
import { OrderContext } from "../Orders/OrderProvider"
import { MyProjectCard } from "./MyProjectCard"
import { ProjectCard } from "./ProjectCard"


export const AdminList = () => {
    const {orders, getOrders} = useContext(OrderContext)

    useEffect(() => {
        getOrders()
    }, [])


    return (
        <>
        <div className="allProjects">
        <div className="myProjects">
        <h2>My Projects</h2>

        {/* filter through orders to find the ones that we need and then sort them by oldest orders */}
        <div className="myProjectCardsContainer">{orders.filter(orders => +localStorage.activeUser === orders.adminUserId).sort((a,b) => {return new Date(a.orderDate) - new Date(b.orderDate)}).map(order => {
           return <MyProjectCard key={order.id} order={order} />
       })}
       
       </div>
       </div>
        
        <div className="openProjects">
        <h2>Open Projects</h2>
        {/* filter through orders to find the ones that we need and then sort them by oldest orders */}
        <div className="openProjectCardsContainer">{orders.filter(orders => orders.adminUserId === 0).sort((a,b) => {return new Date(a.orderDate) - new Date(b.orderDate)}).map(order => {
           return <ProjectCard key={order.id} order={order} />
       })}
       
       </div>
       </div>
       </div>

        </>
    )
}