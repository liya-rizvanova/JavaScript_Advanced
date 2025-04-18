import { initialData as defaultData } from './data.js';

const LOCAL_STORAGE_KEY = 'productReviews';
const productsContainer = document.getElementById("products");
const select = document.getElementById("product-select");
const textarea = document.getElementById("review-text");
const submitBtn = document.getElementById("submit-review");
const errorMsg = document.getElementById("error-msg");

// Получить данные из localStorage или использовать дефолтные
let initialData = loadFromLocalStorage() || structuredClone(defaultData);

// Создание выпадающего списка
initialData.forEach((product, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = product.product;
  select.appendChild(option);
});

// Отображение отзывов
function renderReviews() {
  productsContainer.innerHTML = "";
  initialData.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";

    const title = document.createElement("h3");
    title.textContent = product.product;
    productDiv.appendChild(title);

    const reviewList = document.createElement("ul");
    reviewList.className = "reviews";
    product.reviews.forEach(r => {
      const li = document.createElement("li");
      li.textContent = r.text;
      reviewList.appendChild(li);
    });

    productDiv.appendChild(reviewList);
    productsContainer.appendChild(productDiv);
  });
}

renderReviews();

// Добавление отзыва
submitBtn.addEventListener("click", () => {
  const text = textarea.value.trim();
  const selectedIndex = select.value;
  errorMsg.textContent = "";

  try {
    if (text.length < 50 || text.length > 500) {
      throw new Error("Отзыв должен содержать от 50 до 500 символов.");
    }

    const product = initialData[selectedIndex];
    const newReview = {
      id: String(Date.now()),
      text
    };

    product.reviews.push(newReview);
    textarea.value = "";
    saveToLocalStorage();
    renderReviews();
  } catch (e) {
    errorMsg.textContent = e.message;
  }
});

// Сохраняем данные в localStorage
function saveToLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
}

// Загружаем данные из localStorage
function loadFromLocalStorage() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}
