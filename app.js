// ==============================
// LOAD DATA FROM LOCAL STORAGE


let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];


// ==============================
// GET ELEMENTS


const inventoryForm = document.getElementById("inventoryForm");
const inventoryTable = document.getElementById("inventoryTable");
const errorMsg = document.getElementById("errorMsg");

const stockForm = document.getElementById("stockForm");
const itemSelect = document.getElementById("itemSelect");
const stockMsg = document.getElementById("stockMsg");

const historyTable = document.getElementById("historyTable");

const totalStockEl = document.getElementById("totalStock");
const branch1StockEl = document.getElementById("branch1Stock");
const branch2StockEl = document.getElementById("branch2Stock");


// ==============================
// RENDER INVENTORY TABLE
// ==============================

function renderInventory() {
  inventoryTable.innerHTML = "";

  inventory.forEach(item => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.dateAdded}</td>
      <td>${item.name}</td>
      <td>${item.totalQty.toLocaleString()}</td>
      <td>${item.branch1.toLocaleString()}</td>
      <td>${item.branch2.toLocaleString()}</td>
    `;

    inventoryTable.appendChild(row);
  });
}


// ==============================
// RENDER DROPDOWN ITEMS
// ==============================

function loadItemsToDropdown() {
  itemSelect.innerHTML = `<option value="">Select Item</option>`;

  inventory.forEach(item => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name;
    itemSelect.appendChild(option);
  });
}


// ==============================
// RENDER DASHBOARD
// ==============================

function renderDashboard(){

let total = 0;
let b1 = 0;
let b2 = 0;

inventory.forEach(item=>{

const usedB1 = getUsedQty(item.id,"branch1");
const usedB2 = getUsedQty(item.id,"branch2");

const availableB1 = item.branch1 - usedB1;
const availableB2 = item.branch2 - usedB2;

b1 += availableB1;
b2 += availableB2;
total += availableB1 + availableB2;

});

totalStockEl.textContent = total.toLocaleString();
branch1StockEl.textContent = b1.toLocaleString();
branch2StockEl.textContent = b2.toLocaleString();

}

function convertImageToBase64(file){

return new Promise((resolve,reject)=>{

const reader = new FileReader();

reader.readAsDataURL(file);

reader.onload = ()=>resolve(reader.result);

reader.onerror = error => reject(error);

});

}


function renderItemDashboard(){

const container = document.getElementById("itemDashboard");

container.innerHTML = "";

inventory.forEach(item => {

const usedB1 = getUsedQty(item.id,"branch1");
const usedB2 = getUsedQty(item.id,"branch2");

const availableB1 = item.branch1 - usedB1;
const availableB2 = item.branch2 - usedB2;

const totalAvailable = availableB1 + availableB2;

const card = document.createElement("div");
card.className = "item-card";

let warning = "";

if(totalAvailable <= 10){
warning = '<div class="low-stock">LOW STOCK</div>';
}

card.innerHTML = `

<img src="${item.image || 'https://via.placeholder.com/200'}">

<h3>${item.name}</h3>

<p><b>Total:</b> ${totalAvailable.toLocaleString()}</p>

<p>Himilo 1: ${availableB1.toLocaleString()}</p>

<p>Himilo 2: ${availableB2.toLocaleString()}</p>

${warning}

`;

container.appendChild(card);

});

}
// ==============================
// RENDER HISTORY
// ==============================

function renderHistory() {
  historyTable.innerHTML = "";

  history.forEach(h => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${h.date}</td>
      <td>${h.item}</td>
      <td>${
       h.branch === "branch1" ? "Himilo 1" :
       h.branch === "branch2" ? "Himilo 2" :
       h.branch
      }</td>
      <td>${h.type}</td>
      <td>${h.quantity.toLocaleString()}</td>
    `;

    historyTable.appendChild(row);
  });
}


// ==============================
// ADD INVENTORY
// ==============================

inventoryForm.addEventListener("submit", async function(e){

e.preventDefault();

const itemName=document.getElementById("itemName").value.trim();

const totalQty=Number(document.getElementById("totalQty").value);

const branch1=Number(document.getElementById("QtyHimilo1").value);

const branch2=Number(document.getElementById("QtyHimilo2").value);

const imageFile=document.getElementById("itemImage").files[0];

if (branch1 + branch2 !== totalQty) {
  errorMsg.textContent = "Branch quantities must equal total quantity";
  errorMsg.classList.add("error")
  return;
}

let image="";

if(imageFile){

image=await convertImageToBase64(imageFile);

}

const currentDate=new Date().toLocaleString();

inventory.push({

id:Date.now(),

name:itemName,

image:image,

totalQty:totalQty,

branch1:branch1,

branch2:branch2,

dateAdded:currentDate

});

localStorage.setItem("inventory",JSON.stringify(inventory));
history.push({
 item:itemName,
 branch:"Both Branches",
 type:"Inventory Added",
 quantity:totalQty,
 date:currentDate
});

localStorage.setItem("history",JSON.stringify(history));

inventoryForm.reset();

updateUI();



});


// ==============================
// STOCK OUT
// ==============================
function getUsedQty(itemId, branch){

return history
.filter(h => h.itemId === itemId && h.branch === branch)
.reduce((sum,h)=> sum + h.quantity ,0);

}
stockForm.addEventListener("submit", function (e) {

  e.preventDefault();

  const itemId = Number(itemSelect.value);
  const branch = document.getElementById("branch").value;
  const qty = Number(document.getElementById("quantity").value);

  if (!itemId || !branch || qty <= 0) {
    stockMsg.textContent = "Please fill all fields";
    stockMsg.classList.add("error")
    return;
  }

  const item = inventory.find(i => i.id === itemId);
  if (!item) return;

  // calculate used quantities
  const usedB1 = getUsedQty(itemId,"branch1");
  const usedB2 = getUsedQty(itemId,"branch2");

  // calculate available stock
  const availableB1 = item.branch1 - usedB1;
  const availableB2 = item.branch2 - usedB2;

  // check stock
 stockMsg.classList.remove("error", "success");

// check stock
if (branch === "branch1" && availableB1 < qty) {

  stockMsg.textContent = "Not enough stock in Himilo 1";
  stockMsg.classList.add("error");
  return;

} else if (branch === "branch2" && availableB2 < qty) {

  stockMsg.textContent = "Not enough stock in Himilo 2";
  stockMsg.classList.add("error");
  return;

} else {

  stockMsg.textContent = "Stock out saved successfully";
  stockMsg.classList.add("success");

}
  // save history
  history.push({
    itemId: itemId,
    item: item.name,
    branch: branch,
    type: "Stock Out",
    quantity: qty,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("history", JSON.stringify(history));

  stockForm.reset();
  

  updateUI();

});


// ==============================
// INITIAL LOAD
// ==============================

function updateUI(){
  renderInventory();
  renderDashboard();
  renderHistory();
  loadItemsToDropdown();
  renderItemDashboard();
}

updateUI()