import express, { json } from "express";
import cors from "cors";
import multer from "multer";
import { readFileSync, unlinkSync } from "fs";
import { processCsv } from "./processCsv.js";

const upload = multer({ dest: "uploads/" });
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(json());

app.post("/upload", upload.single("file"), (req, res) => {
    const data = readFileSync(req.file.path, "utf8");
    unlinkSync(req.file.path);
    
    const result = processCsv(data);
    
    res.json(result);
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});