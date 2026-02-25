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
const searchBtn = document.querySelector("#searchBut");
const searchInput = document.querySelector("#bookName");
const bookList = document.querySelector("#result");
const readBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch("https://web-app-prac.onrender.com/books");
    const books = yield res.json();
    return books;
});
searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield readBooks();
    const keyword = (_a = searchInput === null || searchInput === void 0 ? void 0 : searchInput.value) !== null && _a !== void 0 ? _a : "";
    const filteredBooks = data.filter(book => book.title.includes(keyword));
    if (bookList)
        bookList.innerHTML = '';
    filteredBooks.forEach(book => {
        const card = document.createElement("div");
        card.className = "result-card";
        card.innerHTML = `
      <h3>${book.title}</h3>
      <p style="${(book.avail) ? "color:red;" : ""}>${(book.avail) ? "〇" : "×"}</p>
      <button>借りる</button>
    `;
        bookList === null || bookList === void 0 ? void 0 : bookList.appendChild(card);
    });
}));
