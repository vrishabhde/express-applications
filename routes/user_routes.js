import express  from "express";
import { addproduct_whenEmailRegister, check_number, check_register, login, login_with_email, login_with_number, register, remove_ProductList, update_user } from "../controllers/user_controller.js";
import { addproduct, get_allproduct, product_pagination } from "../controllers/product_controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/check_register", check_register);
router.post("/add_product", addproduct);
router.post("/login", login);
router.post("/check_number",check_number);
router.post("/login_with_number", login_with_number);
router.post("/login_with_email", login_with_email);
router.post("/addproduct_whenEmailRegister", addproduct_whenEmailRegister);
router.post("/remove_ProductList", remove_ProductList);
router.post("/update_user", update_user);
router.post("/product_pagination", product_pagination);
router.get("/get_allproduct", get_allproduct);


export default router;