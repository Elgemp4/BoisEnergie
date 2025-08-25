const $menuBtn = document.querySelector(".menu-btn");
const $nav = document.querySelector(".header_nav");
const $navBtns = document.querySelectorAll(".header_nav>a");

const $price = document.querySelector("#price");
const $pci = document.querySelector("#pci");

$menuBtn.addEventListener("click", () => {
  $nav.classList.toggle("hidden");
});

for (const $btn of $navBtns) {
  $btn.addEventListener("click", () => {
    $nav.classList.add("hidden");
  });
}

const $sliders = document.querySelectorAll("[data-target]");

//The data of the sliders
const proportions = {
  chene: {
    quantity: 0,
    pci: 2100,
    price: 90,
  },
  hetre: {
    quantity: 0,
    pci: 2000,
    price: 85,
  },
  charme: {
    quantity: 0,
    pci: 2150,
    price: 95,
  },
  bouleau: {
    quantity: 0,
    pci: 1900,
    price: 80,
  },
  sapin: {
    quantity: 0,
    pci: 1600,
    price: 70,
  },
  peuplier: {
    quantity: 0,
    pci: 1550,
    price: 65,
  },
};

//Handle the use of a slider
const handleSlider = (e) => {
  const $slider = e.target;

  //Calculat the total to check if we don't exceed 100%
  let total = 0;
  for (const key of Object.keys(proportions)) {
    total += proportions[key].quantity;
  }

  total -= proportions[$slider.dataset.target].quantity;
  value = Number.parseInt($slider.value);

  if (total + value > 100) {
    max = value - (total + value - 100);

    $slider.value = max;
    proportions[$slider.dataset.target].quantity = max;

    return;
  }
  proportions[$slider.dataset.target].quantity = value;

  //Calculate the energy and price of the mix
  let totalEnergy = Object.keys(proportions).reduce(
    (prev, curr) =>
      prev + proportions[curr].quantity * proportions[curr].pci * 0.01,
    0
  );
  let totalPrice = Object.keys(proportions).reduce(
    (prev, curr) =>
      prev + proportions[curr].quantity * proportions[curr].price * 0.01,
    0
  );
  //Display the bars according to the sliders usage
  for (const wood in proportions) {
    const bar = document.querySelector(`#${wood}-bar-part`);
    const data = proportions[wood];

    $price.innerText = totalPrice.toFixed(2);
    $pci.innerText = totalEnergy.toFixed(2);

    bar.style.setProperty(
      "--value",
      `${totalEnergy * (data.quantity / 100.0)}`
    );
  }
};

for (const $slider of $sliders) {
  $slider.value = 0;
  $slider.addEventListener("input", handleSlider);
  $slider.addEventListener("change", handleSlider);
}
