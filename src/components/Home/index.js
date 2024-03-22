import {useState, useEffect} from 'react'

import Header from '../Header'
import Dish from '../Dish'

import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)

  const [restaurantData, setRestaurantData] = useState([])
  const [activeMenu, setActiveMenu] = useState('')
  const [cartItems, setCartItems] = useState([])

  const getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  useEffect(() => {
    const api = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const fetchData = async () => {
      try {
        const response = await fetch(api)
        const json = await response.json()
        const updatedData = getUpdatedData(json[0].table_menu_list)

        setRestaurantData(updatedData)
        setActiveMenu(updatedData[0])
        setIsLoading(false)
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchData()
  }, [])

  const selectMenu = menu => setActiveMenu(menu)

  const renderMenuCategory = () => (
    <ul className="categories">
      {restaurantData.map(eachMenu => (
        <button
          type="button"
          className={`category-items ${
            eachMenu === activeMenu ? `active-category-item` : ``
          }`}
          key={eachMenu.menuCategoryId}
          onClick={() => selectMenu(eachMenu)}
        >
          {eachMenu.menuCategory}
        </button>
      ))}
    </ul>
  )

  const addToCart = addDish => {
    const isPresent = cartItems.find(each => each.dishId === addDish.dishId)
    if (!isPresent) {
      const newDish = {...addDish, quantity: 1}
      setCartItems(prev => [...prev, newDish])
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.dishId === addDish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      )
    }
  }

  const removeFromCart = removeDish => {
    const isPresent = cartItems.find(item => item.dishId === removeDish.dishId)
    if (isPresent) {
      setCartItems(prev =>
        prev
          .map(item =>
            item.dishId === removeDish.dishId
              ? {...item, quantity: item.quantity - 1}
              : item,
          )
          .filter(item => item.quantity > 0),
      )
    }
  }

  const renderSelectedMenu = () => {
    const selected = activeMenu.categoryDishes
    return (
      <div>
        {selected?.map(each => (
          <Dish
            key={each.dishName}
            dishDetails={each}
            cartItems={cartItems}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
    )
  }

  const renderSpinner = () => (
    <div className="spinner-container">
      <div className="spinner-border" />
    </div>
  )

  return isLoading ? (
    renderSpinner()
  ) : (
    <div>
      <Header cartItems={cartItems} />
      {renderMenuCategory()}

      {renderSelectedMenu(activeMenu)}
    </div>
  )
}

export default Home
