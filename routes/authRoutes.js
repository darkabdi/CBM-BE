import express from "express";
import { signup, login, setRole } from "../controllers/authcontroller.js";
import { protect } from "../middleware/auth.js";
import { authorise } from "../middleware/authorise.js";

const router = express.Router();

router.get("/admin/dashboard",
    protect,
    authorise('admin'),
    (req,res)=>{
        res.json({message: 'welcome admin'})
    }

)
router.post("/signup", signup);
router.post("/login", login);
router.post("/role", protect, setRole);

export default router;
