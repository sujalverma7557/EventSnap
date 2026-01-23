import  express  from "express";
import { getUsers,getProducts, createProduct } from "../controllers/productControllers.js";


const router = express.Router()

router.route('/users').get(getUsers)
router.post("/userProfile", createProduct);
router.route('/photostream').get(getProducts)
      
export default router