"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const itemNameInput = document.querySelector("#itemName");
const addBtn = document.querySelector("#addBtn");
const itemList = document.querySelector("#itemList");
const loadItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch("https://web-app-prac.onrender.com/items");
    const items = yield res.json();
    if (itemList)
        itemList.innerHTML = "";
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.id}: ${item.name}`;
        itemList === null || itemList === void 0 ? void 0 : itemList.appendChild(li);
    });
});
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const name = itemNameInput === null || itemNameInput === void 0 ? void 0 : itemNameInput.value.trim();
    if (!name)
        return;
    const res = yield fetch("https://web-app-prac.onrender.com/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Date.now(), name })
    });
    const result = yield res.json();
    if (itemNameInput)
        itemNameInput.value = "";
    loadItems();
}));
loadItems();
