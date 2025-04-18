const container = document.getElementById("reviews-container");
const data = JSON.parse(localStorage.getItem("reviews")) || {};

for (const product in data) {
  const productEl = document.createElement("div");
  productEl.className = "product";
  productEl.textContent = product;

  const reviewList = document.createElement("ul");
  reviewList.style.display = "none";

  data[product].forEach((review, index) => {
    const li = document.createElement("li");
    li.className = "review";
    li.textContent = review;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.addEventListener("click", () => {
      data[product].splice(index, 1);
      if (data[product].length === 0) {
        delete data[product];
      }
      localStorage.setItem("reviews", JSON.stringify(data));
      location.reload(); // обновить страницу
    });

    li.appendChild(deleteBtn);
    reviewList.appendChild(li);
  });

  productEl.addEventListener("click", () => {
    reviewList.style.display = reviewList.style.display === "none" ? "block" : "none";
  });

  container.appendChild(productEl);
  container.appendChild(reviewList);
}
