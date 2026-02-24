interface Item {
  id: number;
  name: string;
  author: string;
}

const itemNameInput = document.querySelector<HTMLInputElement>("#itemName");
const itemAuthorInput = document.querySelector<HTMLInputElement>("#itemAuthor");
const addBtn = document.querySelector<HTMLButtonElement>("#addBtn");
const itemList = document.querySelector<HTMLUListElement>("#itemList");

const loadItems = async () => {
  const res = await fetch("https://web-app-prac.onrender.com/items");
  const items: Item[] = await res.json();
  if (itemList) itemList.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `タイトル:${item.name} 著者:${item.author}`;
    itemList?.appendChild(li);
  });
};

addBtn?.addEventListener("click", async () => {
  const name = itemNameInput?.value.trim();
  const author = itemAuthorInput?.value.trim();
  if (!name || !author) return;
  const res = await fetch("https://web-app-prac.onrender.com/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: Date.now(), name, author })
  });
  const result = await res.json();
  if (itemNameInput) itemNameInput.value = "";
  loadItems();
});

loadItems();