import express from "express";
import {
  getTravels,
  createTravel,
  updateTravel,
  deleteTravel
} from "../controllers/viajes.controller.js";

const router = express.Router();

router.get("/", getTravels);
router.post("/", createTravel);
router.put("/:id", updateTravel);
router.delete("/:id", deleteTravel);

export default router;
