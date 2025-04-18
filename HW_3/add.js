const select = document.getElementById("product-select");
const reviewInput = document.getElementById("review-text");
const addBtn = document.getElementById("add-review-btn");
const message = document.getElementById("message");

addBtn.addEventListener("click", () => {
  const product = select.value;
  const review = reviewInput.value.trim();

  if (!product) {
    message.textContent = "Пожалуйста, выберите продукт.";
    return;
  }

  if (!review) {
    message.textContent = "Пожалуйста, введите отзыв.";
    return;
  }

  const data = JSON.parse(localStorage.getItem("reviews")) || {};

  if (!data[product]) {
    data[product] = [];
  }

  data[product].push(review);
  localStorage.setItem("reviews", JSON.stringify(data));

  message.textContent = "Отзыв добавлен!";
  reviewInput.value = "";
  select.selectedIndex = 0;
});
