import PDFDocument from "pdfkit";
import pool from "../config/db.js";

/* ===============================
   GENERAR PDF (STREAM + GUARDAR)
================================ */

export async function generatePartialPdf(req, res) {
  return generatePdf(req, res, "partial");
}

export async function generateFullPdf(req, res) {
  return generatePdf(req, res, "full");
}

async function generatePdf(req, res, mode) {
  const cotizacion_id = req.body?.cotizacion_id || req.query?.cotizacion_id;
  if (!cotizacion_id) {
    return res.status(400).json({ error: "cotizacion_id requerido" });
  }

  const fileName = `cotizacion_${cotizacion_id}_${mode}_${Date.now()}.pdf`;
  const publicUrl = `/assets/pdfs/${fileName}`;

  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${fileName}`
  );

  doc.pipe(res);

  // HEADER SIMPLE
  doc.fontSize(18).text("Lean Travel", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Cotización #${cotizacion_id}`);
  doc.moveDown(2);

  // SECCIONES
  const [sections] = await pool.query(
    "SELECT * FROM pdf_sections WHERE cotizacion_id = ? ORDER BY orden ASC",
    [cotizacion_id]
  );

  sections.forEach(s => {
    doc.fontSize(12).text(s.titulo || s.tipo);
    doc.moveDown(0.5);
  });

  doc.end();

  // GUARDAR METADATA
  await pool.query(
    `INSERT INTO pdfs (cotizacion_id, nombre, url, tipo)
     VALUES (?, ?, ?, ?)`,
    [cotizacion_id, fileName, publicUrl, mode]
  );
}

/* ===============================
   LISTAR PDFs
================================ */

export async function getPdfsByCotizacion(req, res) {
  const { cotizacionId } = req.params;

  const [rows] = await pool.query(
    "SELECT * FROM pdfs WHERE cotizacion_id = ? ORDER BY created_at DESC",
    [cotizacionId]
  );

  res.json(rows);
}
