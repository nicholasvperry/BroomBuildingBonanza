//Purpose: Card for wood colors on the admin side
import React, {useState, useEffect, useContext} from "react"
import { useNavigate, useParams } from "react-router-dom";
import {WoodColorContext} from "./WoodColorProvider"
import Swal from 'sweetalert2';
import {motion} from "framer-motion"

export const WoodColorCard = ({woodColor}) => {
    const {deleteWoodColor, getWoodColorById} = useContext(WoodColorContext)
    
    
    const {woodColorId} = useParams()
    const navigate = useNavigate()
    console.log(woodColorId)
    //Get woodColor info
    useEffect(() => {
        console.log("useEffect", woodColorId)
        getWoodColorById(woodColorId)
        
        }, [])

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to undelete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Wood color has been deleted.',
                'success'
              ).then(deleteWoodColor(woodColor.id)
        .then(() => {
            navigate("/products")
        }))
        }})}


    return (
    <section className="productCard">
        <h3>{woodColor.name}</h3>
        <div>Price: ${woodColor.price}</div>
        {/* <img key={woodColor.id} src={woodColor.image} alT={woodColor.name} /> */}

        <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}} onClick={() => {
        navigate(`/woodcolors/edit/${woodColor.id}`)}}
        >Edit</motion.button>
        <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}}
        onClick={handleDelete}>Delete Type</motion.button>
    </section>

    )
}