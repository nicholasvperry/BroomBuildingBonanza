{woodTypes.map(woodType => {
    const woodTypeByContext = woodType.filter(w => w.id === woodType)
  })}

  const handleTakeOrder = () => {
    setIsLoading(true)
    updateOrder({
        "customerId": order.userId,
        "woodTypeId": order.woodTypeId,
        "woodColorId": order.woodColorId,
        "tailTypeId": order.tailTypeId,
        "statusId": 1,
        "note": order.note,
        "price": order.price,
        "adminUserId": +localStorage.activeUser,
        "orderDate": order.orderDate
    })
    .then(() => navigate("/admin"))
}

const handleEditNote = () => {
  Swal.fire({
      title: 'Update Your Note',
      input: `text`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save New Note'
      }).then((result) => {
      if (result.isConfirmed) {
          Swal.fire(
          'Saved!',
          'Your note has been saved.',
          'success'
          ).then(
  updateNote(order.id, input)
  .then(getOrders)
          )}})}

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
                      id: woodColor.id,
                      name: woodColor.name,
                      price: woodColor.price,
                      image: woodColor.image
                    })
                    .then(() => navigate(`/products`))
                  }else {
                    //POST - add
                    addWoodColor({
                        name: woodColor.name,
                        price: woodColor.price,
                        typeId: woodColor.typeId
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
                    <label htmlFor="woodColorName">Wood Color: </label>
                    <input type="text" id="woodColorName" name="name" required autoFocus className="form-control"
                    placeholder="Wood Color"
                    onChange={handleControlledInputChange}
                    defaultValue={woodColor.name}/>
                  </div>
                </fieldset>
        
                <fieldset>
                  <div className="form-group">
                    <label htmlFor="price">Wood Stain Price: $</label>
                    <input type="number" id="price" name="price" 
                    onChange={handleControlledInputChange}
                    required className="form-control"
                    placeholder="Price"            
                    defaultValue={woodColor.price}/>
                  </div>
                </fieldset>
        
                <fieldset>
                  <div className="form-group">
                    <label htmlFor="woodColorImage">Color Image Location: </label>
                    <input type="text" id="woodColorImage" name="image" required className="form-control"
                    placeholder="Color Image Location"
                    onChange={handleControlledInputChange}
                    defaultValue={woodColor.image}/>
                  </div>
                </fieldset>
        
        
                
                <button className="btn btn-primary"
                  disabled={isLoading}
                  onClick={event => {
                    event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                    handleSaveProduct()
                  }}>
                {woodColorId ? <>Save Color</> : <>Add Color</>}</button>
              </form>
                
                </>
            )
        
        
        }

<div className="myOrderCardsContainer">{orders.filter(orders => +localStorage.activeUser === orders.userId).sort((a,b) => {return new Date(b.orderDate) - new Date(a.orderDate)}).map(order => {
        return (
        <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}}
        className="projectCards"
        onClick={() => (detailOpen ? close() : open())}>
        <OrderCard key={order.id} order={order} />
        </motion.button>
        )
       })}
        <AnimatePresence
        //Disable and initial animations on children that are present when the compent is first rendered
        initial={false}
        //Only render one component at a time.
        //The exiting componenet will finish its exit animation before entering component is rendered
        exitBeforeEnter={true}
        //Fires whel all exiting nodes have completed animating out
        
        >
         {detailOpen && <OrderDetail detailOpen={detailOpen} handleClose={close} />}
         
        </AnimatePresence>
      