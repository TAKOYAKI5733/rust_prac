import express, { Request, Response } from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { error } from "console";
import { json } from "stream/consumers";
import { NONAME } from "dns";

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
  console.log("Writing to:", DATA_FILE);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  console.log("Write complete");
};

const app = express();

app.use(cors());
app.use(express.json());

app.get("/books", (req: Request, res: Response) => {
  const data = readData();
  res.json(data);
});

app.patch("/books/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  const data = readData();

  const index = data.findIndex(book => book.id === id);
  if (index === -1) return res.status(404).json({ error: "Not found" });
  data[index] = { ...data[index], ...req.body };
  writeData(data);
  res.json({ status: "ok", book: data[index] });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});