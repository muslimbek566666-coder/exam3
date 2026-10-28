let searchEl = document.querySelector("#search");
let cardEl = document.querySelector("#cards");
let selectEl = document.querySelector("#regions");
let btnEl = document.querySelector("#btn");

async function getCountries() {
  try {
    let response = await fetch(
      "https://countries-api-steel-theta.vercel.app/api/countries",
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Muammo yuzaga keldi");
    }

    let data = await response.json();
    updateUi(data.data);
  } catch (error) {
    console.log(error);
  }
}

getCountries();

function updateUi(arr) {
  cardEl.innerHTML = "";

  arr.forEach((count) => {
    cardEl.innerHTML += `
    <div class="card">
    <img src="${count.flag}" alt="">
     <h2>${count.name}</h2>
     <p><b>Population</b>: ${count.population}</p>
     <p><b>Region</b>: ${count.region}</p>
     <p><b>Capital</b>: ${count.capital}</p>
     </div>
    `;
  });
}

searchEl.addEventListener("input", async () => {
  let natija = await fetch(
    `https://countries-api-steel-theta.vercel.app/api/countries?name=${searchEl.value}&region=${selectEl.value}`,
  );
  let data = await natija.json();
  cardEl.innerHTML = "";
  updateUi(data.data);
});

selectEl.addEventListener("change", async () => {
  let ready = await fetch(
    `https://countries-api-steel-theta.vercel.app/api/countries?name=${searchEl.value}&region=${selectEl.value}`,
  );
  let data = await ready.json();
  cardEl.innerHTML = "";
  updateUi(data.data);
});

btnEl.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.className === "dark-mode") {
    btnEl.innerText = "Light mode";
  } else {
    btnEl.innerText = "Dark mode";
  }
});
