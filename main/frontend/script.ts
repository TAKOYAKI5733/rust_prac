interface Book {
  title: string;
  bowwor_stud: string;
  avail: boolean;
  id: number;
}

const addBtn = document.querySelector<HTMLInputElement>("#view");
const bookList = document.querySelector<HTMLUListElement>("#bookList");

const loadBooks = async () => {
  const res = await fetch("https://web-app-prac.onrender.com/books");
  const items: Book[] = await res.json();
  if (bookList) bookList.innerHTML = "";
  items.forEach(book => {
    const li = document.createElement("li");
    li.textContent = `タイトル:${book.title} 在庫:${(book.avail) ? "〇" : "×"}`;
    bookList?.appendChild(li);
  });
};

addBtn?.addEventListener("click", () => {
  loadBooks();
});