const cl = console.log.bind(console);

const wrapper = document.getElementById("wrapper");
const sepetButton = document.getElementById("sepet");
const sepetWrapper = document.getElementById("sepetWrapper");
const filters = document.getElementsByClassName("buton");
const sepet = document.getElementById('sepetdiv');


fetch("https://fakestoreapi.com/products?limit=20")
.then((res) => res.json())
.then((data) => eventListerEkleme(data));

let basketArr = [];



sepetButton.addEventListener("click", () => {
  sepet.classList.toggle("aktif");
});

function addToBasket(product) {
  const existingProduct = basketArr.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    basketArr.push(product);
  }

  renderBasket();
  ekleKapatButonu();
}

function renderBasket() {
  sepetWrapper.innerHTML = "";
  const total = document.createElement("p");
  total.classList = "absolute bottom-0 font-bold text-xl bg-stone-0";
  let totalPrice = 0;

  basketArr.forEach((product, index) => {
    totalPrice += product.price * product.quantity;

    const productDiv = document.createElement("div");
    productDiv.classList = "flex flex-col bg-stone-100 rounded w-full my-4";
    productDiv.innerHTML = `
    <div class= "flex w-full ">
    <div class="h-full w-1/3">
    <img class="h-full w-full" src= ${product.image} alt= 'image'> 
    </div>
      <div class="w-2/3">
      <h1 class='font-bold'>${product.title}</h1>
      <p>${product.price}$</p>
      <div class="flex items-center space-x-2">
        <button class="quantity-button" onclick="arttir(${index})">+</button>
        <span>${product.quantity}</span>
        <button class="quantity-button" onclick="azalt(${index})">-</button>
      </div>
      <button class="remove-button" onclick="removeFromBasket(${index})">Ürünü Kaldır</button>
      </div>
    </div>

    `;
    sepetWrapper.appendChild(productDiv);
  });

  total.innerHTML = `TOPLAM: ${totalPrice}$`;
  sepetWrapper.appendChild(total);
}

function ekleKapatButonu() {
  const kapatButton = document.querySelector(".kapat-button");
  if (kapatButton) {
    kapatButton.style.display = "block";
  }
}

function kapatSepet() {
  sepet.classList.remove("aktif");
}

function removeFromBasket(index) {
  basketArr.splice(index, 1);
  renderBasket();
}

function arttir(index) {
  basketArr[index].quantity += 1;
  renderBasket();
}

function azalt(index) {
  basketArr[index].quantity -= 1;

  if (basketArr[index].quantity === 0) {
    removeFromBasket(index);
  } else {
    renderBasket();
  }
}
 




function eventListerEkleme(data) {
  console.log(data)
  listProducts(data);
  for (let i = 0; i < filters.length; i++) {
    filters[i].addEventListener("click", () =>
      listProducts(data, filters[i].value)
    );
  }
}

function listProducts(data, category= '', parameter = "") {
  wrapper.innerHTML = "";
  for (let i in data) {
    if(data[i].category.includes(category)) {

      
    
  
    const card = document.createElement("div");
    const btn = document.createElement("button");
    btn.classList = "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-base px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mt-4 w-full ";
    btn.textContent = "Sepete Ekle";
    btn.addEventListener("click", () => addToBasket(data[i]));

    card.innerHTML = `
      <div class="w-48 md:w-64 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-transform h-84 mb-6">
          <a href="#">
              <img class="p-8 rounded-t-lg w-56 h-72" src="${data[i].image}" alt="product image" />
          </a>
          <div class="px-5 pb-5">
              <a href="#">
                  <h3 class="text-xl font-semibold tracking-tight text-red-900 dark:text-white">${data[i].title.slice(0, 17)}</h3>
              </a>
              <div class="flex items-center mt-2.5 mb-5">
                  <div class="flex items-center space-x-1 rtl:space-x-reverse">
                     ${starCalculator(Math.round(data[i].rating["rate"])).join("")}
                  </div>
                  <span class="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-red-800 ms-3">${Math.round(data[i].rating["rate"]) + ".0"}</span>
              </div>
              <div id='btnprice${i}' class="flex items-start justify-between flex-col">
                  <span class="text-3xl font-bold text-red-900 dark:text-white">${data[i].price}$</span>
              </div>
          </div>
      </div>
    `;

    wrapper.appendChild(card);
    document.getElementById(`btnprice${i}`).appendChild(btn);
  }
  }
}

function starCalculator(star) {
  let starArray = [];
  for (let i = 0; i < star; i++) {
    starArray.push(`<svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
      </svg>`);
  }

  for (let i = starArray.length; i < 5; i++) {
    starArray.push(`<svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
      </svg>`);
  }
  return starArray;
}















