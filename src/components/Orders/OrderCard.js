//Purpose: Order Card. Also has note edit form.
import React, { useEffect } from "react"
import { useContext } from "react/cjs/react.development"
import { OrderContext } from "./OrderProvider"
import Swal from "sweetalert2"
import { useState } from "react/cjs/react.development"
import {motion, AnimatePresence} from "framer-motion"
import { OrderDetail } from "./OrderDetail"



export const OrderCard = ({ order }) => {
    const { getOrderById } = useContext(OrderContext)
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true)

    //set state for the detail modal
    const [detailOpen, setDetailOpen] = useState(false)
    const close = () => setDetailOpen(false)
    const open = () => setDetailOpen(true)

    let currentTimestamp = order.orderDate
    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
    useEffect(() => {
        getOrderById()
    }, [])



    return (
        <>
            <div>
            <motion.button
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            className="orderCards"
            onClick={() => (detailOpen ? close() : open())}
            >

            <div className="orderDetails">
            <div>Order Number: {order.id}</div>
            <div>Order Status: {order.status.name}</div>
            <div>Order Date: {date}</div>
                

            </div>

            </motion.button>

            <AnimatePresence
        //Disable and initial animations on children that are present when the compent is first rendered
        initial={false}
        //Only render one component at a time.
        //The exiting componenet will finish its exit animation before entering component is rendered
        exitBeforeEnter={true}
        //Fires whel all exiting nodes have completed animating out
        
        >
         {detailOpen && <OrderDetail detailOpen={detailOpen} handleClose={close} order={order} />}
         
        </AnimatePresence>

            </div>
        </>

    )
}