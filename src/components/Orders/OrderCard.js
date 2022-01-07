//Purpose: Order Card. Also has note edit form.
import React, { useEffect } from "react"
import { useContext } from "react/cjs/react.development"
import { OrderContext } from "./OrderProvider"
import Swal from "sweetalert2"
import { useState } from "react/cjs/react.development"


export const OrderCard = ({ order }) => {
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


    return (
        <>
            <div className="projectCards" >
                <div>Order Number: {order.id}</div>
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
        </>

    )
}