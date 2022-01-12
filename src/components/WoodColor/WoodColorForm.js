//Form for adding and editing wood colors on admin side
import React, {useState, useEffect, useContext} from "react"
import { useNavigate, useParams } from "react-router-dom";
import {WoodColorContext} from "./WoodColorProvider"
import Swal from 'sweetalert2';

export const WoodColorForm = () => {
  const {addWoodColor, getWoodColorById, getWoodColors, updateWoodColor} = useContext(WoodColorContext)
  const navigate = useNavigate()

  const [woodColor, setWoodColor] = useState({
      name: "",
      price: "",
      image: ""
  })

  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true)

  const {woodColorId} = useParams()

  //make a copy of state to manipulate
  const handleControlledInputChange = (event) => {
      //...product make a copy of current state
      const newWoodColor = {...woodColor}
  
      //Change copy. name tells which property to change
      newWoodColor[event.target.name] = event.target.value

      //update corrent copy state
      setWoodColor(newWoodColor)
      
  }

  //Saves/updates products
  const handleSaveProduct = () => {
      
      const price = parseFloat(woodColor.price)
      woodColor.price = price
      
      //Using swal make windows pop up if input is empty
      if (woodColor.name === "") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please add woodColor name!',
            position: `center`
          })
          
        } else if (parseFloat(woodColor.price) === 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please add the price!',
            position: `center`
          })
          
        } else if (woodColor.image === "") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please add image!',
            position: `center`
          })
          
        } 
        
        else {
        //invoke addEmployee passing employee as an argument.
        //once complete, change the url and display the employee list
        //disable the button - no extra clicks
      setIsLoading(true);
      
     
      if (woodColorId){
        //PUT - update
        updateWoodColor({
            id: +woodColor.id,
            name: woodColor.name,
            price: +woodColor.price,
            image: woodColor.image,
            speed: +woodColor.speed,
            acceleration: +woodColor.acceleration,
            weight: +woodColor.weight
          })
          .then(() => navigate(`/products`))
        }else {
          //POST - add
          addWoodColor({
              name: woodColor.name,
              price: +woodColor.price,
              image: woodColor.image,
              speed: +woodColor.speed,
              acceleration: +woodColor.acceleration,
              weight: +woodColor.weight
          })
          .then(() => navigate("/products"))
        }

        const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })         
           
          Toast.fire({
            icon: 'success',
            title: 'You have saved your product!'
          })
  }}

  //Get woodColors if woodColorId is in the URL, getwoodColorById
  useEffect(() => {
      getWoodColors().then(() => {
          if (woodColorId){
            getWoodColorById(woodColorId)
            .then(woodColor => {
                setWoodColor(woodColor)
                setIsLoading(false)
            })
          } else {
            setIsLoading(false)
          }
        })
      }, [])

  return (
      <>
      <form className="woodColorForm">
      <h2 className="woodColorFormTitle"> {woodColorId ? "Edit Color" : "New Color"}</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="woodColorName">Color name: </label>
          <input type="text" id="name" name="name" required autoFocus
          placeholder="Color"
          onChange={handleControlledInputChange}
          defaultValue={woodColor.name}/>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="price">Color Price: $</label>
          <input type="number" id="price" name="price" 
          onChange={handleControlledInputChange}
          required
          placeholder="Price"            
          defaultValue={woodColor.price}/>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="woodColorImage">Color Image Location: </label>
          <input type="text" id="woodColorImage" name="image" required
          placeholder="Wood Color Image Location"
          onChange={handleControlledInputChange}
          defaultValue={woodColor.image}/>
        </div>

        

        <div>
          <div className="form-group">
            <label htmlFor="woodColorSpeed">Wood Color Speed: </label>
            <input type="number" id="woodColorSpeed" name="speed" required 
            placeholder="Wood Color Speed"
            onChange={handleControlledInputChange}
            defaultValue={woodColor.speed}/>
          </div>
        </div>
        
        <div>
          <div className="form-group">
            <label htmlFor="woodColorAcceleration">Wood Color Acceleration: </label>
            <input type="number" id="woodColorAcceleration" name="acceleration" required 
            placeholder="Wood Color Acceleration"
            onChange={handleControlledInputChange}
            defaultValue={woodColor.acceleration}/>
          </div>
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="woodColorWeight">Wood Color Weight: </label>
            <input type="number" id="woodColorWeight" name="weight" required 
            placeholder="Wood Color Weight"
            onChange={handleControlledInputChange}
            defaultValue={woodColor.weight}/>
          </div>
        </div>

      </fieldset>


      
      <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault() // Prevent browser from submitting the form and refreshing the page
          handleSaveProduct()
        }}>
      {woodColorId ? <>Save Type</> : <>Add Type</>}</button>
      
      <button className="btn btn-primary" onClick={() => {
        navigate(`/products`)}}>Cancel</button>
    </form>
      
      </>
  )


}