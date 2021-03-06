//Purpose: Wood Type Card

import React, {useEffect, useContext} from "react"
import { useNavigate, useParams } from "react-router-dom";
import {WoodTypeContext} from "./WoodTypeProvider"
import Swal from 'sweetalert2';
import {motion} from "framer-motion"


export const WoodTypeCard = ({woodType}) => {
    const {deleteWoodType, getWoodTypeById} = useContext(WoodTypeContext)
    
    
    const {woodTypeId} = useParams()
    const navigate = useNavigate()

    //Get woodtype info
    useEffect(() => {
        console.log("useEffect", woodTypeId)
        getWoodTypeById(woodTypeId)
        
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
              ).then(deleteWoodType(woodType.id)
        .then(() => {
            navigate("/products")
        }))}})}    

    return (
    <section className="productCard">
        <h3>{woodType.name}</h3>
        <div>Price: ${woodType.price}</div>
        {/* <img key={woodType.id} src={woodType.image} alT={woodType.name} /> */}

        <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}} onClick={() => {
        navigate(`/woodtypes/edit/${woodType.id}`)}}
        >Edit</motion.button>
    <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}}
        onClick={handleDelete}>Delete Type</motion.button>
    </section>

    )
}