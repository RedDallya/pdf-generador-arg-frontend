import express from "express";
import {
  getByTravel,
  createQuote,
  updateQuote,
  deleteQuote
} from "../controllers/cotizaciones.controller.js";

const router = express.Router();

router.get("/:viaje_id", getByTravel);
router.post("/", createQuote);
router.put("/:id", updateQuote);
router.delete("/:id", deleteQuote);

export default router;
