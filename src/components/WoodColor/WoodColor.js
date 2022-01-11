import React, { useContext, useEffect, useState } from "react"
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "./WoodColor.css"
import { WoodColorContext } from "./WoodColorProvider";




export const WoodColor = ({setColorForCart}) => {

  const {woodColors, getWoodColors} = useContext(WoodColorContext)
  const [imageIndex, setImageIndex] = useState(0);
  
  useEffect(() => {
      getWoodColors()
  }, [])

  
  //State Properties
  //for edit, hold on to state of animal in this view
  const [color, setColor] = useState({})
  
   //when field changes, update state. This causes a re-render and updates the view.
  //Controlled component
  const handleControlledInputChange = (colorObj) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newColor = { ...color }
    //animal is an object with properties.
    //set the property to the new value    
    newColor[colorObj.target.name] = colorObj.target.id
    //update state
    setColor(newColor)
  }

  //Passing state to parent
  //any time imageIndexchanges
  useEffect(() => {
    setColorForCart((+imageIndex + 1))
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
    <div className="WoodColor">
        <div className="TypeHeader">Wood Color</div>
        <Slider {...settings}>
        {woodColors.map((woodColor, idx) => (
          <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
            <img key={woodColor.id} src={woodColor.image} alt={woodColor.name} name="woodcolor" onChange={handleControlledInputChange} />

          <div className="ColorPrice">Price ${woodColor.price}</div>

          </div>
          
          
        ))}
      </Slider>
    </div>
  );
  }