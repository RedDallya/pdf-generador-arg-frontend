import pool from "../config/db.js";

export const createService = async (req, res) => {
  const {
    cotizacion_id,
    categoria,
    descripcion,
    observaciones,
    moneda,
    precio,
    adultos,
    menores,
    subtotal
  } = req.body;

  try {
    const [r] = await pool.query(
      `INSERT INTO servicios
      (cotizacion_id, categoria, descripcion, observaciones, moneda, precio, adultos, menores, subtotal)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        cotizacion_id,
        categoria,
        descripcion,
        observaciones,
        moneda,
        precio,
        adultos,
        menores,
        subtotal
      ]
    );

    res.status(201).json({ id: r.insertId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const updateService = async (req, res) => {
  const { id } = req.params;
  const { descripcion, observaciones, precio, adultos, menores, subtotal } =
    req.body;

  try {
    await pool.query(
      `UPDATE servicios
       SET descripcion=?, observaciones=?, precio=?, adultos=?, menores=?, subtotal=?
       WHERE id=?`,
      [descripcion, observaciones, precio, adultos, menores, subtotal, id]
    );

    res.json({ message: "Servicio actualizado" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM servicios WHERE id=?", [id]);
    res.json({ message: "Servicio eliminado" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
