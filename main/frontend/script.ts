interface Book {
  title: string;
  borrow_stud: string;
  avail: boolean;
  id: number;
}

const searchBtn = document.querySelector<HTMLButtonElement>("#searchBut");
const searchInput = document.querySelector<HTMLInputElement>("#bookName");
const bookList = document.querySelector<HTMLUListElement>("#bookList");

const readBooks = async (): Promise<Book[]> => {
  const res = await fetch("https://web-app-prac.onrender.com/books");
  const books: Book[] = await res.json();
  return books;
};

searchBtn?.addEventListener("click", async () => {
  const data = await readBooks();
  const keyword = searchInput?.value ?? "";
  const filteredBooks = data.filter(book => book.title.includes(keyword));

  if (bookList) bookList.innerHTML = "";
  filteredBooks.forEach(book => {
    const li = document.createElement("li");
    li.textContent = `タイトル:${book.title} 在庫:${(book.avail) ? "〇" : "×"}`;
    bookList?.appendChild(li);
  });
});