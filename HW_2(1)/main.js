import { Library } from './library.js';

const STORAGE_KEY = "my-library-books";

// Получение книг из localStorage или дефолтного набора
const savedBooks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || ["1984", "Мастер и Маргарита"];
const lib = new Library(savedBooks);

const bookList = document.getElementById("book-list");
const message = document.getElementById("message");

function updateBookList() {
  bookList.innerHTML = "";
  lib.allBooks.forEach(book => {
    const li = document.createElement("li");
    li.textContent = book;
    bookList.appendChild(li);
  });
  // Сохраняем текущее состояние
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lib.allBooks));
}

document.getElementById("add-form").addEventListener("submit", e => {
  e.preventDefault();
  const title = e.target.elements.title.value.trim();
  message.textContent = "";
  try {
    lib.addBook(title);
    updateBookList();
    e.target.reset();
  } catch (err) {
    message.textContent = err.message;
  }
});

document.getElementById("remove-form").addEventListener("submit", e => {
  e.preventDefault();
  const title = e.target.elements.removeTitle.value.trim();
  message.textContent = "";
  try {
    lib.removeBook(title);
    updateBookList();
    e.target.reset();
  } catch (err) {
    message.textContent = err.message;
  }
});

updateBookList();
