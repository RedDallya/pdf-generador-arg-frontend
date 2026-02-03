import pool from "../config/db.js";

// GET /api/clientes
export const getClients = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM clientes ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/clientes
export const createClient = async (req, res) => {
  const { nombre, email, telefono, notas } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO clientes (nombre, email, telefono, notas) VALUES (?, ?, ?, ?)",
      [nombre, email, telefono, notas]
    );

    res.status(201).json({
      id: result.insertId,
      nombre,
      email,
      telefono,
      notas
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/clientes/:id
export const updateClient = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, notas } = req.body;

  try {
    await pool.query(
      "UPDATE clientes SET nombre=?, email=?, telefono=?, notas=? WHERE id=?",
      [nombre, email, telefono, notas, id]
    );

    res.json({ message: "Cliente actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/clientes/:id
export const deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM clientes WHERE id = ?", [id]);
    res.json({ message: "Cliente eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
