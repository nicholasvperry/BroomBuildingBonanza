import React, { useContext, useEffect, useState } from "react"
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft, IoIosArrowForward } from "react-icons/fa";
import "./WoodType.css"
import { WoodTypeContext } from "./WoodTypeProvider";
import left from "../../images/leftB.png"
import right from "../../images/rightB.png"






export const WoodType = ({setWoodTypeForCart}) => {

  const {woodTypes, getWoodTypes} = useContext(WoodTypeContext)
  const [imageIndex, setImageIndex] = useState(0);
  
  //get access to wood tpyes
  useEffect(() => {
    getWoodTypes()
  }, [])

  //State Properties
  //for edit, hold on to state of animal in this view
  // const [type, setType] = useState({})
 

  // //when field changes, update state. This causes a re-render and updates the view.
  // //Controlled component
  // const handleControlledInputChange = (typeObj) => {
  //   //When changing a state object or array,
  //   //always create a copy make changes, and then set state.
  //   const newType = { ...type }
  //   //animal is an object with properties.
  //   //set the property to the new value    
  //   newType[typeObj.target.name] = typeObj.target.id
  //   //update state
  //   setType(newType)
  // }

  //Passing state to parent
  //any time imageIndexchanges
  useEffect(() => {
    setWoodTypeForCart((+imageIndex + 1))
  }, [imageIndex])

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick} style={{background: "#2e2b29"}}>
        <FaArrowRight />
      </div>
    );
  };
  
  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick} style={{background: "#2e2b29"}}>
        <FaArrowLeft />
      </div>
    );
  };

  

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };
  
  return (
    <div className="WoodType">
        <div className="TypeHeader">Wood Type</div> 
      <Slider {...settings}>
        
        {woodTypes.map((woodtype, idx) => (
          <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
            <img key={woodtype.id} src={woodtype.image} alt={woodtype.name} id={woodtype.id} name="woodtype"  woodtype={woodtype}/>
            <div className="TypePrice">Price ${woodtype.price}</div>
          </div>
          
        ))}
      </Slider>
    </div>
  );
}