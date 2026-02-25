interface Book {
  title: string;
  borrow_stud: string;
  avail: boolean;
  id: number;
}

const searchBtn = document.querySelector<HTMLButtonElement>("#searchBut");
const searchInput = document.querySelector<HTMLInputElement>("#bookName");
const bookList = document.querySelector<HTMLDivElement>("#result");

const readBooks = async (): Promise<Book[]> => {
  const res = await fetch("https://web-app-prac.onrender.com/books");
  const books: Book[] = await res.json();
  return books;
};

const borrowBook = async (id: number, name: string) => {
  await fetch(`https://web-app-prac.onrender.com/books/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      borrow_stud: name,
      avail: false
    })
  });

  alert("貸出完了");

  searchBtn?.click();
}

searchBtn?.addEventListener("click", async () => {
  const data = await readBooks();
  const keyword = searchInput?.value ?? "";
  const filteredBooks = data.filter(book => book.title.includes(keyword));

  if (bookList) bookList.innerHTML = '';

  filteredBooks.forEach(book => {
    const card = document.createElement("div");
    card.className = "result-card";

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p${(book.avail) ? ' style="color: red;"' : ''}>${(book.avail) ? "〇" : "×"}</p>
    `;

    const button = document.createElement("button");
    button.textContent = "借りる";

    button?.addEventListener("click", async () => {
      if (!book.avail) {
        alert("この本は貸出中です");
        return;
      }

      const name = prompt("あなたの名前を入力してください");
      if (!name) return;

      await borrowBook(book.id, name);
    });

    bookList?.appendChild(card);
    card.appendChild(button);
  });
});