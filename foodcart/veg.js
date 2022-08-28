// increase item number and price

function increase() {
  let noofitem = document.getElementById("noofitem");

  if (parseInt(noofitem.innerHTML) < 9) {
    noofitem.innerHTML = `0${parseInt(noofitem.innerHTML) + 1}`;
  } else {
    noofitem.innerHTML = parseInt(noofitem.innerHTML) + 1;
  }

  updateprice();

  // price.innerHTML = `$ ${parseInt(noofitem.innerHTML) *parseInt(price_menu.innerHTML) }`
}

function updateprice()
{
  let name = document.getElementById("name");
  let price = document.getElementById("price-card");
    fetch("/data.json")
    .then((Response) => Response.json())
    .then((res) => {

      res.veg.forEach((element) => {
        if (name.innerHTML == element.name) {
            price.innerHTML = `$ ${element.price * parseInt(noofitem.innerHTML)}`;
        }
      });
    });
}
// decrease item number and price

function decrease() {
  let noofitem = document.getElementById("noofitem");

  if (parseInt(noofitem.innerHTML) <= 0) {
    noofitem.innerHTML = 0;
  } else if (parseInt(noofitem.innerHTML) <= 10) {
    noofitem.innerHTML = `0${parseInt(noofitem.innerHTML) - 1}`;
  } else {
    noofitem.innerHTML = parseInt(noofitem.innerHTML) - 1;
  }

  updateprice();
}

// function to update card

var dishes = document.querySelectorAll("#dish-name");

for (let i = 0; i < dishes.length; i++) {
  dishes[i].addEventListener("click", () => {
    console.log("clicked");

    updatecard(dishes[i]);
  });
}

function updatecard(dish) {
  let prev_name = document.getElementById("name");
  let prev_rating = document.getElementById("rating-card");
  // let prev_time = document.getElementById("time");
  // let prev_calorie = document.getElementById("calorie");
  let prev_about = document.getElementById("about-card");
  let prev_price = document.getElementById("price-card");

  fetch("/data.json")
    .then((Response) => Response.json())
    .then((res) => {
      res.veg.forEach((element) => {
        if (dish.innerHTML == element.name) {
          prev_name.innerHTML = element.name;
          // prev_time.innerHTML = element.time;
          prev_rating.innerHTML = element.rating;
          // prev_calorie.innerHTML = element.calorie;
          prev_about.innerHTML = element.about;
        }
      });
    });
    updateprice();
}

// function for add to cart

let order = document.getElementById("order");
order.addEventListener("click", () => {
  console.log("order placed");

  let prev_name = document.getElementById("name");
  let items = document.getElementById("noofitem");

  let cartitems = localStorage.getItem("product in cart");

  cartitems = JSON.parse(cartitems);

  fetch("/data.json")
    .then((Response) => Response.json())
    .then((res) => {
      for (let i = 0; i < dishes.length; i++) {
        if (prev_name.innerHTML == res.veg[i].name) {
          if (cartitems != null) {
            if (cartitems[res.veg[i].name] == undefined) {
              cartitems = {
                ...cartitems,
                [res.veg[i].name]: res.veg[i],
              };

              cartitems[res.veg[i].name].incart += parseInt(items.innerHTML);
              cartitems[res.veg[i].name].price *= cartitems[res.veg[i].name].incart; 

            } else {
              cartitems[res.veg[i].name].incart += parseInt(items.innerHTML);
              cartitems[res.veg[i].name].price = res.veg[i].price*cartitems[res.veg[i].name].incart; 

            }
          } else {
            cartitems = {
              [res.veg[i].name]: res.veg[i],
            };
            cartitems[res.veg[i].name].incart += parseInt(items.innerHTML);
            cartitems[res.veg[i].name].price *= cartitems[res.veg[i].name].incart; 

          }
        }
      }

      localStorage.setItem("product in cart", JSON.stringify(cartitems));
    });
});

// function for total cost

 function calccost()
 {

 }