import React, { useEffect } from "react"
import { useContext } from "react/cjs/react.development"
import { OrderContext } from "./OrderProvider"
import Swal from "sweetalert2"
import { useState } from "react/cjs/react.development"
import {motion} from "framer-motion"
import { CherryBirchBroom } from "../BroomImages/CherryBroomImages/CherryBirch"
import { CherryFireBroom } from "../BroomImages/CherryBroomImages/CherryFireBroom"
import { CherryLightningBroom } from "../BroomImages/CherryBroomImages/CherryLightning"
import { CherryStarBroom } from "../BroomImages/CherryBroomImages/CherryStar"
import { EbonyBirchBroom } from "../BroomImages/EbonyBroomImages/EbonyBirch"
import { EbonyFireBroom } from "../BroomImages/EbonyBroomImages/EbonyFire"
import { EbonyLightningBroom } from "../BroomImages/EbonyBroomImages/EbonyLightning"
import { EbonyStarBroom } from "../BroomImages/EbonyBroomImages/EbonyStar"
import { GoldBirchBroom } from "../BroomImages/GoldBroomImages/GoldBirch"
import { GoldFireBroom } from "../BroomImages/GoldBroomImages/GoldFire"
import { GoldLightningBroom } from "../BroomImages/GoldBroomImages/GoldLightning"
import { GoldStarBroom } from "../BroomImages/GoldBroomImages/GoldStar"
import { PinkBirchBroom } from "../BroomImages/PinkBroomImages/PinkBirch"
import { PinkFireBroom } from "../BroomImages/PinkBroomImages/PinkFire"
import { PinkLightningBroom } from "../BroomImages/PinkBroomImages/PinkLightning"
import { PinkStarBroom } from "../BroomImages/PinkBroomImages/PinkStar"
import { Backdrop } from "./OrderBackDrop"

export const OrderDetail = ({ order, handleClose }) => {
    const { orders, getOrders, getOrderById, updateNote } = useContext(OrderContext)
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true)

   
    useEffect(() => {
        getOrderById()
    }, [])

    let currentTimestamp = order.orderDate
    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)


    //Edit note form using swal
    const handleEditNote = () => {
        Swal.fire({
            title: 'Update Your Note',
            input: `text`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save New Note'
        }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {
                Swal.fire(
                    'Saved!',
                    'Your note has been saved.',
                    'success'
                ).then(
                    updateNote(order.id, result.value)
                        .then(getOrders)
                )
            }
        })
    }

    //Make Note Edit button show up until broom is complete
    let editButton = ""

    if (order.statusId === 7 || order.statusId === 6) {
        editButton = ""
    } else {
        editButton = <button className="button" onClick={handleEditNote}>Edit Note</button>
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
        <Backdrop onClick={handleClose}>

        <motion.div
        onClick={(e) => e.stopPropagation()}
        className="orderDetailCard"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        >
            <div className="orderDetailCardDetails" >
                <div className="orderDetails">
                <h1>Order Number: {order.id}</h1>
                <div>Order Status: {order.status.name}</div>
                <div>Wood Type: {order.woodType.name}</div>
                <div>Wood Color: {order.woodColor.name}</div>
                <div>Tail Type: {order.tailType.name}</div>
                <div>Order Date: {date}</div>
                <div className="note">
                <div>Note: {order.note}</div>

                {editButton}
                <div className="noteEditText">(You can edit your note until your broom is Complete)</div>
                </div>
                </div>

                <div className="orderImage">
                    {order.woodColor.id === 1 && order.tailType.id === 1 && <CherryBirchBroom />}
                    {order.woodColor.id === 1 && order.tailType.id === 2 && <CherryStarBroom />}
                    {order.woodColor.id === 1 && order.tailType.id === 3 && <CherryFireBroom />}
                    {order.woodColor.id === 1 && order.tailType.id === 4 && <CherryLightningBroom />}
                    {order.woodColor.id === 2 && order.tailType.id === 1 && <EbonyBirchBroom />}
                    {order.woodColor.id === 2 && order.tailType.id === 2 && <EbonyStarBroom />}
                    {order.woodColor.id === 2 && order.tailType.id === 3 && <EbonyFireBroom />}
                    {order.woodColor.id === 2 && order.tailType.id === 4 && <EbonyLightningBroom />}
                    {order.woodColor.id === 3 && order.tailType.id === 1 && <PinkBirchBroom />}
                    {order.woodColor.id === 3 && order.tailType.id === 2 && <PinkStarBroom />}
                    {order.woodColor.id === 3 && order.tailType.id === 3 && <PinkFireBroom />}
                    {order.woodColor.id === 3 && order.tailType.id === 4 && <PinkLightningBroom />}
                    {order.woodColor.id === 4 && order.tailType.id === 1 && <GoldBirchBroom />}
                    {order.woodColor.id === 4 && order.tailType.id === 2 && <GoldStarBroom />}
                    {order.woodColor.id === 4 && order.tailType.id === 3 && <GoldFireBroom />}
                    {order.woodColor.id === 4 && order.tailType.id === 4 && <GoldLightningBroom />}
                </div>

                

            </div>
            <button onClick={handleClose}>Close</button>
            </motion.div>
            </Backdrop>
        </>

    )
}