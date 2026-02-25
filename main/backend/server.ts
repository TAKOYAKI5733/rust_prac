import express, { Request, Response } from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { error } from "console";

interface Book {
  title: string;
  borrow_stud: string;
  avail: boolean;
  id: number;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "DB.json");

const readData = (): Book[] => {
  if (!fs.existsSync(DATA_FILE)) return [];
  const json = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(json) as Book[];
};

const writeData = (data: Book[]) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const app = express();

app.use(cors());
app.use(express.json());

app.get("/books", (req: Request, res: Response) => {
  const data = readData();
  res.json(data);
});

app.post("/books", (req: Request, res: Response) => {
  const data = readData();
  const newBook: Book = req.body;
  data.push(newBook);
  writeData(data);
  res.json({ status: "ok", book: newBook });
});

app.put("/books/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  const data = readData();

  const index = data.findIndex(book => book.id === id);
  if (index === -1) return res.status(404).json({ error: "Not found" });
  data[index] = { ...data[index], ...req.body };
  writeData(data);
  res.json({ status: "ok", book: data[index] });
});

app.delete("/item/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  let data = readData();
  const exists = data.some(book => book.id === id);
  if (!exists) return res.status(404).json({ error: "Not found" });
  writeData(data);
  res.json({ status: "ok" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});