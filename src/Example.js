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