import pool from "../config/db.js";

export const getByTravel = async (req, res) => {
  const { viaje_id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM cotizaciones WHERE viaje_id = ?",
      [viaje_id]
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const createQuote = async (req, res) => {
  const { viaje_id, titulo, condicion_legal } = req.body;

  try {
    const [r] = await pool.query(
      `INSERT INTO cotizaciones (viaje_id, titulo, condicion_legal)
       VALUES (?, ?, ?)`,
      [viaje_id, titulo, condicion_legal]
    );

    res.status(201).json({ id: r.insertId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const updateQuote = async (req, res) => {
  const { id } = req.params;
  const { titulo, condicion_legal, estado } = req.body;

  try {
    await pool.query(
      `UPDATE cotizaciones
       SET titulo=?, condicion_legal=?, estado=?
       WHERE id=?`,
      [titulo, condicion_legal, estado, id]
    );

    res.json({ message: "Cotización actualizada" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteQuote = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM cotizaciones WHERE id=?", [id]);
    res.json({ message: "Cotización eliminada" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
