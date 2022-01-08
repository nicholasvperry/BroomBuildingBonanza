import React, { useContext, useEffect, useState, useRef } from "react"
import { TailTypeContext } from "../TailType/TailTypeProvider"
import { WoodColorContext } from "../WoodColor/WoodColorProvider"
import { WoodTypeContext } from "../WoodType/WoodTypeProvider"
import "./BroomBuilder.css"
import { WoodType } from "../WoodType/WoodType"
import { WoodColor } from "../WoodColor/WoodColor"
import { TailType } from "../TailType/TailType"
import { Cart } from "../Cart/CartList"
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
import welcome from "../../images/fireWords.gif"
import {useSpring, animated, useChain} from "react-spring"
import {motion} from "framer-motion"


export const BroomBuilder = () => {
    //import state from woodType    
    const [woodTypeForCart, setWoodTypeForCart] = useState({
        woodType: 0
    })

    //import state from woodColor
    const [colorForCart, setColorForCart] = useState({
        woodColor: 0
    })

    //import state from tailType
    const [tailTypeForCart, setTailTypeForCart] = useState({
        tailType: 0
    })
    
    
   
    return (
        <>
        <motion.div 
        className="welcome"
        initial={{opacity: 1}}
        animate={{opacity: 1}}
        transition={{duration: 5}}
        >
        <motion.div 
        className="welcome"
        initial={{opacity: 1}}
        animate={{opacity: 0}}
        transition={{duration: 1, delay: 5}}
        >
        <img  className="welcome" src={welcome} alt="loading..." />
        </motion.div>
        </motion.div>

        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 3, delay: 4}}
        >
        <h1 className="header">Nearly Headless Nick's Broom Building Bonanza</h1><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <div className="broomBuilderContainer">
        <div className="broomOptions">
            <div className="woodType"><WoodType setWoodTypeForCart={setWoodTypeForCart} /></div><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
           <div className="woodColor"><WoodColor setColorForCart={setColorForCart} /></div><br></br><br></br><br></br><br></br><br></br>
           <div className="tailType"><TailType setTailTypeForCart={setTailTypeForCart} /></div><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </div>
        

        <div className="broomImage">
        {colorForCart === 1 && tailTypeForCart === 1 && <CherryBirchBroom />}
        {colorForCart === 1 && tailTypeForCart === 2 && <CherryStarBroom />}
        {colorForCart === 1 && tailTypeForCart === 3 && <CherryFireBroom />}
        {colorForCart === 1 && tailTypeForCart === 4 && <CherryLightningBroom />}
        {colorForCart === 2 && tailTypeForCart === 1 && <EbonyBirchBroom />}
        {colorForCart === 2 && tailTypeForCart === 2 && <EbonyStarBroom />}
        {colorForCart === 2 && tailTypeForCart === 3 && <EbonyFireBroom />}
        {colorForCart === 2 && tailTypeForCart === 4 && <EbonyLightningBroom />}
        {colorForCart === 3 && tailTypeForCart === 1 && <PinkBirchBroom />}
        {colorForCart === 3 && tailTypeForCart === 2 && <PinkStarBroom />}
        {colorForCart === 3 && tailTypeForCart === 3 && <PinkFireBroom />}
        {colorForCart === 3 && tailTypeForCart === 4 && <PinkLightningBroom />}
        {colorForCart === 4 && tailTypeForCart === 1 && <GoldBirchBroom />}
        {colorForCart === 4 && tailTypeForCart === 2 && <GoldStarBroom />}
        {colorForCart === 4 && tailTypeForCart === 3 && <GoldFireBroom />}
        {colorForCart === 4 && tailTypeForCart === 4 && <GoldLightningBroom />}
        </div>

        <div className="cart"><Cart  woodTypeForCart={woodTypeForCart} colorForCart={colorForCart} tailTypeForCart={tailTypeForCart}/></div>
        </div>
        </motion.div>
        
        
        </>
    )


}