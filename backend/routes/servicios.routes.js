import express from "express";
import {
  createService,
  updateService,
  deleteService
} from "../controllers/servicios.controller.js";

const router = express.Router();

router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
