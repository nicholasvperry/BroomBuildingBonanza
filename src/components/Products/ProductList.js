//Lists all products. Gives ability to add/delete/edit products
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TailTypeContext } from "../TailType/TailTypeProvider"
import {TailTypeCard} from "../TailType/TailTypeCard"
import { WoodColorContext } from "../WoodColor/WoodColorProvider"
import { WoodColorCard } from "../WoodColor/WoodColorCard"
import { WoodTypeContext } from "../WoodType/WoodTypeProvider"
import { WoodTypeCard } from "../WoodType/WoodTypeCard"
import "./Product.css"
import {motion} from "framer-motion"


export const ProductList = () => {
    const {tailTypes, getTailTypes} = useContext(TailTypeContext)
    const {woodColors, getWoodColors} = useContext(WoodColorContext)
    const {woodTypes, getWoodTypes} = useContext(WoodTypeContext)
    const navigate = useNavigate()

    //get information needed
    useEffect(() => {
        getTailTypes()
        .then(getWoodColors)
        .then(getWoodTypes)
    }, [])



    return (
      <div className="products">
      
      
      <div className="tailTypesCards">  
      <h1>Tail Types</h1>
      <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}} onClick={() => navigate("/tailtypes/create")}>
            New Tail Type
        </motion.button>
        {/* map through tail types and return all tail types in the TailTypeCard */}
        <div className="tailTypes">
      
        {
        tailTypes.map(tailTypeObj => {
          return <TailTypeCard key={tailTypeObj.id} tailType={tailTypeObj} />

          
        })
        }   
  
    </div></div>

    <div className="woodTypeCards">  
    <h1>Wood Types</h1>
    <motion.button
      whileHover={{scale: 1.1}}
      whileTap={{scale: 0.9}} onClick={() => navigate("/woodtypes/create")}>New Wood Type
      </motion.button>

      {/* map through wood types and return all wood types in the WoodTypeCard */}
      <div className="woodTypes">
    
      {
      woodTypes.map(woodTypeObj => {
        return <WoodTypeCard key={woodTypeObj.id} woodType={woodTypeObj} />

        
      })
      }   

    </div></div>


    <div className="woodColorCards">  
    <h1>Wood Colors</h1>
    <motion.button
      whileHover={{scale: 1.1}}
      whileTap={{scale: 0.9}}
      onClick={() => navigate("/woodcolors/create")}>
          New Wood Color
      </motion.button>

      {/* map through wood colors and return all wood colors in the WoodColorCard */}
      <div className="woodColors">
    
      {
      woodColors.map(woodColorObj => {
        return <WoodColorCard key={woodColorObj.id} woodColor={woodColorObj} />

        
      })
      }   

      </div></div>

      </div>
    )
}