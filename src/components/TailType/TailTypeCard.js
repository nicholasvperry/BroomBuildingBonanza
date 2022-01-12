//Purpose: Card for tail types on the admin side
import React, {useEffect, useContext} from "react"
import { useNavigate, useParams } from "react-router-dom";
import {TailTypeContext} from "./TailTypeProvider";
import Swal from 'sweetalert2';
import {motion} from "framer-motion"

export const TailTypeCard = ({tailType}) => {
    const {deleteTailType, getTailTypeById} = useContext(TailTypeContext)
    
    
    const {tailTypeId} = useParams()
    const navigate = useNavigate()

    //Get tailtype info
    useEffect(() => {
        console.log("useEffect", tailTypeId)
        getTailTypeById(tailTypeId)
        
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
                'Tail type has been deleted.',
                'success'
              ).then(deleteTailType(tailType.id)
        .then(() => {
            navigate("/products")
        }))}})}    

    return (
    <section className="productCard">
        <h3>{tailType.name}</h3>
        <div>Price: ${tailType.price}</div>
        {/* <img key={tailType.id} src={tailType.image} alT={tailType.name} /> */}

        <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}} onClick={() => {
        navigate(`/tailtypes/edit/${tailType.id}`)}}
        >Edit</motion.button>

        <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}} onClick={handleDelete}>Delete Type</motion.button>
    </section>

    )
}