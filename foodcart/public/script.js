let carts = document.querySelectorAll(".add");
let removecart = document.getElementsByClassName(".clearcart");

let products = [
  {
    name: "donut",
    tag: "donut",
    price: 300,
    incart: 0,
  },
  {
    name: "candy",
    tag: "candy",
    price: 10,
    incart: 0,
  },
  {
    name: "coco",
    tag: "coco",
    price: 20,
    incart: 0,
  },
  {
    name: "melon",
    tag: "melon",
    price: 100,
    incart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartnumber(products[i]);
    totalcost(products[i]);
    displaycost();
  });
}

function onpageload() {
  let productnumber = localStorage.getItem("cartnumber");

  document.querySelector(".cart span").innerHTML = productnumber;

  let totalcost = localStorage.getItem("totalcost");
  totalcost = parseInt(totalcost);
  if (totalcost) {
    document.querySelector(".cost h2 span").innerHTML = totalcost;
  }
}

function cartnumber(product) {
  let productnumber = localStorage.getItem("cartnumber");
  productnumber = parseInt(productnumber);

  if (productnumber) {
    localStorage.setItem("cartnumber", productnumber + 1);
    document.querySelector(".cart span").innerHTML = productnumber + 1;
  } else {
    localStorage.setItem("cartnumber", 1);
    document.querySelector(".cart span").innerHTML = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartitems = localStorage.getItem("product in cart");
  cartitems = JSON.parse(cartitems);

  if (cartitems != null) {
    if (cartitems[product.tag] == undefined) {
      cartitems = {
        ...cartitems,
        [product.tag]: product,
      };
    }
    cartitems[product.tag].incart += 1;
  } else {
    product.incart = 1;
    cartitems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("product in cart", JSON.stringify(cartitems));
}

function totalcost(product) {
  let cartcost = localStorage.getItem("totalcost");
  totalcost = parseInt(totalcost);
  if (cartcost != null) {
    cartcost = parseInt(cartcost);
    localStorage.setItem("totalcost", cartcost + product.price);
  } else {
    localStorage.setItem("totalcost", product.price);
  }
}

function displaycost() {
  let totalcost = localStorage.getItem("totalcost");

  document.querySelector(".cost h2 span").innerHTML = totalcost;
}

function displaycart() {
  let totalcost = localStorage.getItem("totalcost");
  let cartitems = localStorage.getItem("product in cart");
  let productcontainer = document.querySelector(".products");

  cartitems = JSON.parse(cartitems);

  if (cartitems) {
    productcontainer.innerHTML = "";
    Object.values(cartitems).map((items) => {
      productcontainer.innerHTML += `
            <div class=""product>
                <ion-icon name="trash-outline"></ion-icon>
                <span>${items.name}</span>
                <span>${items.price}</span>
            </div>
            <div class="quantity">
                <ion-icon name="arrow-back-circle-outline"></ion-icon>
                <span>${items.incart}</span>
                <ion-icon name="arrow-forward-circle-outline"></ion-icon>
            </div>

            <div class ="total">
            $${items.incart * items.price}.00
            </div>
            `;
    });
  }

  productcontainer.innerHTML += `
        <div class="totalbasketcount">
        <h4 class ="totalcosttitle">Total cost</h4>
        <h4 class ="basketotal">${totalcost}</h4>  
        </div>
    `;
}

onpageload();
displaycost();
displaycart();
