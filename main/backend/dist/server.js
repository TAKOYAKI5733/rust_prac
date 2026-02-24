import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
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
app.get("/items", (req, res) => {
    const data = readData();
    res.json(data);
});
app.post("/items", (req, res) => {
    const data = readData();
    const newItem = req.body;
    data.push(newItem);
    writeData(data);
    res.json({ status: "ok", item: newItem });
});
app.put("/items/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id))
        return res.status(400).json({ error: "Invalid id" });
    const data = readData();
    const index = data.findIndex(item => item.id === id);
    if (index === -1)
        return res.status(404).json({ error: "Not found" });
    data[index] = { ...data[index], ...req.body };
    writeData(data);
    res.json({ status: "ok", item: data[index] });
});
app.delete("/items/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id))
        return res.status(400).json({ error: "Invalid id" });
    let data = readData();
    const exists = data.some(item => item.id === id);
    if (!exists)
        return res.status(404).json({ error: "Not found" });
    data = data.filter(item => item.id !== id);
    writeData(data);
    res.json({ status: "ok" });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
