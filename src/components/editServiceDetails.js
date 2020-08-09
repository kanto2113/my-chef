import React from "react"

const EditServiceDetails = () => {

  

  return (
    <div>
      <h1>Service Page</h1>
      <div className="service-details-container">
        <div className="service-details-title">
          <br></br>
          Service Title 
        </div>
        <div className="service-details-body">
          <div>
            <label for="mealType">Choose a meal type.</label>
            <select name="mealType" id="mealType">
              <option value="breakfast">Breakast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
          <div>
            <label for="recipe">Choose a recipe.</label>
            <select name="recipe" id="recipe">
              <option value="recipe1">Recipe 1</option>
              <option value="recipe2">Recipe 2</option>
              <option value="recipe3">Recipe 3</option>
            </select>
          </div>
          <div>
            <label for="addon">Choose addons.</label>
            <select name="addon" id="addon">
              <option value="addon1">Addon 1</option>
              <option value="addon2">Addon 2</option>
              <option value="addon3">Addon 3</option>
            </select>
          </div>
          <div>
            Cost $
          </div>
        </div>
      </div>
    </div>

  ) 
}

export default EditServiceDetails
