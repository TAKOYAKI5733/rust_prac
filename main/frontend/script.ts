interface Book {
  title: string;
  bowwor_stud: string;
  avail: boolean;
  id: number;
}

const itemNameInput = document.querySelector<HTMLInputElement>("#itemName");
const itemAuthorInput = document.querySelector<HTMLInputElement>("#itemAuthor");
const addBtn = document.querySelector<HTMLButtonElement>("#addBtn");
const itemList = document.querySelector<HTMLUListElement>("#itemList");

const loadBooks = async () => {
  const res = await fetch("https://web-app-prac.onrender.com/items");
  const items: Book[] = await res.json();
  if (itemList) itemList.innerHTML = "";
  items.forEach(book => {
    const li = document.createElement("li");
    li.textContent = `タイトル:${book.title} 在庫:${(book.avail) ? "〇" : "×"}`;
    itemList?.appendChild(li);
  });
};

addBtn?.addEventListener("click", () => {
  loadBooks();
});