import React, { useContext, useEffect, useState } from "react"
import { TailTypeContext } from "../TailType/TailTypeProvider"
import { WoodColorContext } from "../WoodColor/WoodColorProvider"
import { WoodTypeContext } from "../WoodType/WoodTypeProvider"
import "./BroomBuilder.css"
import { WoodType } from "../WoodType/WoodType"
import { WoodColor } from "../WoodColor/WoodColor"
import { TailType } from "../TailType/TailType"
import { Cart } from "../Cart/CartList"
import { FinishedImage } from "../BroomImage/BroomImage"



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
        <h1 className="header">Nearly Headless Nick's Broom Building Bonanza</h1><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <div className="broomBuilderContainer">
        <div className="broomOptions">
            <div className="woodType"><WoodType setWoodTypeForCart={setWoodTypeForCart} /></div><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
           <div className="woodColor"><WoodColor setColorForCart={setColorForCart} /></div><br></br><br></br><br></br><br></br><br></br>
           <div className="tailType"><TailType setTailTypeForCart={setTailTypeForCart} /></div><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </div>

        <div className="broomImage"><FinishedImage /></div>
        <div className="cart"><Cart  woodTypeForCart={woodTypeForCart} colorForCart={colorForCart} tailTypeForCart={tailTypeForCart}/></div>
        </div>
        </>
      )


}