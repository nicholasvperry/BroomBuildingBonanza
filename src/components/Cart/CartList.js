import React, { useContext, useEffect, useState } from "react"
import { BroomBuilder } from "../BroomBuilder/BroomBuilder";
import { OrderContext } from "../Orders/OrderProvider";
import { TailTypeContext } from "../TailType/TailTypeProvider";
import { WoodColorContext } from "../WoodColor/WoodColorProvider";
import { WoodTypeContext } from "../WoodType/WoodTypeProvider";
import { useNavigate } from "react-router";

export const Cart = ({woodTypeForCart, colorForCart, tailTypeForCart}) => {
  //Give access to components needed
  const {addOrder} = useContext(OrderContext)
  const {tailTypes, getTailTypes} = useContext(TailTypeContext)
  const {woodColors, getWoodColors} = useContext(WoodColorContext)
  const {woodTypes, getWoodTypes} = useContext(WoodTypeContext)

  const navigate = useNavigate()

  //make timstamp
  const currentTimestamp = Date.now()
  //format timestamp in for card. Not used here.
  let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)


  //wait for data before button is active
  //Button greys out until state is changed.
  const [isLoading, setIsLoading] = useState(true);

  //Set state for not in case no note is inserted
  const [note, setNote] = useState({
    "note": ""
  })

  

  //Get data needed
  useEffect(() => {
    getTailTypes()
    .then(getWoodColors)
    .then(getWoodTypes)
  }, [])
   
   
  //when field changes, update state. This causes a re-render and updates the view.
  const handleControlledInputChange = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newNote = { ...note }
    //note is an object with properties.
    //set the property to the new value
    //if we want to target id [event.target.id]
    newNote[event.target.name] = event.target.value
    //update state
    setNote(newNote)
  }

  //Map through woodTypes to find the one matching woodTypeForCart
  let woodTypeMap = woodTypes?.find(x => x.id === woodTypeForCart)
  //Map through woodColors to find the one matching woodColorForCart
  const woodColorMap = woodColors?.find(x => x.id === colorForCart)
  //Map through tailTypes to find the one matching tailTypeForCart
  let tailTypeMap = tailTypes?.find(x => x.id === tailTypeForCart)
  //Calculate total Price
  const totalPrice = (woodTypeMap?.price + woodColorMap?.price + tailTypeMap?.price)

  //Make function to save order
  const handleOrderBroom = () => {
    //setIsLoading disables the button - no extra clicks
    setIsLoading(true);

    //Add order to database
    addOrder({
      "userId": +localStorage.activeUser,
      "woodTypeId": woodTypeForCart,
      "woodColorId": colorForCart,
      "tailTypeId": tailTypeForCart,
      "statusId": 1,
      "note": note.note,
      "price": totalPrice,
      "adminUserId": 0,
      "orderDate": currentTimestamp
    })
    .then(() => navigate(`/orders`))
  }

  

  return(
    <section>
      <div className="cartItems">
      <h2>Cart</h2>
        
        <div className="cartWoodType">Wood Type: {woodTypeMap?.name}
        </div>

        <div className="cartWoodColor">Wood Color: {woodColorMap?.name}</div>
        <div className="cartTail">Tail: {tailTypeMap?.name}</div>
        <div className="cartTail">Price: ${totalPrice}</div>
        
        <fieldset>
        <div className="form-group">
          <label htmlFor="orderNote">Add note (optional): </label>
          <input type="text" id="orderNote" name="note" required className="form-control"
          placeholder="Ex. Happy Birthday"
          onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
        <button className="purchaseButton"
        onClick={event => {
          event.preventDefault()
          handleOrderBroom()
        }}>Purchase</button>
        </div>
    </section>
  )
}