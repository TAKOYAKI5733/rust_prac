interface Item {
  id: number;
  name: string;
}

const itemNameInput = document.querySelector<HTMLInputElement>("#itemName");
const addBtn = document.querySelector<HTMLButtonElement>("#addBtn");
const itemList = document.querySelector<HTMLUListElement>("#itemList");

const loadItems = async () => {
  const res = await fetch("http://localhost:3000/items");
  const items: Item[] = await res.json();
  if (itemList) itemList.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.id}: ${item.name}`;
    itemList?.appendChild(li);
  });
};

addBtn?.addEventListener("click", async () => {
  const name = itemNameInput?.value.trim();
  if (!name) return;
  const res = await fetch("http://localhost:3000/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: Date.now(), name })
  });
  const result = await res.json();
  if (itemNameInput) itemNameInput.value = "";
  loadItems();
});

loadItems();