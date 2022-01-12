//Purpose: Wood Type form for both new wood types and editing wood types.

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { WoodTypeContext } from "./WoodTypeProvider";
import Swal from 'sweetalert2';

export const WoodTypeForm = () => {
    const {addWoodType, getWoodTypeById, getWoodTypes, updateWoodType} = useContext(WoodTypeContext)
    const navigate = useNavigate()

    const [woodType, setWoodType] = useState({
        name: "",
        price: "",
        image: "n/a"
    })

    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true)

    const {woodTypeId} = useParams()

    //make a copy of state to manipulate
    const handleControlledInputChange = (event) => {
        //...product make a copy of current state
        const newWoodType = {...woodType}
    
        //Change copy. name tells which property to change
        newWoodType[event.target.name] = event.target.value

        //update corrent copy state
        setWoodType(newWoodType)
        
    }

    //Saves/updates products
    const handleSaveProduct = () => {
        
        const price = parseFloat(woodType.price)
        woodType.price = price
        
        //Using swal make windows pop up if input is empty
        if (woodType.name === "") {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Please add woodType name!',
              position: `center`
            })
            
          } else if (parseFloat(woodType.price) === 0) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Please add the price!',
              position: `center`
            })
            
          } else if (woodType.image === "") {
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
        
       
        if (woodTypeId){
          //PUT - update
          updateWoodType({
              id: woodType.id,
              name: woodType.name,
              price: woodType.price,
              image: woodType.image
            })
            .then(() => navigate(`/products`))
          }else {
            //POST - add
            addWoodType({
                name: woodType.name,
                price: woodType.price,
                typeId: woodType.typeId
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

    //Get woodTypes if woodTypeId is in the URL, getWoodTypeById
    useEffect(() => {
        getWoodTypes().then(() => {
            if (woodTypeId){
              getWoodTypeById(woodTypeId)
              .then(woodType => {
                  setWoodType(woodType)
                  setIsLoading(false)
              })
            } else {
              setIsLoading(false)
            }
          })
        }, [])

    return (
        <>
        <form className="woodTypeForm">
        <h2 className="woodTypeFormTitle"> {woodTypeId ? "Edit Wood Type" : "New Wood Type"}</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="woodTypeName">Wood name: </label>
            <input type="text" id="woodTypeName" name="name" required autoFocus 
            placeholder="Wood Type name"
            onChange={handleControlledInputChange}
            defaultValue={woodType.name}/>
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="price">Wood Type Price: $</label>
            <input type="number" id="price" name="price" 
            onChange={handleControlledInputChange}
            required 
            placeholder="Price"            
            defaultValue={woodType.price}/>
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="woodTypeImage">Wood Image Location: </label>
            <input type="text" id="woodTypeImage" name="image" required 
            placeholder="Wood Type Image Location"
            onChange={handleControlledInputChange}
            defaultValue={woodType.image}/>
          </div>
        </fieldset>


        
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveProduct()
          }}>
        {woodTypeId ? <>Save Type</> : <>Add Type</>}</button>
      </form>
        
        </>
    )


}