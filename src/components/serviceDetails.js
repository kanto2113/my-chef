import React, { useEffect, useState } from "react"
import Axios from "axios"
import uuid from "uuid/v4"
import { useParams } from "react-router-dom"


const ServiceDetails = (props) => {

  const [serviceDetails, setServiceDetails] = useState({})
  
  const [dietOptions, setDietOptions] = useState([])

  const [mealDetails, setMealDetails] = useState({mealType:"breakfast"})

  const [addons, setAddons] = useState({})


  console.log('serviceDetails', serviceDetails)
  console.log('dietOptions', dietOptions)
  console.log('mealDetails', mealDetails)
  console.log('addons', addons)

  const { id } = useParams()

  useEffect(() => {
    let getService = async () => {
      let service = await Axios.get(`http://localhost:5000/services/${id}`)
      setServiceDetails(service.data)
    }
    getService()
  }, [])

  // Input Handlers

  const serviceTitleInputHandler = (e) => {
    let cloneServiceDetails = {...serviceDetails, title: e.target.value}
    setServiceDetails(cloneServiceDetails)
  }
  
  const serviceDescriptionInputHandler = (e) => {
    let cloneServiceDetails = {...serviceDetails, description: e.target.value}
    setServiceDetails(cloneServiceDetails)
  }

  const mealTypeInputHandler = (e) => {
    let cloneMealDetails = {...mealDetails, mealType: e.target.value}
    setMealDetails(cloneMealDetails)
  }

  const recipeNameInputHandler = (e) => {
    let recipeArr = serviceDetails.recipe
    let cloneRecipe = [...recipeArr, e.target.value]
    let newService = {...serviceDetails, recipe: cloneRecipe}
    setServiceDetails(newService)
  }

  const serviceBaseCostInputHandler = (e) => {
    let cloneServiceDetails = {...serviceDetails, baseCost: e.target.value}
    setServiceDetails(cloneServiceDetails)  
  }

  // Dietary Option Checkbox Handlers

  const ketoCheckboxHandler = (e) => {
    if(document.getElementById("keto").checked){
      let cloneDiet = [...dietOptions]
      cloneDiet[0] = {keto:true}
      setDietOptions(cloneDiet)
    }else{
      let cloneDiet = [...dietOptions]
      cloneDiet[0] = {keto:false}
      setDietOptions(cloneDiet)
    }
  }

  const veganCheckboxHandler = (e) => {
    if(document.getElementById("vegan").checked){
      let cloneDiet = [...dietOptions]
      cloneDiet[1] = {vegan:true}
      setDietOptions(cloneDiet)
    }else{
      let cloneDiet = [...dietOptions]
      cloneDiet[1] = {vegan:false}
      setDietOptions(cloneDiet)
    }
  }

  const vegetarianCheckboxHandler = (e) => {
    if(document.getElementById("vegetarian").checked){
      let cloneDiet = [...dietOptions]
      cloneDiet[2] = {vegetarian:true}
      setDietOptions(cloneDiet)
    }else{
      let cloneDiet = [...dietOptions]
      cloneDiet[2] = {vegetarian:false}
      setDietOptions(cloneDiet)
    }
  }

  const glutenFreeCheckboxHandler = (e) => {
    if(document.getElementById("glutenFree").checked){
      let cloneDiet = [...dietOptions]
      cloneDiet[3] = {glutenFree:true}
      setDietOptions(cloneDiet)
    }else{
      let cloneDiet = [...dietOptions]
      cloneDiet[3] = {glutenFree:false}
      setDietOptions(cloneDiet)
    }
  }

  const dairyFreeCheckboxHandler = (e) => {
    if(document.getElementById("dairyFree").checked){
      let cloneDiet = [...dietOptions]
      cloneDiet[4] = {dairyFree:true}
      setDietOptions(cloneDiet)
    }else{
      let cloneDiet = [...dietOptions]
      cloneDiet[4] = {dairyFree:false}
      setDietOptions(cloneDiet)
    }
  }

  const createAddon = () => {
    let newAddon = {name: "", cost: 0}
    let cloneAddons = {...addons, [`${uuid()}`]:newAddon }
    setAddons(cloneAddons)
  }

  const addonNameInputHandler = (e, key) => {
    setAddons({...addons, [key]:{...addons[key], name: e.target.value}})
  }

  const addonCostInputHandler = (e, key) => {
    setAddons({...addons, [key]:{...addons[key], cost: e.target.value}})
  }


  return (

    <div>
      <h1>Service Page</h1>
      <div className="service-details-container">
        <div className="service-details-title">
          <br></br>
          <input id="title" onChange={(e)=>serviceTitleInputHandler(e)} placeholder={serviceDetails.title}></input>
          <br></br>
          <input className="service-details-description" id="description" onChange={(e)=>serviceDescriptionInputHandler(e)} placeholder={serviceDetails.description}></input>
        </div>
        <div className="service-details-body">
          {serviceDetails?.serviceType==="meal" ? (
          <>
          <div>
            <label for="mealType">Choose a meal type : </label>
            <select onChange={(e)=>mealTypeInputHandler(e)} name="mealType" id="mealType">
              <option value="breakfast">Breakast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
          <div>
            <label for="recipeName">Name of Recipe : </label>
            <input onChange={(e)=>{recipeNameInputHandler(e)}} id="recipeName"></input>
          </div>
          <div>
            <label for="baseCost">Base Cost : </label>
            $<input id="baseCost" type="number" min="0" step="0.01" onChange={(e)=>serviceBaseCostInputHandler(e)} placeholder={serviceDetails?.baseCost}></input>
          </div>
          <div>
            Dietary Options
            <br></br>
            <br></br>
            Keto <input type="checkbox" id="keto" onChange={(e)=>{ketoCheckboxHandler(e)}}></input>
            <br></br>
            Vegan <input type="checkbox" id="vegan" onChange={(e)=>{veganCheckboxHandler(e)}}></input>
            <br></br>
            Vegetarian <input type="checkbox" id="vegetarian" onChange={(e)=>{vegetarianCheckboxHandler(e)}}></input>
            <br></br>
            Gluten Free <input type="checkbox" id="glutenFree" onChange={(e)=>{glutenFreeCheckboxHandler(e)}}></input>
            <br></br>
            Dairy Free <input type="checkbox" id="dairyFree" onChange={(e)=>{dairyFreeCheckboxHandler(e)}}></input>
          </div>
          <button onClick={createAddon}>Create Addon</button>
          {Object.keys(addons).map((key)=>{
            return(
              <div key={key}>
                <label for="name">Name of Addon</label>
                <input id="name" onChange={(e)=>{addonNameInputHandler(e, key)}} placeholder={addons[key].name}></input>
                <label for="cost"> Price: $</label>
                <input id="cost" onChange={(e)=>addonCostInputHandler(e, key)} placeholder={addons[key].cost}></input>
                <button >X</button>
              </div>
            )
          })}
          
          </>
          ) : (
          <>
          </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServiceDetails
