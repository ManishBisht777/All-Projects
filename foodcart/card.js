const card = document.getElementById("card");

randommeal();

async function randommeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const resdata = await resp.json();
  const randommeal = resdata.meals[0];

  console.log(randommeal);
  loadmeal(randommeal, true);
}

function loadmeal(mealdata, random = false) {
  const dish = document.createElement("div");
  dish.classList.add("dish");
  dish.innerHTML = `
   <div class="image">
    <ion-icon name="heart-outline"></ion-icon>
    ${
      random
        ? `<img src=${mealdata.strMealThumb} alt=${mealdata.strMeal} />`
        : ""
    }
    
  </div>
  <div class="info">
    <div class="name">
      <h2 id="name">${mealdata.strMeal}</h2>
    </div>

    <div class="info-small">
      <div class="time">
        <ion-icon name="time-outline"></ion-icon>
        50 min
      </div>
      <div id="rating" class="rating">
        <ion-icon name="star-outline"></ion-icon>
        <span id="rating-card"> 4.5 </span>
      </div>
      <div id="calorie" class="calorie">
        <ion-icon name="flame-outline"></ion-icon>
        325 Kcal
      </div>
    </div>

    <div class="addtocart">
      <div id="price-card" class="price">Price</div>
      <div class="add">
        <ion-icon name="remove-outline" onclick="decrease()"></ion-icon>
        <span id="noofitem">0</span>
        <ion-icon name="add-outline" onclick="increase()"></ion-icon>
      </div>
    </div>

    <div class="ingredient">
      <h3>Ingredients</h3>
      <div class="ingredients">
        <span>${mealdata.strIngredient1}</span>
        <span>${mealdata.strIngredient2}</span>
        <span>${mealdata.strIngredient3}</span>
        <span>${mealdata.strIngredient4}</span>
      </div>
    </div>
    <div class="about">
      <h3>About</h3>
      <p id="about-card">
      ${mealdata.strInstructions}
        recusandae
      </p>
    </div>
    <div class="order">
      <button id="order">Order</button>
      <ion-icon name="bag-outline"></ion-icon>
    </div>
  </div>`;

  const btn = dish.querySelector(".dish .order #order");
  const cont = dish.querySelector(".dish .order");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      cont.classList.remove("active-cont");
      removemeal(mealdata.idMeal);
    } else {
      btn.classList.add("active");
      cont.classList.add("active-cont");
      addmeal(mealdata.idMeal);
    }
  });

  card.appendChild(dish);
}

function addmeal(mealId) {
  const mealsid = getmeal();
  localStorage.setItem("mealId", JSON.stringify([...mealsid, mealId]));
}

function getmeal() {
  const mealsid = JSON.parse(localStorage.getItem("mealId"));

  return mealsid=== null ? [] : mealsid;
}

function removemeal(mealId) {
  const mealsid = getmeal();
  localStorage.setItem(
    "mealId",
    JSON.stringify(mealsid.filter((id) => id !== mealId))
  );
}
