import { heroSectionImages, productCarousel } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
  const heroImage = document.getElementById("hero-image");
  const dotsWrapper = document.querySelector(".hero-images-dots-wrapper");
  const productsWrapper = document.querySelector(".products-wrapper");
  const leftArrow = document.querySelector(".products-carousel .arrow-left");
  const rightArrow = document.querySelector(".products-carousel .arrow-right");
  let currentIndex = 0;

  // Slider for hero section
  function setCurrentImage(index) {
    currentIndex = index;
    heroImage.src = `./assets/${heroSectionImages[index]}`;
    updateDots();
  }

  function updateDots() {
    const dots = document.querySelectorAll(".hero-images-dot");
    dots.forEach((dot, index) => {
      dot.classList.remove("active");
      if (index === currentIndex) {
        dot.classList.add("active");
      }
    });
  }

  function startSlider() {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % heroSectionImages.length;
      setCurrentImage(currentIndex);
    }, 3000); // Change image every 3 seconds
  }

  // Create dots
  heroSectionImages.forEach((image, index) => {
    const dot = document.createElement("div");
    dot.classList.add("hero-images-dot");
    if (index === 0) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => setCurrentImage(index));
    dotsWrapper.appendChild(dot);
  });

  startSlider();

  // Product carousel
  function renderProducts() {
    productsWrapper.innerHTML = "";
    productCarousel.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");

      const prodImageElement = document.createElement("div");
      prodImageElement.classList.add("prod-image");
      const prodImageText = document.createElement("h2");
      prodImageText.textContent = product.imageText;
      prodImageElement.appendChild(prodImageText);

      const prodTitleElement = document.createElement("span");
      prodTitleElement.textContent = product.title;

      productElement.appendChild(prodImageElement);
      productElement.appendChild(prodTitleElement);
      productsWrapper.appendChild(productElement);
    });
  }

  renderProducts();

  // Arrow functionality
  const scrollAmount = 220; // Adjust based on your product width and gap

  leftArrow.addEventListener("click", () => {
    productsWrapper.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  });

  rightArrow.addEventListener("click", () => {
    productsWrapper.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  });
});
