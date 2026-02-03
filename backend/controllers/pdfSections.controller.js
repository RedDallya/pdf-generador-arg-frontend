import { PdfSectionModel } from "../models/pdfSection.model.js";

export const createSection = async (req, res) => {
  const { cotizacion_id, tipo, titulo, contenido, orden } = req.body;

  if (!cotizacion_id || !tipo || !contenido || orden === undefined) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const id = await PdfSectionModel.create({
    cotizacion_id,
    tipo,
    titulo,
    contenido,
    orden
  });

  res.json({ id });
};

export const getSections = async (req, res) => {
  const { cotizacion_id } = req.params;

  const sections = await PdfSectionModel.getByCotizacion(cotizacion_id);
  res.json(sections);
};

export const updateSection = async (req, res) => {
  const { id } = req.params;
  const { titulo, contenido, orden } = req.body;

  await PdfSectionModel.update(id, { titulo, contenido, orden });
  res.json({ ok: true });
};

export const deleteSection = async (req, res) => {
  const { id } = req.params;
  await PdfSectionModel.remove(id);
  res.json({ ok: true });
};
