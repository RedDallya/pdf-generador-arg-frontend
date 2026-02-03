import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import pdfRoutes from "./routes/pdf.routes.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

// PDFs públicos
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use("/api/pdfs", pdfRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend OK");
});
