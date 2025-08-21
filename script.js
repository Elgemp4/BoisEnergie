const $menuBtn = document.querySelector(".menu-btn");
const $nav = document.querySelector(".header_nav");
const $navBtns = document.querySelectorAll(".header_nav>a");

$menuBtn.addEventListener("click", () => {
  $nav.classList.toggle("hidden");
});

for (const $btn of $navBtns) {
  $btn.addEventListener("click", () => {
    $nav.classList.add("hidden");
  });
}
