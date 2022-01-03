import React, {useState, createContext} from "react"


// The context is imported and used by individual components that need data
//TailTypeContext stores date used in application
export const OrderContext = createContext()

// This component allows other components to use the context data
export const OrdersProvider = (props) => {
    //useState hook defines a variable that holds the state of the compnent and a function to update it
    const [orders, setOrder] = useState([])

   
    const getOrders = () => {
        return fetch("http://localhost:8088/orders?_expand=user&_expand=woodType&_expand=woodColor&_expand=tailType&_expand=status")
        .then(res => res.json())
        .then(setOrder)
    }

    const addOrder = orderObj => {
        return fetch("http://localhost:8088/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderObj)
        })
        .then(getOrders)
    }

    const getOrderById = (id) => {
        return fetch(`http://localhost:8088/orders/${id}`)
            .then(res => res.json())
    }

    const updateOrder = order => {
        return fetch(`http://localhost:8088/orders/${order.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(order)
        })
          .then(getOrders)
      }

      //Used to change adminUserId to current user
      const takeOrder = (orderId, take) => {
        return fetch(`http://localhost:8088/orders/${orderId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({adminUserId: take})
          })
            .then(getOrders)
      }
      
      //Used to change adminUserId to current user
      const updateOrderStatus = (orderId, status) => {
        return fetch(`http://localhost:8088/orders/${orderId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({statusId: status})
          })
            .then(getOrders)
      }
      //Used to change adminUserId to current user
      const updateNote = (orderId, status) => {
        return fetch(`http://localhost:8088/orders/${orderId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({note: status})
          })
            .then(getOrders)
      }
      
      const deleteOrder = orderId => {
        return fetch(`http://localhost:8088/orders/${orderId}`, {
            method: "DELETE"
        })
            .then(getOrders)
    }

    const [ searchTerms, setSearchTerms ] = useState("")
    /*
        You return a context provider which has the
        `TailTypes` state, `getTailTypes` function,
        and the `addTailTypes` function as keys. This
        allows any child elements to access them.
    */
    return (
        <OrderContext.Provider value={{
            orders, getOrders, addOrder, getOrderById, updateOrder, deleteOrder, searchTerms, setSearchTerms, takeOrder, updateOrderStatus, updateNote
        }}>
            {props.children}
        </OrderContext.Provider>
    )
}