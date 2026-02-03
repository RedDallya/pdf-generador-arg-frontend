import pool from "../config/db.js";

// GET /api/viajes
export const getTravels = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT v.*, c.nombre AS cliente_nombre
      FROM viajes v
      JOIN clientes c ON c.id = v.cliente_id
      ORDER BY v.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/viajes
export const createTravel = async (req, res) => {
  const {
    cliente_id,
    destino,
    fecha_inicio,
    fecha_fin,
    pasajero,
    tipo_viaje,
    estado,
    notas
  } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO viajes 
      (cliente_id, destino, fecha_inicio, fecha_fin, pasajero, tipo_viaje, estado, notas)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        cliente_id,
        destino,
        fecha_inicio,
        fecha_fin,
        pasajero,
        tipo_viaje,
        estado || "borrador",
        notas
      ]
    );

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/viajes/:id
export const updateTravel = async (req, res) => {
  const { id } = req.params;
  const {
    cliente_id,
    destino,
    fecha_inicio,
    fecha_fin,
    pasajero,
    tipo_viaje,
    estado,
    notas
  } = req.body;

  try {
    await pool.query(
      `UPDATE viajes SET
        cliente_id=?,
        destino=?,
        fecha_inicio=?,
        fecha_fin=?,
        pasajero=?,
        tipo_viaje=?,
        estado=?,
        notas=?
      WHERE id=?`,
      [
        cliente_id,
        destino,
        fecha_inicio,
        fecha_fin,
        pasajero,
        tipo_viaje,
        estado,
        notas,
        id
      ]
    );

    res.json({ message: "Viaje actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/viajes/:id
export const deleteTravel = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM viajes WHERE id = ?", [id]);
    res.json({ message: "Viaje eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
