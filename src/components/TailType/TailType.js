import React, { useContext, useEffect, useState } from "react"
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { TailTypeContext } from "./TailTypeProvider";


export const TailType = ({setTailTypeForCart}) => {

  const {tailTypes, getTailTypes} = useContext(TailTypeContext)
  const [imageIndex, setImageIndex] = useState(0);
  
  
  useEffect(() => {
      getTailTypes()
  }, [])

   //State Properties
  //for edit, hold on to state of animal in this view
  const [type, setType] = useState({})
 

  //when field changes, update state. This causes a re-render and updates the view.
  //Controlled component
  const handleControlledInputChange = (typeObj) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newType = { ...type }
    //animal is an object with properties.
    //set the property to the new value    
    newType[typeObj.target.name] = typeObj.target.id
    //update state
    setType(newType)
  }
  
   //Passing state to parent
  //any time imageIndexchanges
  useEffect(() => {
    setTailTypeForCart((+imageIndex + 1))
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
    <div className="TailType">
        <div className="TypeHeader">Tail Type</div>
      <Slider {...settings}>
        {tailTypes.map((tailtype, idx) => (
          <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
            <img key={tailtype.id} src={tailtype.image} alt={tailtype.name} />
            <div className="tailTypeName">{tailtype.name}</div>
            <div className="TailTypePrice">Price ${tailtype.price}</div>
          </div>
            
        ))}
      </Slider>
      
    </div>
  );
  }