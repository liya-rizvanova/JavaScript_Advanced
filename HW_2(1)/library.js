export class Library {
  #books = [];

  constructor(initialBooks = []) {
    if (!Array.isArray(initialBooks)) {
      throw new Error("Начальный список должен быть массивом.");
    }

    const uniqueBooks = new Set(initialBooks);
    if (uniqueBooks.size !== initialBooks.length) {
      throw new Error("Начальный список содержит дубликаты книг.");
    }

    this.#books = [...uniqueBooks];
  }

  get allBooks() {
    return [...this.#books];
  }

  addBook(title) {
    if (this.#books.includes(title)) {
      throw new Error(`Книга "${title}" уже есть в библиотеке.`);
    }
    this.#books.push(title);
  }

  removeBook(title) {
    const index = this.#books.indexOf(title);
    if (index === -1) {
      throw new Error(`Книга "${title}" не найдена в библиотеке.`);
    }
    this.#books.splice(index, 1);
  }

  hasBook(title) {
    return this.#books.includes(title);
  }
}
