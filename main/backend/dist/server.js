import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "DB.json");
const readData = () => {
    if (!fs.existsSync(DATA_FILE))
        return [];
    const json = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(json);
};
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};
const app = express();
app.use(cors());
app.use(express.json());
app.get("/books", (req, res) => {
    const data = readData();
    res.json(data);
});
app.post("/books", (req, res) => {
    const data = readData();
    const newBook = req.body;
    data.push(newBook);
    writeData(data);
    res.json({ status: "ok", book: newBook });
});
app.put("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id))
        return res.status(400).json({ error: "Invalid id" });
    const data = readData();
    const index = data.findIndex(book => book.id === id);
    if (index === -1)
        return res.status(404).json({ error: "Not found" });
    data[index] = { ...data[index], ...req.body };
    writeData(data);
    res.json({ status: "ok", book: data[index] });
});
app.delete("/item/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!isNaN(id))
        return res.status(400).json({ error: "Invalid id" });
    let data = readData();
    const exists = data.some(book => book.id === id);
    if (!exists)
        return res.status(404).json({ error: "Not found" });
    writeData(data);
    res.json({ status: "ok" });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
