import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TailTypeContext } from "./TailTypeProvider";
import Swal from 'sweetalert2';

export const TailTypeForm = () => {
    const {addTailType, getTailTypeById, getTailTypes, updateTailType} = useContext(TailTypeContext)
    const navigate = useNavigate()

    const [tailType, setTailType] = useState({
        name: "",
        price: "",
        image: ""
    })

    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true)

    const {tailTypeId} = useParams()

    //make a copy of state to manipulate
    const handleControlledInputChange = (event) => {
        //...product make a copy of current state
        const newTailType = {...tailType}
    
        //Change copy. name tells which property to change
        newTailType[event.target.name] = event.target.value

        //update corrent copy state
        setTailType(newTailType)
        
    }

    //Saves/updates products
    const handleSaveProduct = () => {
        
        const price = parseFloat(tailType.price)
        tailType.price = price
        
        //Using swal make windows pop up if input is empty
        if (tailType.name === "") {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Please add tailType name!',
              position: `center`
            })
            
          } else if (parseFloat(tailType.price) === 0) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Please add the price!',
              position: `center`
            })
            
          } else if (tailType.image === "") {
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
        
       
        if (tailTypeId){
          //PUT - update
          updateTailType({
              id: +tailType.id,
              name: tailType.name,
              price: +tailType.price,
              image: tailType.image,
              speed: +tailType.speed,
              acceleration: +tailType.acceleration,
              weight: +tailType.weight
            })
            .then(() => navigate(`/products`))
          }else {
            //POST - add
            addTailType({
                name: tailType.name,
                price: +tailType.price,
                image: tailType.image,
                speed: +tailType.speed,
                acceleration: +tailType.acceleration,
                weight: +tailType.weight
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

    //Get tailTypes if tailTypeId is in the URL, getTailTypeById
    useEffect(() => {
        getTailTypes().then(() => {
            if (tailTypeId){
              getTailTypeById(tailTypeId)
              .then(tailType => {
                  setTailType(tailType)
                  setIsLoading(false)
              })
            } else {
              setIsLoading(false)
            }
          })
        }, [])

    return (
        <>
        <form className="tailTypeForm">
        <h2 className="tailTypeFormTitle"> {tailTypeId ? "Edit Tail Type" : "New Tail Type"}</h2>
        <div>
          <div className="tTypeName">
            <label htmlFor="tailTypeName">Tail name: </label>
            <input type="text" id="tailTypeName" name="name" required autoFocus 
            placeholder="Tail Type name"
            onChange={handleControlledInputChange}
            defaultValue={tailType.name}/>
          </div>
        </div>

        <div>
          <div className="tTypePrice">
            <label htmlFor="price">Tail Type Price: $</label>
            <input type="number" id="price" name="price" 
            onChange={handleControlledInputChange}
            required 
            placeholder="Price"            
            defaultValue={tailType.price}/>
          </div>
        </div>

        <div>
          <div className="form-group">
            <label htmlFor="tailTypeImage">Tail Image Location: </label>
            <input type="text" id="image" name="image" required 
            placeholder="Tail Image Location"
            onChange={handleControlledInputChange}
            defaultValue={tailType.image}/>
          </div>
        </div>
        
        <div>
          <div className="form-group">
            <label htmlFor="tailTypeSpeed">Tail Speed: </label>
            <input type="number" id="tailTypeSpeed" name="speed" required 
            placeholder="Tail Speed"
            onChange={handleControlledInputChange}
            defaultValue={tailType.speed}/>
          </div>
        </div>
        
        <div>
          <div className="form-group">
            <label htmlFor="tailTypeAcceleration">Tail Acceleration: </label>
            <input type="number" id="tailTypeAcceleration" name="acceleration" required 
            placeholder="Tail Acceleration"
            onChange={handleControlledInputChange}
            defaultValue={tailType.acceleration}/>
          </div>
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="tailTypeWeight">Tail Weight: </label>
            <input type="number" id="tailTypeWeight" name="weight" required 
            placeholder="Tail Weight"
            onChange={handleControlledInputChange}
            defaultValue={tailType.weight}/>
          </div>
        </div>


        
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveProduct()
          }}>
        {tailTypeId ? <>Save Type</> : <>Add Tail Type</>}</button>

        <button className="btn btn-primary" onClick={() => {
        navigate(`/products`)}}>Cancel</button>
      </form>
        
        </>
    )


}