export async function getTotalsByCotizacion(pool, cotizacionId) {
  const [rows] = await pool.query(`
    SELECT 
      tipo,
      SUM(subtotal) AS total
    FROM services
    WHERE cotizacion_id = ?
    GROUP BY tipo
  `, [cotizacionId]);

  let totals = {
    hotel: 0,
    aereo: 0,
    traslado: 0,
    excursion: 0,
    otros: 0
  };

  let totalGeneral = 0;

  rows.forEach(r => {
    if (totals[r.tipo] !== undefined) {
      totals[r.tipo] = Number(r.total);
    } else {
      totals.otros += Number(r.total);
    }
    totalGeneral += Number(r.total);
  });

  return { totals, totalGeneral };
}
