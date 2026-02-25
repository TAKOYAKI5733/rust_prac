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
const borrowBook = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetch(`https://web-app-prac.onrender.com/books/${id}`, {
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
    searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.click();
});
const returnBooks = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetch(`https://web-app-prac.onrender.com/books/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            borrow_stud: "",
            avail: true
        })
    });
    alert("返却完了");
    searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.click();
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
      <p${(book.avail) ? ' style="color: red;"' : ''}>${(book.avail) ? "〇" : "×"}</p>
    `;
        const button = document.createElement("button");
        button.textContent = "借りる";
        const button_return = document.createElement("button");
        button_return.textContent = "返却";
        button === null || button === void 0 ? void 0 : button.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
            if (!book.avail) {
                alert("この本は貸出中です");
                return;
            }
            const name = prompt("あなたの名前を入力してください");
            if (!name)
                return;
            yield borrowBook(book.id, name);
        }));
        button_return === null || button_return === void 0 ? void 0 : button_return.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
            if (book.avail) {
                alert("この本は既に返却されています");
                return;
            }
            yield returnBooks(book.id);
        }));
        bookList === null || bookList === void 0 ? void 0 : bookList.appendChild(card);
        card.appendChild(button);
    });
}));
