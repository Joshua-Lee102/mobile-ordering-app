import { menuArray } from "/data.js"

let order = {};
const mainContainer = document.getElementById('main-container'); 
const paymentDetails = document.getElementById('card-popup-container');

function renderMenu() {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = ''; 
    
    menuArray.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menuItem';
        itemElement.innerHTML = `
        <div class = "main-menu-container">
            <h1 id = "menu-item-emoji">${item.emoji}</h1>
            <div class = "menu-item-left"
                <h2 id = "menu-item-name">${item.name}</h2>
                <p id = "menu-item-ingredients">${item.ingredients.join(' , ')}</p>
                <h3 id = "menu-item-price">$${item.price}</h3>
            </div>
        </div>
        <button class="add-button">
            <div class="add-icon">+</div>
        </button>
            `
        menuContainer.appendChild(itemElement);
        
        const addButton = itemElement.querySelector('.add-button');
        addButton.addEventListener("click", function(){
            addToOrder(item)
            renderOrderSummary()
        })
    })
}

function addToOrder(item) {
    if (order[item.name]) {
        order[item.name].quantity++;
    } else {
        order[item.name] = {
            name: item.name,
            price: item.price,
            quantity: 1
        };
    }
    renderOrderSummary();
}

function removeFromOrder(itemName) {
    if (order[itemName].quantity > 1) {
        order[itemName].quantity--;
    } else {
        delete order[itemName];  
    }
    renderOrderSummary();    
}

function renderOrderSummary() {
    let orderSummaryHTML = '<p id="order-title">Your Order</p>';
    let totalPrice = 0;

    for (const [itemName, itemDetails] of Object.entries(order)) {
        totalPrice += itemDetails.price * itemDetails.quantity;

        orderSummaryHTML += `
            <div id="body-container">
                <div id="item-btn-container">
                    <div id="pizza-price-container">
                        <p id="order-item">${itemName}</p>
                        <p id="order-price">$${itemDetails.price.toFixed(2)}</p>
                    </div>
                    <button id="remove-btn" onclick="removeFromOrder('${itemName}')">REMOVE</button>
                </div>
                    
            </div>
            <p id="order-quantity">x${itemDetails.quantity}</p>
            `
    }

    orderSummaryHTML += `
        <div id="total-price-container">
            <p id="total-price-title">Subtotal</p>
            <p id="total-price">$${totalPrice.toFixed(2)}</p>
        </div>
        `;
        
    orderSummaryHTML += `<button type="button" id="complete-order-btn">Complete Order</button>`;
    mainContainer.innerHTML = orderSummaryHTML;
    
    const completeOrderBtn = document.getElementById('complete-order-btn');
    completeOrderBtn.addEventListener('click', handleCompleteOrderClick)
}

function renderPaymentForm() {
        const paymentFormHTML = `
            <p id="pay-header-text">Enter Card Details</p>
            <input type="text" name = "name" placeholder="Enter your name" class="card-input-field">
            <input type="number" max="16" placeholder="Enter card number" class="card-input-field">
            <input type="number" max="4" placeholder="Enter CVV" class="card-input-field">
            <button type="button" id="pay-btn">Pay</button>
        `;
        paymentDetails.innerHTML = paymentFormHTML;
        
        const payButton = document.getElementById('pay-btn');
        payButton.addEventListener('click', showConfirmation);
    }


  function handleCompleteOrderClick() {
        renderPaymentForm(); 
        paymentDetails.style.display = 'inline'; 
    }

 function showConfirmation() {
    const nameInput = document.querySelector('.card-input-field[name="name"]'); 
    const userName = nameInput ? nameInput.value : 'Customer';
    paymentDetails.style.display = 'none';
    mainContainer.innerHTML = `<div id="confirmation-message">Thanks, ${userName}! Your order is on its way!</div>`;
    }

 const completeOrderBtn = document.getElementById('complete-order-btn');
    if(completeOrderBtn) {
        completeOrderBtn.addEventListener('click', handleCompleteOrderClick);
    }

renderMenu();


window.removeFromOrder = removeFromOrder;
