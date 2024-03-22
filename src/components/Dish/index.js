import './index.css'

const Dish = ({dishDetails, cartItems, addToCart, removeFromCart}) => {
  const {
    dishId,
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImage,
    dishCalories,
    addonCat,
    dishAvailability,
  } = dishDetails

  const decQuantity = () => removeFromCart(dishDetails)
  const incQuantity = () => addToCart(dishDetails)

  const getQuantity = () => {
    const cartItem = cartItems.find(each => each.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  return (
    <div className="dish-con">
      <div className={`type-border ${dishType === 1 ? `non-veg-box` : ``}`}>
        <div className={`round ${dishType === 1 ? `non-veg-round` : ``}`} />
      </div>
      <div className="name-con">
        <h1>{dishName}</h1>
        <div className="price-con">
          {' '}
          <p>{dishCurrency}</p>
          <p>{dishPrice}</p>
        </div>
        <div className="desc-con">
          <p>{dishDescription}</p>
        </div>
        {dishAvailability === true ? (
          <div className="button-con">
            <button type="button" onClick={decQuantity}>
              -
            </button>
            <div>{getQuantity()}</div>
            <button type="button" onClick={incQuantity}>
              +
            </button>
          </div>
        ) : (
          <p className="not-available">Not Available</p>
        )}
        <div>
          {addonCat.length !== 0 && (
            <p className="add-on-text">Customizations available </p>
          )}
        </div>
      </div>
      <p className="calories-con">{dishCalories} Calories</p>
      <img className="dish-image" src={dishImage} alt={dishId} />
    </div>
  )
}

export default Dish
