import { menuArray } from "./data.js"

// console.log(menuArray)

const menu = document.getElementById("diner-menu")
const orderReview = document.getElementById("order-review")
const orderReviewSection = document.getElementById("order-section")
const orderListing = document.getElementById("order-listing")
const payForm = document.getElementById("pay-form")
const completeOrderBtn = document.getElementById("btn-complete-order")
const completeOrderModal = document.getElementById("complete-order-modal")
const dinerApp = document.getElementsByClassName("diner-app")[0]
const nvmButton = document.getElementById("btn-nvm")
const modalSmoke = document.getElementsByClassName("modal-smoke")[0]
const orderTitle = document.getElementsByClassName("your-order-title")[0]
let orderTotal = document.getElementById("order-total")
let total = 0


/*

      <div class="order-item">
        <div>Pizza <button>remove</button></div>
        <div>$12</div>
      </div>
 */

nvmButton.addEventListener("click", ()=>{
      completeOrderModal.style.display = "none"
      modalSmoke.style.display = "none"
    //   let modalSmoke = document.getElementsByClassName("modal-smoke")[0]
    //   modalSmoke.remove()
})

completeOrderBtn.addEventListener("click", ()=>{
    completeOrderModal.style.display = "block"
    modalSmoke.style.display = "block"
    // pointer-events:none;
})

function totalDisplay(){
     if(total === 0){
        orderReviewSection.style.display = 'none'
    }else{
        orderReviewSection.style.display = 'block'
    }
}

function removeItem(htmlToRemove, price){
    htmlToRemove.remove()
    total -= price
    orderTotal.innerHTML = `$${total}`
    totalDisplay()
   
}


function addToOrder(price, foodName){
    

    orderListing.innerHTML += `<div class="order-item">
                                <div>${foodName} <button class="btn-remove" 
                                data-removal=${foodName} 
                                data-name=${foodName}
                                data-price=${price}
                                data-HTMLEl=${this}
                                >remove</button></div>
                                <div>$${price}</div>
                              </div>`
    orderTotal.innerHTML = `$${total}`
    totalDisplay()
}



document.addEventListener("click", (e)=>{
    
    
    if(e.target.dataset.selection){
        let foodID = parseInt(e.target.dataset.selection)
        let price = menuArray.filter((item)=>{return item.id === foodID})[0].price
        total += price
        let foodName = menuArray.filter((item)=>{return item.id === foodID})[0].name

        addToOrder(price, foodName)
    }else if(e.target.dataset.removal){
        let htmlToRemove = e.target.parentElement.parentElement
        let price = e.target.dataset.price
        removeItem(htmlToRemove, price)
    }
})

function buildMenuHTML(menu){
    let menuHTML = ""
    menu.forEach((food)=>{
        menuHTML += `
        
            <div class="menu-item">
                        <span class="food-and-pricing">
                            <span class="food-emoji">${food.emoji}</span>
                            <ul class="food-details">
                                <li class="food-name">${food.name}</li>
                                <li class="food-ingredients">${food.ingredients}</li>
                                <li class="food-price">$${food.price}</li>
                            </ul>
                        </span>
                        <button class="btn-add-food" data-selection=${food.id}>+</button>
            </div>
        
        `
    })
    
    displayMenu(menuHTML)   
}

function displayMenu(html){
    
    menu.innerHTML = html
    
}


buildMenuHTML(menuArray)


payForm.addEventListener('submit', function(e){
    e.preventDefault()
    orderTitle.style.display = "none"
    let formData = new FormData(payForm)
    let custName = formData.get("name")
    orderReview.innerHTML = `
                                    <div class="thanks-div">Thanks ${custName}! Your order is on the way!</div>
                                    `
                                    
     completeOrderModal.style.display = "none"
     modalSmoke.style.display = "none"
                                    
})