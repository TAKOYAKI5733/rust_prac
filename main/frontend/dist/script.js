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
const addBtn = document.querySelector("#view");
const bookList = document.querySelector("#bookList");
const loadBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch("https://web-app-prac.onrender.com/books");
    const items = yield res.json();
    if (bookList)
        bookList.innerHTML = "";
    items.forEach(book => {
        const li = document.createElement("li");
        li.textContent = `タイトル:${book.title} 在庫:${(book.avail) ? "〇" : "×"}`;
        bookList === null || bookList === void 0 ? void 0 : bookList.appendChild(li);
    });
});
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener("click", () => {
    loadBooks();
});
