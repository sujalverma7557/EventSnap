import downloadController from "../controllers/downloadController.js";
import express from 'express'

const router = express.Router();

router.get('/:filename', downloadController);


export default router;
